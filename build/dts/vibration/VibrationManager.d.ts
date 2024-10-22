import { SendMessageCallback } from "../Device.ts";
export declare const VibrationMessageTypes: readonly ["triggerVibration"];
export type VibrationMessageType = (typeof VibrationMessageTypes)[number];
export declare const MaxNumberOfVibrationSegments = 9;
export type SendVibrationMessageCallback = SendMessageCallback<VibrationMessageType>;
declare class VibrationManager {
    constructor();
    sendMessage: SendVibrationMessageCallback;
    triggerVibration(segments: number[]): Promise<void>;
}
export default VibrationManager;
