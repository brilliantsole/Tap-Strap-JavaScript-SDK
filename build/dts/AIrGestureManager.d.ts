import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
export declare const AirGestureMessageTypes: readonly ["airGesture"];
export type AirGestureMessageType = (typeof AirGestureMessageTypes)[number];
export declare const AirGestureEventTypes: readonly ["airGesture"];
export type AirGestureEventType = (typeof AirGestureEventTypes)[number];
export interface AirGestureEventMessages {
}
export type AirGestureEventDispatcher = EventDispatcher<Device, AirGestureEventType, AirGestureEventMessages>;
declare class AirGestureManager {
    #private;
    eventDispatcher: AirGestureEventDispatcher;
    constructor();
    parseMessage(messageType: AirGestureMessageType, dataView: DataView): void;
}
export default AirGestureManager;
