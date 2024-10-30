interface ConsoleLevelFlags {
    log?: boolean;
    warn?: boolean;
    error?: boolean;
    assert?: boolean;
    table?: boolean;
}
/** @throws {Error} if no console with type is found */
declare function setConsoleLevelFlagsForType(type: string, levelFlags: ConsoleLevelFlags): void;
declare function setAllConsoleLevelFlags(levelFlags: ConsoleLevelFlags): void;

declare const isInProduction: boolean;
declare const isInDev: boolean;
declare const isInBrowser: boolean;
declare const isInNode: boolean;
declare let isBluetoothSupported: boolean;
declare const isInBluefy: boolean;
declare const isInWebBLE: boolean;
declare const isAndroid: boolean;
declare const isSafari: boolean;
declare const isIOS: boolean;
declare const isMac: boolean;
declare const isInLensStudio: boolean;

declare const environment_d_isAndroid: typeof isAndroid;
declare const environment_d_isBluetoothSupported: typeof isBluetoothSupported;
declare const environment_d_isIOS: typeof isIOS;
declare const environment_d_isInBluefy: typeof isInBluefy;
declare const environment_d_isInBrowser: typeof isInBrowser;
declare const environment_d_isInDev: typeof isInDev;
declare const environment_d_isInLensStudio: typeof isInLensStudio;
declare const environment_d_isInNode: typeof isInNode;
declare const environment_d_isInProduction: typeof isInProduction;
declare const environment_d_isInWebBLE: typeof isInWebBLE;
declare const environment_d_isMac: typeof isMac;
declare const environment_d_isSafari: typeof isSafari;
declare namespace environment_d {
  export { environment_d_isAndroid as isAndroid, environment_d_isBluetoothSupported as isBluetoothSupported, environment_d_isIOS as isIOS, environment_d_isInBluefy as isInBluefy, environment_d_isInBrowser as isInBrowser, environment_d_isInDev as isInDev, environment_d_isInLensStudio as isInLensStudio, environment_d_isInNode as isInNode, environment_d_isInProduction as isInProduction, environment_d_isInWebBLE as isInWebBLE, environment_d_isMac as isMac, environment_d_isSafari as isSafari };
}

