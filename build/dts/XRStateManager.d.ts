import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
export declare const XRStates: readonly ["user", "airMouse", "tapping", "dontSend"];
export type XRState = (typeof XRStates)[number];
declare class XRStateManager {
    #private;
    constructor();
    sendRxData: SendDataCallback;
    get state(): "user" | "airMouse" | "tapping" | "dontSend";
    set state(newState: "user" | "airMouse" | "tapping" | "dontSend");
    setState(newState: XRState): void;
    start(): void;
    stop(): void;
}
export default XRStateManager;
