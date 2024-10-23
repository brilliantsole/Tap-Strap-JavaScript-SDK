export { setAllConsoleLevelFlags, setConsoleLevelFlagsForType } from "./utils/Console.ts";
export * as Environment from "./utils/environment.ts";

export {
  default as Device,
  DeviceEvent,
  DeviceEventMap,
  DeviceEventListenerMap,
  BoundDeviceEventListeners,
} from "./Device.ts";
export {
  default as DeviceManager,
  DeviceManagerEvent,
  DeviceManagerEventMap,
  DeviceManagerEventListenerMap,
  BoundDeviceManagerEventListeners,
} from "./DeviceManager.ts";

export { DeviceInformation } from "./DeviceInformationManager.ts";
export { MaxNumberOfVibrationSegments } from "./VibrationManager.ts";
export { InputModes, type InputMode } from "./InputManager.ts";

export { default as RangeHelper } from "./utils/RangeHelper.ts";

export {
  type RawSensorType,
  RawSensorTypes,
  type RawSensorSensitivity,
  RawSensorSensitivityFactors,
} from "./utils/RawSensorUtils.ts";

export { DiscoveredDevice } from "./scanner/BaseScanner.ts";
/** NODE_START */
export { default as Scanner } from "./scanner/Scanner.ts";
/** NODE_END */
