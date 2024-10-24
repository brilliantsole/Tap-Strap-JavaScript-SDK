import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";

const _console = createConsole("AirGestureManager");

export const AirGestureMessageTypes = ["airGesture"] as const;
export type AirGestureMessageType = (typeof AirGestureMessageTypes)[number];

export const AirGestureEventTypes = [...AirGestureMessageTypes] as const;
export type AirGestureEventType = (typeof AirGestureEventTypes)[number];

export interface AirGestureEventMessages {}

export type AirGestureEventDispatcher = EventDispatcher<Device, AirGestureEventType, AirGestureEventMessages>;

class AirGestureManager {
  eventDispatcher!: AirGestureEventDispatcher;
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  constructor() {
    autoBind(this);
  }

  parseMessage(messageType: AirGestureMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "airGesture":
        // FILL
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }
}

export default AirGestureManager;
