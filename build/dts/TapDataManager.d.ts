import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
export declare const TapDataMessageTypes: readonly ["tapData"];
export type TapDataMessageType = (typeof TapDataMessageTypes)[number];
export declare const TapDataEventTypes: readonly ["tapData"];
export type TapDataEventType = (typeof TapDataEventTypes)[number];
export interface TapDataEventMessages {
}
export type TapDataEventDispatcher = EventDispatcher<Device, TapDataEventType, TapDataEventMessages>;
declare class TapDataManager {
    #private;
    eventDispatcher: TapDataEventDispatcher;
    constructor();
    parseMessage(messageType: TapDataMessageType, dataView: DataView): void;
}
export default TapDataManager;
