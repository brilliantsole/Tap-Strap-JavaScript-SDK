import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { AirGesture } from "./utils/GestureUtils.ts";
export declare const TapDataMessageTypes: readonly ["tapData"];
export type TapDataMessageType = (typeof TapDataMessageTypes)[number];
export declare const TapDataEventTypes: readonly ["tapData", "tapAirGesture"];
export type TapDataEventType = (typeof TapDataEventTypes)[number];
export declare const TapFingers: readonly ["thumb", "index", "middle", "ring", "pinky"];
export type TapFinger = (typeof TapFingers)[number];
type BooleanFingers = {
    [finger in TapFinger]: boolean;
};
type KeyboardState = {
    shiftState: number;
    switchState: number;
    multitap: number;
};
export interface TapDataEventMessages {
    tapAirGesture: {
        tapAirGesture: AirGesture;
    };
    tapData: {
        fingers: BooleanFingers;
        keyboardState?: KeyboardState;
        fingerArray: TapFinger[];
        fingerIndices: number[];
    };
}
export type TapDataEventDispatcher = EventDispatcher<Device, TapDataEventType, TapDataEventMessages>;
declare class TapDataManager {
    #private;
    eventDispatcher: TapDataEventDispatcher;
    constructor();
    isInAirGestureState: boolean;
    parseMessage(messageType: TapDataMessageType, dataView: DataView): void;
}
export default TapDataManager;
