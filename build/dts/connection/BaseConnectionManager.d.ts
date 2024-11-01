export declare const ConnectionTypes: readonly ["webBluetooth", "noble", "client"];
export type ConnectionType = (typeof ConnectionTypes)[number];
export declare const ConnectionStatuses: readonly ["notConnected", "connecting", "connected", "disconnecting"];
export type ConnectionStatus = (typeof ConnectionStatuses)[number];
export declare const ConnectionEventTypes: readonly ["notConnected", "connecting", "connected", "disconnecting", "connectionStatus", "isConnected"];
export type ConnectionEventType = (typeof ConnectionEventTypes)[number];
export interface ConnectionStatusEventMessages {
    notConnected: any;
    connecting: any;
    connected: any;
    disconnecting: any;
    connectionStatus: {
        connectionStatus: ConnectionStatus;
    };
    isConnected: {
        isConnected: boolean;
    };
}
export declare const BatteryLevelMessageTypes: readonly ["batteryLevel"];
export type BatteryLevelMessageType = (typeof BatteryLevelMessageTypes)[number];
export declare const ConnectionMessageTypes: readonly ["batteryLevel", "manufacturerName", "modelNumber", "softwareRevision", "hardwareRevision", "firmwareRevision", "pnpId", "serialNumber", "tapData", "mouseData", "airGesture", "tx", "rawSensor"];
export type ConnectionMessageType = (typeof ConnectionMessageTypes)[number];
export type ConnectionStatusCallback = (status: ConnectionStatus) => void;
export type MessageReceivedCallback = (messageType: ConnectionMessageType, dataView: DataView) => void;
export type MessagesReceivedCallback = () => void;
export type SendDataCallback = (data: ArrayBuffer) => Promise<void>;
declare abstract class BaseConnectionManager {
    #private;
    abstract get bluetoothId(): string;
    abstract get name(): string;
    onStatusUpdated?: ConnectionStatusCallback;
    onMessageReceived?: MessageReceivedCallback;
    onMessagesReceived?: MessagesReceivedCallback;
    protected get baseConstructor(): typeof BaseConnectionManager;
    static get isSupported(): boolean;
    get isSupported(): boolean;
    static type: ConnectionType;
    get type(): ConnectionType;
    constructor();
    get status(): "notConnected" | "connecting" | "connected" | "disconnecting";
    protected set status(newConnectionStatus: "notConnected" | "connecting" | "connected" | "disconnecting");
    get isConnected(): boolean;
    connect(): Promise<void>;
    get canReconnect(): boolean;
    reconnect(): Promise<void>;
    disconnect(): Promise<void>;
    sendUICommandsData(data: ArrayBuffer): Promise<void>;
    sendRxData(data: ArrayBuffer): Promise<void>;
}
export default BaseConnectionManager;
