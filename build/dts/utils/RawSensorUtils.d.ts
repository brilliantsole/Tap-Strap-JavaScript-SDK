export declare const RawSensorTypes: readonly ["deviceAccelerometer", "imuGyroscope", "imuAccelerometer"];
export type RawSensorType = (typeof RawSensorTypes)[number];
export declare const RawSensorSensitivityFactors: {
    [rawSensorType in RawSensorType]: number[];
};
export type RawSensorSensitivity = {
    [rawSensorType in RawSensorType]: number;
};
export declare const DefaultRawSensorSensitivity: RawSensorSensitivity;
export declare const RawSensorDataTypes: readonly ["imu", "device"];
export type RawSensorDataType = (typeof RawSensorDataTypes)[number];
export declare const RawSensorDataLength: {
    [rawSensorDataType in RawSensorDataType]: number;
};
export declare function assertValidRawSensorSensitivityForType(rawSensorType: RawSensorType, index: number): void;
export declare function assertValidRawSensorSensitivity(sensitivity: RawSensorSensitivity): void;
export declare const RawSensorImuTypes: readonly ["gyroscope", "accelerometer"];
export type RawSensorImuType = (typeof RawSensorImuTypes)[number];
export declare const RawSensorFingers: readonly ["thumb", "index", "middle", "ring", "pinky"];
export type RawSensorFinger = (typeof RawSensorFingers)[number];
