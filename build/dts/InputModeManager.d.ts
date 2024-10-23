import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
export declare const InputModes: readonly [];
export type InputMode = (typeof InputModes)[number];
declare class InputModeManager {
    #private;
    constructor();
    sendRxData: SendDataCallback;
    setMode(mode: InputMode): any;
}
export default InputModeManager;
