import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
import { concatenateArrayBuffers } from "./utils/ArrayBufferUtils.ts";
import {
  assertValidRawSensorSensitivity,
  assertValidRawSensorSensitivityForType,
  DefaultRawSensorSensitivity,
  RawSensorSensitivity,
  RawSensorType,
  RawSensorTypes,
} from "./utils/RawSensorUtils.ts";
import Timer from "./utils/Timer.ts";

const _console = createConsole("InputManager");

export const InputModes = [
  "controller",
  "text",
  "rawSensor",
  "controllerWithMouse",
  "controllerWithMouseAndKeyboard",
] as const;
export type InputMode = (typeof InputModes)[number];

// https://github.com/TapWithUs/tap-ios-sdk/blob/155ab66658662a19d39b231264a3efdd8b5b7e7b/TAPKit-iOS/TAPInputMode/TAPInputMode.swift#L20
const InputModeBytes: { [mode in InputMode]: number } = {
  controller: 0x1,
  text: 0x0,
  rawSensor: 0xa,
  controllerWithMouse: 0x3,
  controllerWithMouseAndKeyboard: 0x5,
};

class InputManager {
  constructor() {
    autoBind(this);
  }
  sendRxData!: SendDataCallback;

  #sensitivity: RawSensorSensitivity = Object.assign({}, DefaultRawSensorSensitivity);
  get sensitivity() {
    return this.#sensitivity;
  }
  set sensitivity(newSensitivity) {
    this.#sensitivity = newSensitivity;
  }

  setSensitivityForType(rawSensorType: RawSensorType, index: number) {
    assertValidRawSensorSensitivityForType(rawSensorType, index);
    _console.log(`setting ${rawSensorType} sensitivity index to ${index}`);
    this.#sensitivity[rawSensorType] = index;
  }

  #mode: InputMode = "controller";
  get mode() {
    return this.#mode;
  }
  set mode(newMode) {
    this.#assertValidMode(newMode);
    if (this.mode == newMode) {
      _console.log(`redundant mode assignment "${newMode}"`);
      return;
    }
    this.#mode = newMode;

    if (this.#timer.isRunning) {
      this.#timer.restart(true);
    }
  }
  setMode(newMode: InputMode) {
    this.mode = newMode;
  }
  #assertValidMode(mode: InputMode) {
    _console.assertEnumWithError(mode, InputModes);
  }

  // https://github.com/TapWithUs/tap-ios-sdk/blob/155ab66658662a19d39b231264a3efdd8b5b7e7b/TAPKit-iOS/TAPInputMode/TAPInputMode.swift#L59
  #createData() {
    const modeByte = InputModeBytes[this.mode];
    let sensitivityFactorIndices: number[] = [];
    if (this.mode == "rawSensor") {
      _console.assertWithError(this.sensitivity, "no sensitivity defined for rawSensor input mode");
      assertValidRawSensorSensitivity(this.sensitivity!);
      // https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/Helpers/RawSensorData/TAPRawSensorSensitivity.swift#L105
      RawSensorTypes.forEach((rawSensorType) => {
        sensitivityFactorIndices.push(this.sensitivity![rawSensorType]);
      });
    }
    const data = concatenateArrayBuffers(0x3, 0xc, 0x0, modeByte, sensitivityFactorIndices);
    return data;
  }

  #timer = new Timer(this.#sendModeData.bind(this), 10 * 1000);
  start() {
    this.#timer.start(true);
  }
  stop() {
    this.#timer.stop();
  }

  #sendModeData() {
    _console.log("sending mode data...");
    const data = this.#createData();
    this.sendRxData(data);
  }
}

export default InputManager;
