import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";

const _console = createConsole("TapDataManager");

export const TapDataMessageTypes = ["tapData"] as const;
export type TapDataMessageType = (typeof TapDataMessageTypes)[number];

export const TapDataEventTypes = [...TapDataMessageTypes] as const;
export type TapDataEventType = (typeof TapDataEventTypes)[number];

export interface TapDataEventMessages {}

export type TapDataEventDispatcher = EventDispatcher<Device, TapDataEventType, TapDataEventMessages>;

class TapDataManager {
  eventDispatcher!: TapDataEventDispatcher;
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  constructor() {
    autoBind(this);
  }

  parseMessage(messageType: TapDataMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "tapData":
        // FILL
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }
}

export default TapDataManager;
