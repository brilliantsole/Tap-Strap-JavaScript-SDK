import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import {
  RawSensorDataLength,
  RawSensorDataType,
  RawSensorDataTypes,
  RawSensorSensitivity,
  RawSensorSensitivityFactors,
  RawSensorType,
} from "./utils/RawSensorUtils.ts";
import { sliceDataView } from "./utils/ArrayBufferUtils.ts";
import { Vector3 } from "./utils/MathUtils.ts";

const _console = createConsole("RawSensorManager");

export const RawSensorMessageTypes = ["rawSensor"] as const;
export type RawSensorMessageType = (typeof RawSensorMessageTypes)[number];

export const RawSensorEventTypes = [...RawSensorMessageTypes, ...RawSensorDataTypes] as const;
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

class RawSensorManager {
  eventDispatcher!: RawSensorEventDispatcher;
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  sensitivity!: RawSensorSensitivity;

  constructor() {
    autoBind(this);
  }

  parseMessage(messageType: RawSensorMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "rawSensor":
        // FILL
        this.#parseWhole(dataView);
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }

  // https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/RawSensorDataParser.swift#L15
  #parseWhole(dataView: DataView) {
    _console.log("parsing whole", dataView);

    let offset = 0;
    while (offset + 4 < dataView.byteLength) {
      const rawValue = dataView.getUint32(0, true);
      offset += 4;
      _console.log({ rawValue });

      const firstBit = (rawValue & 0x80000000) >> 31;
      const timestamp = rawValue & 0x7fffffff;
      _console.log({ firstBit, timestamp });
      if (timestamp == 0) {
        break;
      }

      const sensorDataType: RawSensorDataType = firstBit == 0 ? "imu" : "device";
      _console.log({ sensorDataType });

      const sensorDataLength = RawSensorDataLength[sensorDataType];
      _console.log({ sensorDataLength });
      if (sensorDataLength == 0) {
        break;
      }

      const sensorData = sliceDataView(dataView, offset, sensorDataLength);
      if (sensorData.byteLength == sensorDataLength) {
        this.#parseSingle(sensorDataType, timestamp, sensorData);
      }

      offset += sensorDataLength;
    }
  }

  // https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/RawSensorData.swift#L80
  #parseSingle(sensorDataType: RawSensorDataType, timestamp: number, sensorData: DataView) {
    _console.log(`parsing ${sensorDataType} ${timestamp}ms`, sensorData);
    let rawSensorType: RawSensorType = sensorDataType == "device" ? "deviceAccelerometer" : "imuGyroscope";

    const points: Vector3[] = [];
    for (let offset = 0; offset < sensorData.byteLength; offset += 6) {
      const sensitivityFactorIndex = this.sensitivity[rawSensorType];
      const sensitivityFactor = RawSensorSensitivityFactors[rawSensorType][sensitivityFactorIndex];
      const [x, y, z] = [
        sensorData.getInt16(offset + 0, true),
        sensorData.getInt16(offset + 2, true),
        sensorData.getInt16(offset + 4, true),
      ].map((value) => value * sensitivityFactor);
      _console.log({ x, y, z });
      const point: Vector3 = { x, y, z };
      _console.log("point", point);
      points.push(point);
      if (sensorDataType == "imu") {
        rawSensorType = "imuAccelerometer";
      }
    }

    let validNumberOfPoints = 0;
    switch (sensorDataType) {
      case "imu":
        validNumberOfPoints = 2;
        break;
      case "device":
        validNumberOfPoints = 5;
        break;
    }

    if (points.length != validNumberOfPoints) {
      _console.log(
        `invalid number of ${sensorDataType} points (expected ${validNumberOfPoints}, get ${points.length})`
      );
      return;
    }

    this.#dispatchEvent(sensorDataType, { sensorDataType, points, timestamp });
    this.#dispatchEvent("rawSensor", { sensorDataType, points, timestamp });
  }
}

export default RawSensorManager;
