import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { RawSensorDataType, RawSensorFinger, RawSensorSensitivity } from "./utils/RawSensorUtils.ts";
import { Vector3 } from "./utils/MathUtils.ts";
export declare const RawSensorMessageTypes: readonly ["rawSensor"];
export type RawSensorMessageType = (typeof RawSensorMessageTypes)[number];
export declare const RawSensorEventTypes: readonly ["rawSensor", "imu", "device"];
export type RawSensorEventType = (typeof RawSensorEventTypes)[number];
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
export interface RawSensorEventMessages {
    rawSensor: RawSensorEventMessage;
    imu: ImuSensorEventMessage;
    device: DeviceSensorEventMessage;
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
