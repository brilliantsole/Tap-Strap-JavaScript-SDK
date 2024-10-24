import { createConsole } from "./Console.ts";

const _console = createConsole("RawSensorUtils");

// https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/TAPRawSensorSensitivity.swift#L13
export const RawSensorTypes = ["deviceAccelerometer", "imuGyroscope", "imuAccelerometer"] as const;
export type RawSensorType = (typeof RawSensorTypes)[number];

export const RawSensorSensitivityFactors: { [rawSensorType in RawSensorType]: number[] } = {
  deviceAccelerometer: [31.25, 3.90625, 7.8125, 15.625, 31.25],
  imuGyroscope: [17.5, 4.375, 8.75, 17.5, 35, 70],
  imuAccelerometer: [0.122, 0.061, 0.122, 0.244, 0.488],
};
export type RawSensorSensitivity = { [rawSensorType in RawSensorType]: number };
export const DefaultRawSensorSensitivity: RawSensorSensitivity = {
  deviceAccelerometer: 0,
  imuGyroscope: 0,
  imuAccelerometer: 0,
};

//https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/RawSensorData.swift#L50
export const RawSensorDataTypes = ["imu", "device"] as const;
export type RawSensorDataType = (typeof RawSensorDataTypes)[number];
export const RawSensorDataLength: { [rawSensorDataType in RawSensorDataType]: number } = {
  imu: 12,
  device: 30,
};

export function assertValidRawSensorSensitivityForType(rawSensorType: RawSensorType, index: number) {
  const value = RawSensorSensitivityFactors[rawSensorType][index];
  _console.assertWithError(
    value != undefined,
    `invalid RawSensorSensitivity index ${index} for sensor "${rawSensorType}" (got value ${value})`
  );
}

export function assertValidRawSensorSensitivity(sensitivity: RawSensorSensitivity) {
  RawSensorTypes.forEach((rawSensorType) => {
    const index = sensitivity[rawSensorType];
    assertValidRawSensorSensitivityForType(rawSensorType, index);
  });
}

// https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/RawSensorData.swift#L60C5-L66C43
export const RawSensorImuTypes = ["gyro", "accelerometer"] as const;
export type RawSensorImuType = (typeof RawSensorImuTypes)[number];

export const RawSensorFingers = ["thumb", "index", "middle", "ring", "pinky"] as const;
export type RawSensorFinger = (typeof RawSensorFingers)[number];