declare const ConnectionTypes: readonly ["webBluetooth", "noble", "client"];
type ConnectionType = (typeof ConnectionTypes)[number];
declare const ConnectionStatuses: readonly ["notConnected", "connecting", "connected", "disconnecting"];
type ConnectionStatus = (typeof ConnectionStatuses)[number];
interface ConnectionStatusEventMessages {
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
declare const ConnectionMessageTypes: readonly ["batteryLevel", "manufacturerName", "modelNumber", "softwareRevision", "hardwareRevision", "firmwareRevision", "pnpId", "serialNumber", "tapData", "mouseData", "airGesture", "tx", "rawSensor"];
type ConnectionMessageType = (typeof ConnectionMessageTypes)[number];
type ConnectionStatusCallback = (status: ConnectionStatus) => void;
type MessageReceivedCallback = (messageType: ConnectionMessageType, dataView: DataView) => void;
type MessagesReceivedCallback = () => void;
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

declare const XRStates: readonly ["user", "airMouse", "tapping", "dontSend"];
type XRState = (typeof XRStates)[number];

declare const RawSensorTypes: readonly ["deviceAccelerometer", "imuGyroscope", "imuAccelerometer"];
type RawSensorType = (typeof RawSensorTypes)[number];
declare const RawSensorSensitivityFactors: {
    [rawSensorType in RawSensorType]: number[];
};
type RawSensorSensitivity = {
    [rawSensorType in RawSensorType]: number;
};
declare const RawSensorDataTypes: readonly ["imu", "device"];
type RawSensorDataType = (typeof RawSensorDataTypes)[number];
declare const RawSensorFingers: readonly ["thumb", "index", "middle", "ring", "pinky"];
type RawSensorFinger = (typeof RawSensorFingers)[number];

declare const InputModes: readonly ["controller", "text", "rawSensor", "controllerWithMouse", "controllerWithMouseAndKeyboard"];
type InputMode = (typeof InputModes)[number];

type EventMap<Target extends any, EventType extends string, EventMessages extends Partial<Record<EventType, any>>> = {
    [T in keyof EventMessages]: {
        type: T;
        target: Target;
        message: EventMessages[T];
    };
};
type EventListenerMap<Target extends any, EventType extends string, EventMessages extends Partial<Record<EventType, any>>> = {
    [T in keyof EventMessages]: (event: {
        type: T;
        target: Target;
        message: EventMessages[T];
    }) => void;
};
type Event<Target extends any, EventType extends string, EventMessages extends Partial<Record<EventType, any>>> = EventMap<Target, EventType, EventMessages>[keyof EventMessages];
type SpecificEvent<Target extends any, EventType extends string, EventMessages extends Partial<Record<EventType, any>>, SpecificEventType extends EventType> = {
    type: SpecificEventType;
    target: Target;
    message: EventMessages[SpecificEventType];
};
type BoundEventListeners<Target extends any, EventType extends string, EventMessages extends Partial<Record<EventType, any>>> = {
    [SpecificEventType in keyof EventMessages]?: (event: SpecificEvent<Target, EventType, EventMessages, SpecificEventType>) => void;
};

interface PnpId {
    source: "Bluetooth" | "USB";
    vendorId: number;
    productId: number;
    productVersion: number;
}
interface DeviceInformation {
    manufacturerName: string;
    modelNumber: string;
    softwareRevision: string;
    hardwareRevision: string;
    firmwareRevision: string;
    pnpId: PnpId;
    serialNumber: string;
}
interface DeviceInformationEventMessages {
    manufacturerName: {
        manufacturerName: string;
    };
    modelNumber: {
        modelNumber: string;
    };
    softwareRevision: {
        softwareRevision: string;
    };
    hardwareRevision: {
        hardwareRevision: string;
    };
    firmwareRevision: {
        firmwareRevision: string;
    };
    pnpId: {
        pnpId: PnpId;
    };
    serialNumber: {
        serialNumber: string;
    };
    deviceInformation: {
        deviceInformation: DeviceInformation;
    };
}

declare const AirGestures: readonly ["oneFingerUp", "twoFingersUp", "oneFingerDown", "twoFingersDown", "oneFingerLeft", "twoFingersLeft", "oneFingerRight", "twoFingersRight", "indexToThumbTouch", "middleToThumbTouch", "xrAirGestureNone", "xrAirGestureThumbIndex", "xrAirGestureThumbMiddle"];
type AirGesture = (typeof AirGestures)[number];
declare const XRAirGestures: readonly ["clickIndex", "clickMiddle", "dragIndex", "dragMiddle", "drop", "potentialDragOrClickIndex", "potentialDragOrClickMiddle"];
type XRAirGesture = (typeof XRAirGestures)[number];

declare const TapFingers: readonly ["thumb", "index", "middle", "ring", "pinky"];
type TapFinger = (typeof TapFingers)[number];
type BooleanFingers = {
    [finger in TapFinger]: boolean;
};
type KeyboardState = {
    shiftState: number;
    switchState: number;
    multitap: number;
};
interface TapDataEventMessages {
    tapAirGesture: {
        tapAirGesture: AirGesture;
    };
    tapData: {
        fingers: BooleanFingers;
        keyboardState?: KeyboardState;
        fingerArray: TapFinger[];
    };
}

interface Vector2 {
    x: number;
    y: number;
}
interface Vector3 extends Vector2 {
    z: number;
}
interface Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}
interface Euler {
    heading: number;
    pitch: number;
    roll: number;
}

interface MouseDataEventMessages {
    mouseData: {
        velocity: Vector2;
        isMouse: boolean;
    };
}

interface AirGestureEventMessages {
    isInAirGestureState: {
        isInAirGestureState: boolean;
    };
    airGesture: {
        airGesture: AirGesture;
    };
    xrAirGesture: {
        xrAirGesture: XRAirGesture;
    };
}

interface BaseRawSensorEventMessage {
    timestamp: number;
    sensorDataType: RawSensorDataType;
}
interface ImuSensorEventMessage extends BaseRawSensorEventMessage {
    accelerometer: Vector3;
    gyroscope: Vector3;
    sensorDataType: "imu";
}
interface DeviceSensorEventMessage extends BaseRawSensorEventMessage {
    fingers: {
        [finger in RawSensorFinger]: Vector3;
    };
    sensorDataType: "device";
}
type RawSensorEventMessage = ImuSensorEventMessage | DeviceSensorEventMessage;
interface RawSensorEventMessages {
    rawSensor: RawSensorEventMessage;
    imu: ImuSensorEventMessage;
    device: DeviceSensorEventMessage;
    orientation: {
        quaternion: Quaternion;
        euler: Euler;
        timestamp: number;
    };
}

interface TxEventMessages extends RawSensorEventMessages {
}

