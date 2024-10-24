import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";

const _console = createConsole("MouseDataManager");

export const MouseDataMessageTypes = ["mouseData"] as const;
export type MouseDataMessageType = (typeof MouseDataMessageTypes)[number];

export const MouseDataEventTypes = [...MouseDataMessageTypes] as const;
export type MouseDataEventType = (typeof MouseDataEventTypes)[number];

export interface MouseDataEventMessages {}

export type MouseDataEventDispatcher = EventDispatcher<Device, MouseDataEventType, MouseDataEventMessages>;

class MouseDataManager {
  eventDispatcher!: MouseDataEventDispatcher;
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  constructor() {
    autoBind(this);
  }

  parseMessage(messageType: MouseDataMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "mouseData":
        // FILL
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }
}

export default MouseDataManager;
