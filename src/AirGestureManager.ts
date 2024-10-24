import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { AirGesture, AirGestureEnumLookup, XRAirGesture, XRAirGestureEnumLookup } from "./utils/GestureUtils.ts";

const _console = createConsole("AirGestureManager");

export const AirGestureMessageTypes = ["airGesture"] as const;
export type AirGestureMessageType = (typeof AirGestureMessageTypes)[number];

export const AirGestureEventTypes = [...AirGestureMessageTypes, "isInAirGestureState", "xrAirGesture"] as const;
export type AirGestureEventType = (typeof AirGestureEventTypes)[number];

export interface AirGestureEventMessages {
  isInAirGestureState: { isInAirGestureState: boolean };
  airGesture: { airGesture: AirGesture };
  xrAirGesture: { xrAirGesture: XRAirGesture };
}

export type AirGestureEventDispatcher = EventDispatcher<Device, AirGestureEventType, AirGestureEventMessages>;

class AirGestureManager {
  eventDispatcher!: AirGestureEventDispatcher;
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  constructor() {
    autoBind(this);
  }

  #isInState = false;
  get isInState() {
    return this.#isInState;
  }
  #updateIsInState(newIsInState: boolean) {
    this.#isInState = newIsInState;
    this.#dispatchEvent("isInAirGestureState", { isInAirGestureState: this.#isInState });
  }

  parseMessage(messageType: AirGestureMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "airGesture":
        this.#parseAirGesture(dataView);
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }

  #parseAirGesture(dataView: DataView) {
    _console.log("parsing air gesture", dataView);

    const first = dataView.getUint8(0);
    if (first == 20) {
      const second = dataView.getUint8(1);
      this.#updateIsInState(second == 1);
    } else {
      let airGesture = AirGestureEnumLookup[first];
      _console.log({ airGesture });
      if (airGesture) {
        this.#dispatchEvent("airGesture", { airGesture });
      } else {
        const xrAirGesture = XRAirGestureEnumLookup[first];
        _console.log({ xrAirGesture });
        if (xrAirGesture) {
          this.#dispatchEvent("xrAirGesture", { xrAirGesture });
        }
      }
    }
  }
}

export default AirGestureManager;
