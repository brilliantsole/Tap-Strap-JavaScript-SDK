import { createConsole } from "./utils/Console.ts";
import EventDispatcher, { BoundEventListeners, Event, EventListenerMap, EventMap } from "./utils/EventDispatcher.ts";
import BaseConnectionManager, {
  ConnectionStatus,
  ConnectionMessageType,
  BatteryLevelMessageTypes,
  ConnectionEventTypes,
  ConnectionStatusEventMessages,
} from "./connection/BaseConnectionManager.ts";
import { isInBrowser, isInNode } from "./utils/environment.ts";
import WebBluetoothConnectionManager from "./connection/bluetooth/WebBluetoothConnectionManager.ts";
import VibrationManager, { SendVibrationMessageCallback } from "./vibration/VibrationManager.ts";
import DeviceInformationManager, {
  DeviceInformationEventDispatcher,
  DeviceInformationEventTypes,
  DeviceInformationMessageType,
  DeviceInformationMessageTypes,
  DeviceInformationEventMessages,
} from "./DeviceInformationManager.ts";
import { FileLike } from "./utils/ArrayBufferUtils.ts";
import DeviceManager from "./DeviceManager.ts";

const _console = createConsole("Device", { log: true });

export const DeviceEventTypes = [
  "connectionMessage",
  ...ConnectionEventTypes,
  ...BatteryLevelMessageTypes,
  ...DeviceInformationEventTypes,
] as const;
export type DeviceEventType = (typeof DeviceEventTypes)[number];

export interface DeviceEventMessages extends ConnectionStatusEventMessages, DeviceInformationEventMessages {
  batteryLevel: { batteryLevel: number };
  connectionMessage: { messageType: ConnectionMessageType; dataView: DataView };
}

export type SendMessageCallback<MessageType extends string> = (
  messages?: { type: MessageType; data?: ArrayBuffer }[],
  sendImmediately?: boolean
) => Promise<void>;

export type SendSmpMessageCallback = (data: ArrayBuffer) => Promise<void>;

export type DeviceEventDispatcher = EventDispatcher<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEvent = Event<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEventMap = EventMap<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEventListenerMap = EventListenerMap<Device, DeviceEventType, DeviceEventMessages>;
export type BoundDeviceEventListeners = BoundEventListeners<Device, DeviceEventType, DeviceEventMessages>;

class Device {
  get bluetoothId() {
    return this.#connectionManager?.bluetoothId;
  }
  get name() {
    return this.#connectionManager?.name;
  }

  constructor() {
    this.#deviceInformationManager.eventDispatcher = this.#eventDispatcher as DeviceInformationEventDispatcher;

    // FIX
    //this.#vibrationManager.sendMessage = this.sendTxMessages as SendVibrationMessageCallback;

    DeviceManager.onDevice(this);
    if (isInBrowser) {
      window.addEventListener("beforeunload", () => {
        if (this.isConnected) {
          // FILL
        }
      });
    }
    if (isInNode) {
      /** can add more node leave handlers https://gist.github.com/hyrious/30a878f6e6a057f09db87638567cb11a */
      process.on("exit", () => {
        if (this.isConnected) {
          // FILL
        }
      });
    }
  }

