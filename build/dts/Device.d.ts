import EventDispatcher, { BoundEventListeners, Event, EventListenerMap, EventMap } from "./utils/EventDispatcher.ts";
import BaseConnectionManager, { ConnectionStatus, ConnectionMessageType, ConnectionStatusEventMessages } from "./connection/BaseConnectionManager.ts";
import { DeviceInformationEventMessages } from "./DeviceInformationManager.ts";
import { TapDataEventMessages } from "./TapDataManager.ts";
import { MouseDataEventMessages } from "./MouseDataManager.ts";
import { AirGestureEventMessages } from "./AirGestureManager.ts";
import { TxEventMessages } from "./TxManager.ts";
export declare const DeviceEventTypes: readonly ["connectionMessage", "notConnected", "connecting", "connected", "disconnecting", "connectionStatus", "isConnected", "batteryLevel", "manufacturerName", "modelNumber", "softwareRevision", "hardwareRevision", "firmwareRevision", "pnpId", "serialNumber", "deviceInformation", "tapData", "tapAirGesture", "mouseData", "airGesture", "isInAirGestureState", "xrAirGesture", "rawSensor", "imu", "device", "orientation"];
export type DeviceEventType = (typeof DeviceEventTypes)[number];
export interface DeviceEventMessages extends ConnectionStatusEventMessages, DeviceInformationEventMessages, TapDataEventMessages, MouseDataEventMessages, AirGestureEventMessages, TxEventMessages {
    batteryLevel: {
        batteryLevel: number;
    };
    connectionMessage: {
        messageType: ConnectionMessageType;
        dataView: DataView;
    };
}
export type DeviceEventDispatcher = EventDispatcher<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEvent = Event<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEventMap = EventMap<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEventListenerMap = EventListenerMap<Device, DeviceEventType, DeviceEventMessages>;
export type BoundDeviceEventListeners = BoundEventListeners<Device, DeviceEventType, DeviceEventMessages>;
declare class Device {
    #private;
    get bluetoothId(): string | undefined;
    get name(): string | undefined;
    constructor();
    get addEventListener(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "tapData" | "tapAirGesture" | "mouseData" | "imu" | "device" | "rawSensor" | "orientation" | "batteryLevel" | "airGesture" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionMessage" | "connectionStatus" | "isConnected" | "isInAirGestureState" | "xrAirGesture">(type: T, listener: (event: {
        type: T;
        target: Device;
        message: DeviceEventMessages[T];
    }) => void, options?: {
        once?: boolean;
    }) => void;
    get removeEventListener(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "tapData" | "tapAirGesture" | "mouseData" | "imu" | "device" | "rawSensor" | "orientation" | "batteryLevel" | "airGesture" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionMessage" | "connectionStatus" | "isConnected" | "isInAirGestureState" | "xrAirGesture">(type: T, listener: (event: {
        type: T;
        target: Device;
        message: DeviceEventMessages[T];
    }) => void) => void;
    get waitForEvent(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "tapData" | "tapAirGesture" | "mouseData" | "imu" | "device" | "rawSensor" | "orientation" | "batteryLevel" | "airGesture" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionMessage" | "connectionStatus" | "isConnected" | "isInAirGestureState" | "xrAirGesture">(type: T) => Promise<{
        type: T;
        target: Device;
        message: DeviceEventMessages[T];
    }>;
    get removeEventListeners(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "tapData" | "tapAirGesture" | "mouseData" | "imu" | "device" | "rawSensor" | "orientation" | "batteryLevel" | "airGesture" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionMessage" | "connectionStatus" | "isConnected" | "isInAirGestureState" | "xrAirGesture">(type: T) => void;
    get removeAllEventListeners(): () => void;
    get connectionManager(): BaseConnectionManager | undefined;
    set connectionManager(newConnectionManager: BaseConnectionManager | undefined);
    private sendUICommandsData;
    private sendRxData;
    connect(): Promise<void>;
    get isConnected(): boolean;
    get canReconnect(): boolean | undefined;
    reconnect(): Promise<void | undefined>;
    static Connect(): Promise<Device>;
    static get ReconnectOnDisconnection(): boolean;
    static set ReconnectOnDisconnection(newReconnectOnDisconnection: boolean);
    get reconnectOnDisconnection(): boolean;
    set reconnectOnDisconnection(newReconnectOnDisconnection: boolean);
    get connectionType(): "webBluetooth" | "noble" | "client" | undefined;
    disconnect(): Promise<void>;
    toggleConnection(): void;
    get connectionStatus(): ConnectionStatus;
    get isConnectionBusy(): boolean;
    latestConnectionMessage: Map<ConnectionMessageType, DataView>;
    get deviceInformation(): import("./DeviceInformationManager.ts").DeviceInformation;
    get batteryLevel(): number;
    get inputMode(): "rawSensor" | "controller" | "text" | "controllerWithMouse" | "controllerWithMouseAndKeyboard";
    set inputMode(newInputMode: "rawSensor" | "controller" | "text" | "controllerWithMouse" | "controllerWithMouseAndKeyboard");
    get setInputMode(): (newMode: import("./InputManager.ts").InputMode) => void;
    get setSensitivityForType(): (rawSensorType: import("./TS.ts").RawSensorType, index: number) => void;
    get xrState(): "user" | "airMouse" | "tapping" | "dontSend";
    set xrState(newXrState: "user" | "airMouse" | "tapping" | "dontSend");
    get setXRState(): (newState: import("./XRStateManager.ts").XRState) => void;
    get xrAirGestureMinCount(): number;
    set xrAirGestureMinCount(count: number);
    get calculateOrientation(): boolean;
    set calculateOrientation(newValue: boolean);
    /** [hapticsMs, pauseMs, hapticsMs, pauseMs...] */
    get vibrate(): (segments: number[]) => Promise<void>;
    get isServerSide(): boolean;
    set isServerSide(newIsServerSide: boolean);
}
export default Device;
