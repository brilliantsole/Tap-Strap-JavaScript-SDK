import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import {
  RawSensorDataLength,
  RawSensorDataType,
  RawSensorDataTypes,
  RawSensorFinger,
  RawSensorFingers,
  RawSensorImuTypes,
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
  fingers: { [finger in RawSensorFinger]: Vector3 };
  sensorDataType: "device";
}
type RawSensorEventMessage = ImuSensorEventMessage | DeviceSensorEventMessage;
export interface RawSensorEventMessages {
  rawSensor: RawSensorEventMessage;
  imu: ImuSensorEventMessage;
  device: DeviceSensorEventMessage;
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

    const vectors: Vector3[] = [];
    for (let offset = 0; offset < sensorData.byteLength; offset += 6) {
      const sensitivityFactorIndex = this.sensitivity[rawSensorType];
      const sensitivityFactor = RawSensorSensitivityFactors[rawSensorType][sensitivityFactorIndex];
      const [z, y, x] = [
        -sensorData.getInt16(offset + 0, true),
        sensorData.getInt16(offset + 2, true),
        sensorData.getInt16(offset + 4, true),
      ].map((value) => value * sensitivityFactor);
      _console.log({ x, y, z });
      const vector: Vector3 = { x, y, z };
      _console.log("vector", vector);
      vectors.push(vector);
      if (sensorDataType == "imu") {
        rawSensorType = "imuAccelerometer";
      }
    }

    let validNumberOfVectors = 0;
    switch (sensorDataType) {
      case "imu":
        validNumberOfVectors = 2;
        break;
      case "device":
        validNumberOfVectors = 5;
        break;
    }

    if (vectors.length != validNumberOfVectors) {
      _console.log(
        `invalid number of ${sensorDataType} vectors (expected ${validNumberOfVectors}, get ${vectors.length})`
      );
      return;
    }

    // @ts-ignore
    const message: RawSensorEventMessage = { sensorDataType, timestamp };
    switch (message.sensorDataType) {
      case "imu":
        message.accelerometer = vectors[RawSensorImuTypes.indexOf("accelerometer")];
        message.gyroscope = vectors[RawSensorImuTypes.indexOf("gyroscope")];
        break;
      case "device":
        // @ts-ignore
        message.fingers = {};
        RawSensorFingers.forEach((finger, index) => {
          message.fingers[finger] = vectors[index];
        });
        break;
    }

    this.#dispatchEvent(sensorDataType, message);
    this.#dispatchEvent("rawSensor", message);
  }
}

export default RawSensorManager;
