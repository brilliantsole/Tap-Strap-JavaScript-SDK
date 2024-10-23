import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
export declare const MaxNumberOfVibrations = 9;
export declare const MaxNumberOfVibrationSegments: number;
declare class VibrationManager {
    #private;
    constructor();
    sendUICommandsData: SendDataCallback;
    vibrate(segments: number[]): Promise<void>;
}
export default VibrationManager;