  static #DefaultConnectionManager(): BaseConnectionManager {
    return new WebBluetoothConnectionManager();
  }

  #eventDispatcher: DeviceEventDispatcher = new EventDispatcher(this as Device, DeviceEventTypes);
  get addEventListener() {
    return this.#eventDispatcher.addEventListener;
  }
  get #dispatchEvent() {
    return this.#eventDispatcher.dispatchEvent;
  }
  get removeEventListener() {
    return this.#eventDispatcher.removeEventListener;
  }
  get waitForEvent() {
    return this.#eventDispatcher.waitForEvent;
  }
  get removeEventListeners() {
    return this.#eventDispatcher.removeEventListeners;
  }
  get removeAllEventListeners() {
    return this.#eventDispatcher.removeAllEventListeners;
  }

  // CONNECTION MANAGER

  #connectionManager?: BaseConnectionManager;
  get connectionManager() {
    return this.#connectionManager;
  }
  set connectionManager(newConnectionManager) {
    if (this.connectionManager == newConnectionManager) {
      _console.log("same connectionManager is already assigned");
      return;
    }

    if (this.connectionManager) {
      this.connectionManager.onStatusUpdated = undefined;
      this.connectionManager.onMessageReceived = undefined;
      this.connectionManager.onMessagesReceived = undefined;
    }
    if (newConnectionManager) {
      newConnectionManager.onStatusUpdated = this.#onConnectionStatusUpdated.bind(this);
      newConnectionManager.onMessageReceived = this.#onConnectionMessageReceived.bind(this);
      newConnectionManager.onMessagesReceived = this.#onConnectionMessagesReceived.bind(this);
    }

    this.#connectionManager = newConnectionManager;
    _console.log("assigned new connectionManager", this.#connectionManager);
  }

  async connect() {
    if (!this.connectionManager) {
      this.connectionManager = Device.#DefaultConnectionManager();
    }
    this.#clear();
    return this.connectionManager.connect();
  }
  #isConnected = false;
  get isConnected() {
    return this.#isConnected;
  }
  /** @throws {Error} if not connected */
  #assertIsConnected() {
    _console.assertWithError(this.isConnected, "notConnected");
  }

  get canReconnect() {
    return this.connectionManager?.canReconnect;
  }
  #assertCanReconnect() {
    _console.assertWithError(this.canReconnect, "cannot reconnect to device");
  }
  async reconnect() {
    this.#assertCanReconnect();
    this.#clear();
    return this.connectionManager?.reconnect();
  }

  static async Connect() {
    const device = new Device();
    await device.connect();
    return device;
  }

  static #ReconnectOnDisconnection = false;
  static get ReconnectOnDisconnection() {
    return this.#ReconnectOnDisconnection;
  }
  static set ReconnectOnDisconnection(newReconnectOnDisconnection) {
    _console.assertTypeWithError(newReconnectOnDisconnection, "boolean");
    this.#ReconnectOnDisconnection = newReconnectOnDisconnection;
  }

  #reconnectOnDisconnection = Device.ReconnectOnDisconnection;
  get reconnectOnDisconnection() {
    return this.#reconnectOnDisconnection;
  }
  set reconnectOnDisconnection(newReconnectOnDisconnection) {
    _console.assertTypeWithError(newReconnectOnDisconnection, "boolean");
    this.#reconnectOnDisconnection = newReconnectOnDisconnection;
  }
  #reconnectIntervalId?: NodeJS.Timeout | number;

  get connectionType() {
    return this.connectionManager?.type;
  }
  async disconnect() {
    this.#assertIsConnected();
    if (this.reconnectOnDisconnection) {
      this.reconnectOnDisconnection = false;
      this.addEventListener(
        "isConnected",
        () => {
          this.reconnectOnDisconnection = true;
        },
        { once: true }
      );
    }

    return this.connectionManager!.disconnect();
  }

  toggleConnection() {
    if (this.isConnected) {
      this.disconnect();
    } else if (this.canReconnect) {
      this.reconnect();
    } else {
      this.connect();
    }
  }

  get connectionStatus(): ConnectionStatus {
    switch (this.#connectionManager?.status) {
      case "connected":
        return this.isConnected ? "connected" : "connecting";
      case "notConnected":
      case "connecting":
      case "disconnecting":
        return this.#connectionManager.status;
      default:
        return "notConnected";
    }
  }
  get isConnectionBusy() {
    return this.connectionStatus == "connecting" || this.connectionStatus == "disconnecting";
  }

  #onConnectionStatusUpdated(connectionStatus: ConnectionStatus) {
    _console.log({ connectionStatus });

    if (connectionStatus == "notConnected") {
      //this.#clear();

      if (this.canReconnect && this.reconnectOnDisconnection) {
        _console.log("starting reconnect interval...");
        this.#reconnectIntervalId = setInterval(() => {
          _console.log("attempting reconnect...");
          this.reconnect();
        }, 1000);
      }
    } else {
      if (this.#reconnectIntervalId != undefined) {
        _console.log("clearing reconnect interval");
        clearInterval(this.#reconnectIntervalId);
        this.#reconnectIntervalId = undefined;
      }
    }

    this.#checkConnection();

    if (connectionStatus == "connected" && !this.#isConnected) {
      // FILL
    }

    DeviceManager.OnDeviceConnectionStatusUpdated(this, connectionStatus);
  }

  #dispatchConnectionEvents(includeIsConnected: boolean = false) {
    this.#dispatchEvent("connectionStatus", { connectionStatus: this.connectionStatus });
    this.#dispatchEvent(this.connectionStatus, {});
    if (includeIsConnected) {
      this.#dispatchEvent("isConnected", { isConnected: this.isConnected });
    }
  }
  #checkConnection() {
    this.#isConnected = Boolean(this.connectionManager?.isConnected);

    switch (this.connectionStatus) {
      case "connected":
        if (this.#isConnected) {
          this.#dispatchConnectionEvents(true);
        }
        break;
      case "notConnected":
        this.#dispatchConnectionEvents(true);
        break;
      default:
        this.#dispatchConnectionEvents(false);
        break;
    }
  }

  #clear() {
    this.latestConnectionMessage.clear();
    this.#deviceInformationManager.clear();
  }

  #onConnectionMessageReceived(messageType: ConnectionMessageType, dataView: DataView) {
    _console.log({ messageType, dataView });
    switch (messageType) {
      case "batteryLevel":
        const batteryLevel = dataView.getUint8(0);
        _console.log("received battery level", { batteryLevel });
        this.#updateBatteryLevel(batteryLevel);
        break;

      default:
        if (DeviceInformationMessageTypes.includes(messageType as DeviceInformationMessageType)) {
          this.#deviceInformationManager.parseMessage(messageType as DeviceInformationMessageType, dataView);
        } else {
          throw Error(`uncaught messageType ${messageType}`);
        }
      /*
        if (FileTransferMessageTypes.includes(messageType as FileTransferMessageType)) {
          this.#fileTransferManager.parseMessage(messageType as FileTransferMessageType, dataView);
        } else if (TfliteMessageTypes.includes(messageType as TfliteMessageType)) {
          this.#tfliteManager.parseMessage(messageType as TfliteMessageType, dataView);
        } else if (SensorDataMessageTypes.includes(messageType as SensorDataMessageType)) {
          this.#sensorDataManager.parseMessage(messageType as SensorDataMessageType, dataView);
        } else if (FirmwareMessageTypes.includes(messageType as FirmwareMessageType)) {
          this.#firmwareManager.parseMessage(messageType as FirmwareMessageType, dataView);
        } else if (DeviceInformationMessageTypes.includes(messageType as DeviceInformationMessageType)) {
          this.#deviceInformationManager.parseMessage(messageType as DeviceInformationMessageType, dataView);
        } else if (InformationMessageTypes.includes(messageType as InformationMessageType)) {
          this._informationManager.parseMessage(messageType as InformationMessageType, dataView);
        } else if (SensorConfigurationMessageTypes.includes(messageType as SensorConfigurationMessageType)) {
          this.#sensorConfigurationManager.parseMessage(messageType as SensorConfigurationMessageType, dataView);
        } else {
          throw Error(`uncaught messageType ${messageType}`);
        }
        */
    }

    this.latestConnectionMessage.set(messageType, dataView);
    this.#dispatchEvent("connectionMessage", { messageType, dataView });
  }
  #onConnectionMessagesReceived() {
    if (!this.isConnected) {
      this.#checkConnection();
    }
  }

  latestConnectionMessage: Map<ConnectionMessageType, DataView> = new Map();

  // DEVICE INFORMATION
  #deviceInformationManager = new DeviceInformationManager();
  get deviceInformation() {
    return this.#deviceInformationManager.information;
  }

  // BATTERY LEVEL
  #batteryLevel = 0;
  get batteryLevel() {
    return this.#batteryLevel;
  }
  #updateBatteryLevel(updatedBatteryLevel: number) {
    _console.assertTypeWithError(updatedBatteryLevel, "number");
    if (this.#batteryLevel == updatedBatteryLevel) {
      _console.log(`duplicate batteryLevel assignment ${updatedBatteryLevel}`);
      return;
    }
    this.#batteryLevel = updatedBatteryLevel;
    _console.log({ updatedBatteryLevel: this.#batteryLevel });
    this.#dispatchEvent("batteryLevel", { batteryLevel: this.#batteryLevel });
  }

  // VIBRATION
  #vibrationManager = new VibrationManager();
  async triggerVibration(vibrationConfiguration: number[]) {
    this.#vibrationManager.triggerVibration(vibrationConfiguration);
  }

  // SERVER SIDE
  #isServerSide = false;
  get isServerSide() {
    return this.#isServerSide;
  }
  set isServerSide(newIsServerSide) {
    if (this.#isServerSide == newIsServerSide) {
      _console.log("redundant isServerSide assignment");
      return;
    }
    _console.log({ newIsServerSide });
    this.#isServerSide = newIsServerSide;
  }
}

export default Device;