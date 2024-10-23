import { createConsole } from "../utils/Console.ts";
import Timer from "../utils/Timer.ts";

import { DeviceInformationMessageTypes } from "../DeviceInformationManager.ts";

const _console = createConsole("BaseConnectionManager", { log: true });

export const ConnectionTypes = ["webBluetooth", "noble", "client"] as const;
export type ConnectionType = (typeof ConnectionTypes)[number];

export const ConnectionStatuses = ["notConnected", "connecting", "connected", "disconnecting"] as const;
export type ConnectionStatus = (typeof ConnectionStatuses)[number];

export const ConnectionEventTypes = [...ConnectionStatuses, "connectionStatus", "isConnected"] as const;
export type ConnectionEventType = (typeof ConnectionEventTypes)[number];

export interface ConnectionStatusEventMessages {
  notConnected: any;
  connecting: any;
  connected: any;
  disconnecting: any;
  connectionStatus: { connectionStatus: ConnectionStatus };
  isConnected: { isConnected: boolean };
}

export const BatteryLevelMessageTypes = ["batteryLevel"] as const;
export type BatteryLevelMessageType = (typeof BatteryLevelMessageTypes)[number];

export const ConnectionMessageTypes = [...BatteryLevelMessageTypes, ...DeviceInformationMessageTypes] as const;
export type ConnectionMessageType = (typeof ConnectionMessageTypes)[number];

export type ConnectionStatusCallback = (status: ConnectionStatus) => void;
export type MessageReceivedCallback = (messageType: ConnectionMessageType, dataView: DataView) => void;
export type MessagesReceivedCallback = () => void;

export type SendDataCallback = (data: ArrayBuffer) => Promise<void>;

abstract class BaseConnectionManager {
  abstract get bluetoothId(): string;
  abstract get name(): string;

  // CALLBACKS
  onStatusUpdated?: ConnectionStatusCallback;
  onMessageReceived?: MessageReceivedCallback;
  onMessagesReceived?: MessagesReceivedCallback;

  protected get baseConstructor() {
    return this.constructor as typeof BaseConnectionManager;
  }
  static get isSupported() {
    return false;
  }
  get isSupported() {
    return this.baseConstructor.isSupported;
  }

  static type: ConnectionType;
  get type(): ConnectionType {
    return this.baseConstructor.type;
  }

  /** @throws {Error} if not supported */
  #assertIsSupported() {
    _console.assertWithError(this.isSupported, `${this.constructor.name} is not supported`);
  }

  constructor() {
    this.#assertIsSupported();
  }

  #status: ConnectionStatus = "notConnected";
  get status() {
    return this.#status;
  }
  protected set status(newConnectionStatus) {
    _console.assertEnumWithError(newConnectionStatus, ConnectionStatuses);
    if (this.#status == newConnectionStatus) {
      _console.log(`tried to assign same connection status "${newConnectionStatus}"`);
      return;
    }
    _console.log(`new connection status "${newConnectionStatus}"`);
    this.#status = newConnectionStatus;
    this.onStatusUpdated!(this.status);

    if (this.isConnected) {
      this.#timer.start();
    } else {
      this.#timer.stop();
    }
  }

  get isConnected() {
    return this.status == "connected";
  }

  /** @throws {Error} if connected */
  #assertIsNotConnected() {
    _console.assertWithError(!this.isConnected, "device is already connected");
  }
  /** @throws {Error} if connecting */
  #assertIsNotConnecting() {
    _console.assertWithError(this.status != "connecting", "device is already connecting");
  }
  /** @throws {Error} if not connected */
  #assertIsConnected() {
    _console.assertWithError(this.isConnected, "device is not connected");
  }
  /** @throws {Error} if disconnecting */
  #assertIsNotDisconnecting() {
    _console.assertWithError(this.status != "disconnecting", "device is already disconnecting");
  }
  /** @throws {Error} if not connected or is disconnecting */
  #assertIsConnectedAndNotDisconnecting() {
    this.#assertIsConnected();
    this.#assertIsNotDisconnecting();
  }

  async connect() {
    this.#assertIsNotConnected();
    this.#assertIsNotConnecting();
    this.status = "connecting";
  }
  get canReconnect() {
    return false;
  }
  async reconnect() {
    this.#assertIsNotConnected();
    this.#assertIsNotConnecting();
    _console.assert(this.canReconnect, "unable to reconnect");
  }
  async disconnect() {
    this.#assertIsConnected();
    this.#assertIsNotDisconnecting();
    this.status = "disconnecting";
    _console.log("disconnecting from device...");
  }

  async sendUICommandsData(data: ArrayBuffer) {
    _console.log("sendUICommandsData", data);
  }

  async sendRxData(data: ArrayBuffer) {
    _console.log("sendRxData", data);
  }

  #timer = new Timer(this.#checkConnection.bind(this), 5000);
  #checkConnection() {
    //console.log("checking connection...");
    if (!this.isConnected) {
      _console.log("timer detected disconnection");
      this.status = "notConnected";
    }
  }
}

export default BaseConnectionManager;
