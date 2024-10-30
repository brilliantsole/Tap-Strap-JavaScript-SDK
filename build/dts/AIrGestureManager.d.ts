import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { AirGesture, XRAirGesture } from "./utils/GestureUtils.ts";
export declare const AirGestureMessageTypes: readonly ["airGesture"];
export type AirGestureMessageType = (typeof AirGestureMessageTypes)[number];
export declare const AirGestureEventTypes: readonly ["airGesture", "isInAirGestureState", "xrAirGesture"];
export type AirGestureEventType = (typeof AirGestureEventTypes)[number];
export interface AirGestureEventMessages {
    isInAirGestureState: {
        isInAirGestureState: boolean;
    };
    airGesture: {
        airGesture: AirGesture;
    };
    xrAirGesture: {
        xrAirGesture: XRAirGesture;
    };
}
export type AirGestureEventDispatcher = EventDispatcher<Device, AirGestureEventType, AirGestureEventMessages>;
declare class AirGestureManager {
    #private;
    eventDispatcher: AirGestureEventDispatcher;
    constructor();
    get isInState(): boolean;
    parseMessage(messageType: AirGestureMessageType, dataView: DataView): void;
    xrAirGestureCount: number;
    xrAirGestureMinCount: number;
}
export default AirGestureManager;
