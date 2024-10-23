import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
import { RawSensorSensitivity } from "./utils/RawSensorUtils.ts";
export declare const InputModes: readonly ["controller", "text", "rawSensor", "controllerWithMouse", "controllerWithMouseAndKeyboard"];
export type InputMode = (typeof InputModes)[number];
declare class InputManager {
    #private;
    constructor();
    sendRxData: SendDataCallback;
    get sensitivity(): RawSensorSensitivity | undefined;
    set sensitivity(newSensitivity: RawSensorSensitivity | undefined);
    get mode(): "controller" | "text" | "rawSensor" | "controllerWithMouse" | "controllerWithMouseAndKeyboard";
    set mode(newMode: "controller" | "text" | "rawSensor" | "controllerWithMouse" | "controllerWithMouseAndKeyboard");
    setMode(newMode: InputMode): void;
    start(): void;
    stop(): void;
}
export default InputManager;
