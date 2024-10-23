export declare const RawSensorTypes: readonly ["deviceAccelerometer", "imuGyroscope", "imuAccelerometer"];
export type RawSensorType = (typeof RawSensorTypes)[number];
export declare const RawSensorSensitivityFactors: {
    [rawSensorType in RawSensorType]: number[];
};
export type RawSensorSensitivity = {
    [rawSensorType in RawSensorType]: number;
};
export declare const RawSensorDataTypes: readonly ["none", "imu", "device"];
export type RawSensorDataTypes = (typeof RawSensorDataTypes)[number];
export declare function assertValidRawSensorSensitivity(sensitivity: RawSensorSensitivity): void;
