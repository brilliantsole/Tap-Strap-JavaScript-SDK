import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { Vector2 } from "./utils/MathUtils.ts";

const _console = createConsole("MouseDataManager");

export const MouseDataMessageTypes = ["mouseData"] as const;
export type MouseDataMessageType = (typeof MouseDataMessageTypes)[number];

export const MouseDataEventTypes = [...MouseDataMessageTypes] as const;
export type MouseDataEventType = (typeof MouseDataEventTypes)[number];

export interface MouseDataEventMessages {
  mouseData: { velocity: Vector2; isMouse: boolean };
}

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
        this.#parseMouseData(dataView);
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }

  #parseMouseData(dataView: DataView) {
    _console.log("parsing mouse data", dataView);

    const first = dataView.getUint8(0);
    if (first != 0) {
      return;
    }

    const velocity: Vector2 = {
      x: dataView.getInt16(1, true),
      y: -dataView.getInt16(3, true),
    };
    const isMouse = dataView.getUint8(9) == 1;
    this.#dispatchEvent("mouseData", { velocity, isMouse });
  }
}

export default MouseDataManager;
