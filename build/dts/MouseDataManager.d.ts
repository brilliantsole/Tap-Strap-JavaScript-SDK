import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { Vector2 } from "./utils/MathUtils.ts";
export declare const MouseDataMessageTypes: readonly ["mouseData"];
export type MouseDataMessageType = (typeof MouseDataMessageTypes)[number];
export declare const MouseDataEventTypes: readonly ["mouseData"];
export type MouseDataEventType = (typeof MouseDataEventTypes)[number];
export interface MouseDataEventMessages {
    mouseData: {
        velocity: Vector2;
        isMouse: boolean;
    };
}
export type MouseDataEventDispatcher = EventDispatcher<Device, MouseDataEventType, MouseDataEventMessages>;
declare class MouseDataManager {
    #private;
    eventDispatcher: MouseDataEventDispatcher;
    constructor();
    parseMessage(messageType: MouseDataMessageType, dataView: DataView): void;
}
export default MouseDataManager;