declare const DeviceEventTypes: readonly ["connectionMessage", "notConnected", "connecting", "connected", "disconnecting", "connectionStatus", "isConnected", "batteryLevel", "manufacturerName", "modelNumber", "softwareRevision", "hardwareRevision", "firmwareRevision", "pnpId", "serialNumber", "deviceInformation", "tapData", "tapAirGesture", "mouseData", "airGesture", "isInAirGestureState", "xrAirGesture", "rawSensor", "imu", "device", "orientation"];
type DeviceEventType = (typeof DeviceEventTypes)[number];
interface DeviceEventMessages extends ConnectionStatusEventMessages, DeviceInformationEventMessages, TapDataEventMessages, MouseDataEventMessages, AirGestureEventMessages, TxEventMessages {
    batteryLevel: {
        batteryLevel: number;
    };
    connectionMessage: {
        messageType: ConnectionMessageType;
        dataView: DataView;
    };
}
type DeviceEvent = Event<Device, DeviceEventType, DeviceEventMessages>;
type DeviceEventMap = EventMap<Device, DeviceEventType, DeviceEventMessages>;
type DeviceEventListenerMap = EventListenerMap<Device, DeviceEventType, DeviceEventMessages>;
type BoundDeviceEventListeners = BoundEventListeners<Device, DeviceEventType, DeviceEventMessages>;
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
    get deviceInformation(): DeviceInformation;
    get batteryLevel(): number;
    get inputMode(): "rawSensor" | "controller" | "text" | "controllerWithMouse" | "controllerWithMouseAndKeyboard";
    set inputMode(newInputMode: "rawSensor" | "controller" | "text" | "controllerWithMouse" | "controllerWithMouseAndKeyboard");
    get setInputMode(): (newMode: InputMode) => void;
    get setSensitivityForType(): (rawSensorType: RawSensorType, index: number) => void;
    get xrState(): "user" | "airMouse" | "tapping" | "dontSend";
    set xrState(newXrState: "user" | "airMouse" | "tapping" | "dontSend");
    get setXRState(): (newState: XRState) => void;
    get xrAirGestureMinCount(): number;
    set xrAirGestureMinCount(count: number);
    get calculateOrientation(): boolean;
    set calculateOrientation(newValue: boolean);
    /** [hapticsMs, pauseMs, hapticsMs, pauseMs...] */
    get vibrate(): (segments: number[]) => Promise<void>;
    get isServerSide(): boolean;
    set isServerSide(newIsServerSide: boolean);
}

declare const DeviceManagerEventTypes: readonly ["deviceConnected", "deviceDisconnected", "deviceIsConnected", "availableDevices", "connectedDevices"];
type DeviceManagerEventType = (typeof DeviceManagerEventTypes)[number];
interface DeviceManagerEventMessage {
    device: Device;
}
interface DeviceManagerEventMessages {
    deviceConnected: DeviceManagerEventMessage;
    deviceDisconnected: DeviceManagerEventMessage;
    deviceIsConnected: DeviceManagerEventMessage;
    availableDevices: {
        availableDevices: Device[];
    };
    connectedDevices: {
        connectedDevices: Device[];
    };
}
type DeviceManagerEventMap = EventMap<typeof Device, DeviceManagerEventType, DeviceManagerEventMessages>;
type DeviceManagerEventListenerMap = EventListenerMap<typeof Device, DeviceManagerEventType, DeviceManagerEventMessages>;
type DeviceManagerEvent = Event<typeof Device, DeviceManagerEventType, DeviceManagerEventMessages>;
type BoundDeviceManagerEventListeners = BoundEventListeners<typeof Device, DeviceManagerEventType, DeviceManagerEventMessages>;
declare class DeviceManager {
    #private;
    static readonly shared: DeviceManager;
    constructor();
    /** @private */
    onDevice(device: Device): void;
    /** @private */
    OnDeviceConnectionStatusUpdated(device: Device, connectionStatus: ConnectionStatus): void;
    get ConnectedDevices(): Device[];
    get UseLocalStorage(): boolean;
    set UseLocalStorage(newUseLocalStorage: boolean);
    get CanUseLocalStorage(): false | Storage;
    get AvailableDevices(): Device[];
    get CanGetDevices(): false | (() => Promise<BluetoothDevice[]>);
    /**
     * retrieves devices already connected via web bluetooth in other tabs/windows
     *
     * _only available on web-bluetooth enabled browsers_
     */
    GetDevices(): Promise<Device[] | undefined>;
    get AddEventListener(): <T extends "deviceConnected" | "deviceDisconnected" | "deviceIsConnected" | "availableDevices" | "connectedDevices">(type: T, listener: (event: {
        type: T;
        target: DeviceManager;
        message: DeviceManagerEventMessages[T];
    }) => void, options?: {
        once?: boolean;
    }) => void;
    get RemoveEventListener(): <T extends "deviceConnected" | "deviceDisconnected" | "deviceIsConnected" | "availableDevices" | "connectedDevices">(type: T, listener: (event: {
        type: T;
        target: DeviceManager;
        message: DeviceManagerEventMessages[T];
    }) => void) => void;
    get RemoveEventListeners(): <T extends "deviceConnected" | "deviceDisconnected" | "deviceIsConnected" | "availableDevices" | "connectedDevices">(type: T) => void;
    get RemoveAllEventListeners(): () => void;
}
declare const _default: DeviceManager;

