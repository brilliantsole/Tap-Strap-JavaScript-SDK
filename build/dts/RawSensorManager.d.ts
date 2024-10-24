import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { RawSensorDataType, RawSensorSensitivity } from "./utils/RawSensorUtils.ts";
import { Vector3 } from "./utils/MathUtils.ts";
export declare const RawSensorMessageTypes: readonly ["rawSensor"];
export type RawSensorMessageType = (typeof RawSensorMessageTypes)[number];
export declare const RawSensorEventTypes: readonly ["rawSensor", "imu", "device"];
export type RawSensorEventType = (typeof RawSensorEventTypes)[number];
export type RawSensorEventMessage = {
    timestamp: number;
    sensorDataType: RawSensorDataType;
    points: Vector3[];
};
export interface RawSensorEventMessages {
    rawSensor: RawSensorEventMessage;
    imu: RawSensorEventMessage;
    device: RawSensorEventMessage;
}
export type RawSensorEventDispatcher = EventDispatcher<Device, RawSensorEventType, RawSensorEventMessages>;
declare class RawSensorManager {
    #private;
    eventDispatcher: RawSensorEventDispatcher;
    sensitivity: RawSensorSensitivity;
    constructor();
    parseMessage(messageType: RawSensorMessageType, dataView: DataView): void;
}
export default RawSensorManager;
