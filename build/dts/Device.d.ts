import EventDispatcher, { BoundEventListeners, Event, EventListenerMap, EventMap } from "./utils/EventDispatcher.ts";
import BaseConnectionManager, { ConnectionStatus, ConnectionMessageType, ConnectionStatusEventMessages } from "./connection/BaseConnectionManager.ts";
import { DeviceInformationEventMessages } from "./DeviceInformationManager.ts";
export declare const DeviceEventTypes: readonly ["connectionMessage", "notConnected", "connecting", "connected", "disconnecting", "connectionStatus", "isConnected", "rx", "tx", "batteryLevel", "manufacturerName", "modelNumber", "softwareRevision", "hardwareRevision", "firmwareRevision", "pnpId", "serialNumber", "deviceInformation"];
export type DeviceEventType = (typeof DeviceEventTypes)[number];
export interface DeviceEventMessages extends ConnectionStatusEventMessages, DeviceInformationEventMessages {
    batteryLevel: {
        batteryLevel: number;
    };
    connectionMessage: {
        messageType: ConnectionMessageType;
        dataView: DataView;
    };
}
export type SendMessageCallback<MessageType extends string> = (messages?: {
    type: MessageType;
    data?: ArrayBuffer;
}[], sendImmediately?: boolean) => Promise<void>;
export type SendSmpMessageCallback = (data: ArrayBuffer) => Promise<void>;
export type DeviceEventDispatcher = EventDispatcher<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEvent = Event<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEventMap = EventMap<Device, DeviceEventType, DeviceEventMessages>;
export type DeviceEventListenerMap = EventListenerMap<Device, DeviceEventType, DeviceEventMessages>;
export type BoundDeviceEventListeners = BoundEventListeners<Device, DeviceEventType, DeviceEventMessages>;
declare class Device {
    #private;
    get bluetoothId(): string | undefined;
    constructor();
    get addEventListener(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionStatus" | "isConnected" | "batteryLevel" | "rx" | "tx" | "connectionMessage">(type: T, listener: (event: {
        type: T;
        target: Device;
        message: DeviceEventMessages[T];
    }) => void, options?: {
        once?: boolean;
    }) => void;
    get removeEventListener(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionStatus" | "isConnected" | "batteryLevel" | "rx" | "tx" | "connectionMessage">(type: T, listener: (event: {
        type: T;
        target: Device;
        message: DeviceEventMessages[T];
    }) => void) => void;
    get waitForEvent(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionStatus" | "isConnected" | "batteryLevel" | "rx" | "tx" | "connectionMessage">(type: T) => Promise<{
        type: T;
        target: Device;
        message: DeviceEventMessages[T];
    }>;
    get removeEventListeners(): <T extends "manufacturerName" | "modelNumber" | "softwareRevision" | "hardwareRevision" | "firmwareRevision" | "pnpId" | "serialNumber" | "deviceInformation" | "notConnected" | "connecting" | "connected" | "disconnecting" | "connectionStatus" | "isConnected" | "batteryLevel" | "rx" | "tx" | "connectionMessage">(type: T) => void;
    get removeAllEventListeners(): () => void;
    get connectionManager(): BaseConnectionManager | undefined;
    set connectionManager(newConnectionManager: BaseConnectionManager | undefined);
    private sendTxMessages;
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
    triggerVibration(vibrationConfiguration: number[]): Promise<void>;
    get isServerSide(): boolean;
    set isServerSide(newIsServerSide: boolean);
}
export default Device;