declare const MaxNumberOfVibrations = 9;
declare const MaxNumberOfVibrationSegments: number;

declare class RangeHelper {
    #private;
    get min(): number;
    get max(): number;
    set min(newMin: number);
    set max(newMax: number);
    reset(): void;
    update(value: number): void;
    getNormalization(value: number, weightByRange: boolean): number;
    updateAndGetNormalization(value: number, weightByRange: boolean): number;
}

interface DiscoveredDevice {
    bluetoothId: string;
    name: string;
    rssi: number;
}
interface ScannerDiscoveredDeviceEventMessage {
    discoveredDevice: DiscoveredDevice;
}
interface ScannerEventMessages {
    discoveredDevice: ScannerDiscoveredDeviceEventMessage;
    expiredDiscoveredDevice: ScannerDiscoveredDeviceEventMessage;
    isScanningAvailable: {
        isScanningAvailable: boolean;
    };
    isScanning: {
        isScanning: boolean;
    };
}
type DiscoveredDevicesMap = {
    [deviceId: string]: DiscoveredDevice;
};
declare abstract class BaseScanner {
    #private;
    protected get baseConstructor(): typeof BaseScanner;
    static get isSupported(): boolean;
    get isSupported(): boolean;
    constructor();
    get addEventListener(): <T extends "isScanningAvailable" | "isScanning" | "discoveredDevice" | "expiredDiscoveredDevice">(type: T, listener: (event: {
        type: T;
        target: BaseScanner;
        message: ScannerEventMessages[T];
    }) => void, options?: {
        once?: boolean;
    }) => void;
    protected get dispatchEvent(): <T extends "isScanningAvailable" | "isScanning" | "discoveredDevice" | "expiredDiscoveredDevice">(type: T, message: ScannerEventMessages[T]) => void;
    get removeEventListener(): <T extends "isScanningAvailable" | "isScanning" | "discoveredDevice" | "expiredDiscoveredDevice">(type: T, listener: (event: {
        type: T;
        target: BaseScanner;
        message: ScannerEventMessages[T];
    }) => void) => void;
    get waitForEvent(): <T extends "isScanningAvailable" | "isScanning" | "discoveredDevice" | "expiredDiscoveredDevice">(type: T) => Promise<{
        type: T;
        target: BaseScanner;
        message: ScannerEventMessages[T];
    }>;
    get isScanningAvailable(): boolean;
    get isScanning(): boolean;
    startScan(): void;
    stopScan(): void;
    get discoveredDevices(): Readonly<DiscoveredDevicesMap>;
    get discoveredDevicesArray(): DiscoveredDevice[];
    static get DiscoveredDeviceExpirationTimeout(): number;
    connectToDevice(deviceId: string): Promise<void>;
    get canReset(): boolean;
    reset(): void;
}

declare let scanner: BaseScanner | undefined;

export { type BoundDeviceEventListeners, type BoundDeviceManagerEventListeners, Device, type DeviceEvent, type DeviceEventListenerMap, type DeviceEventMap, type DeviceInformation, _default as DeviceManager, type DeviceManagerEvent, type DeviceManagerEventListenerMap, type DeviceManagerEventMap, type DiscoveredDevice, environment_d as Environment, type InputMode, InputModes, MaxNumberOfVibrationSegments, MaxNumberOfVibrations, RangeHelper, type RawSensorSensitivity, RawSensorSensitivityFactors, type RawSensorType, RawSensorTypes, scanner as Scanner, type XRState, XRStates, setAllConsoleLevelFlags, setConsoleLevelFlagsForType };
