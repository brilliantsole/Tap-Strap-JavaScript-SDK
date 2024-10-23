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

//https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/RawSensorData.swift#L50
export const RawSensorDataTypes = ["none", "imu", "device"] as const;
export type RawSensorDataTypes = (typeof RawSensorDataTypes)[number];

export function assertValidRawSensorSensitivity(sensitivity: RawSensorSensitivity) {
  RawSensorTypes.forEach((rawSensorType) => {
    const index = sensitivity[rawSensorType];
    const value = RawSensorSensitivityFactors[rawSensorType][index];
    _console.assertWithError(
      value != undefined,
      `invalid RawSensorSensitivity index ${index} for sensor "${rawSensorType}"`
    );
  });
}
