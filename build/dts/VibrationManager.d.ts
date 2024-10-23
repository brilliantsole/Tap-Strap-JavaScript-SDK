import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
export declare const MaxNumberOfVibrationSegments = 18;
declare class VibrationManager {
    #private;
    constructor();
    sendUICommandsData: SendDataCallback;
    vibrate(segments: number[]): Promise<void>;
}
export default VibrationManager;
