import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { RawSensorEventMessages } from "./RawSensorManager.ts";
import { RawSensorSensitivity } from "./TS.ts";
export declare const TxMessageTypes: readonly ["tx", "rawSensor"];
export type TxMessageType = (typeof TxMessageTypes)[number];
export declare const TxEventTypes: readonly ["rawSensor", "imu", "device", "orientation"];
export type TxEventType = (typeof TxEventTypes)[number];
export interface TxEventMessages extends RawSensorEventMessages {
}
export type TxEventDispatcher = EventDispatcher<Device, TxEventType, TxEventMessages>;
declare class TxManager {
    #private;
    get eventDispatcher(): TxEventDispatcher;
    set eventDispatcher(newEventDispatcher: TxEventDispatcher);
    set rawSensorSensitivity(sensitivity: RawSensorSensitivity);
    constructor();
    parseMessage(messageType: TxMessageType, dataView: DataView): void;
    clear(): void;
}
export default TxManager;
