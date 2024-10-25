import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import { AirGesture, tapByteToAirGesture } from "./utils/GestureUtils.ts";

const _console = createConsole("TapDataManager");

export const TapDataMessageTypes = ["tapData"] as const;
export type TapDataMessageType = (typeof TapDataMessageTypes)[number];

export const TapDataEventTypes = [...TapDataMessageTypes, "tapAirGesture"] as const;
export type TapDataEventType = (typeof TapDataEventTypes)[number];

export const TapFingers = ["thumb", "index", "middle", "ring", "pinky"] as const;
export type TapFinger = (typeof TapFingers)[number];

type BooleanFingers = { [finger in TapFinger]: boolean };
type KeyboardState = {
  shiftState: number;
  switchState: number;
  multitap: number;
};

export interface TapDataEventMessages {
  tapAirGesture: { tapAirGesture: AirGesture };
  tapData: { fingers: BooleanFingers; keyboardState?: KeyboardState };
}

export type TapDataEventDispatcher = EventDispatcher<Device, TapDataEventType, TapDataEventMessages>;

class TapDataManager {
  eventDispatcher!: TapDataEventDispatcher;
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  constructor() {
    autoBind(this);
  }

  isInAirGestureState = false;

  parseMessage(messageType: TapDataMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "tapData":
        this.#parse(dataView);
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }

  #parse(dataView: DataView) {
    _console.log("parsing tap data", dataView);
    const first = dataView.getUint8(0);
    if (this.isInAirGestureState) {
      const tapAirGesture = tapByteToAirGesture(first);
      _console.log({ tapAirGesture });
      if (tapAirGesture) {
        this.#dispatchEvent("tapAirGesture", { tapAirGesture });
      }
    } else {
      let keyboardState: KeyboardState | undefined;
      if (dataView.byteLength >= 4) {
        const keyboardStateByte = dataView.getUint8(3);
        keyboardState = {
          shiftState: keyboardStateByte & 0b00000011,
          switchState: (keyboardStateByte >> 2) & 0b00000011,
          multitap: Math.min(((keyboardStateByte >> 4) & 0b00000011) + 1, 3),
        };
      }
      // @ts-ignore
      const fingers: BooleanFingers = {};
      _console.log("fingerBits", first.toString(2));
      TapFingers.forEach((finger, index) => {
        fingers[finger] = (first & (1 << index)) != 0;
      });
      _console.log("fingers", fingers);
      this.#dispatchEvent("tapData", { fingers, keyboardState });
    }
  }
}

export default TapDataManager;
