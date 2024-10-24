import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
import { RawSensorSensitivity, RawSensorType } from "./utils/RawSensorUtils.ts";
export declare const InputModes: readonly ["controller", "text", "rawSensor", "controllerWithMouse", "controllerWithMouseAndKeyboard"];
export type InputMode = (typeof InputModes)[number];
declare class InputManager {
    #private;
    constructor();
    sendRxData: SendDataCallback;
    get sensitivity(): RawSensorSensitivity;
    set sensitivity(newSensitivity: RawSensorSensitivity);
    setSensitivityForType(rawSensorType: RawSensorType, index: number): void;
    get mode(): "rawSensor" | "controller" | "text" | "controllerWithMouse" | "controllerWithMouseAndKeyboard";
    set mode(newMode: "rawSensor" | "controller" | "text" | "controllerWithMouse" | "controllerWithMouseAndKeyboard");
    setMode(newMode: InputMode): void;
    start(): void;
    stop(): void;
}
export default InputManager;
