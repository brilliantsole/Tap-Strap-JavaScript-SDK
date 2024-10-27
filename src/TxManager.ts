import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import EventDispatcher from "./utils/EventDispatcher.ts";
import Device from "./Device.ts";
import RawSensorManager, {
  RawSensorEventDispatcher,
  RawSensorEventMessages,
  RawSensorEventTypes,
  RawSensorMessageTypes,
} from "./RawSensorManager.ts";
import { RawSensorSensitivity } from "./TS.ts";

const _console = createConsole("TxManager");

export const TxMessageTypes = ["tx", ...RawSensorMessageTypes] as const;
export type TxMessageType = (typeof TxMessageTypes)[number];

export const TxEventTypes = [...RawSensorEventTypes] as const;
export type TxEventType = (typeof TxEventTypes)[number];

export interface TxEventMessages extends RawSensorEventMessages {}

export type TxEventDispatcher = EventDispatcher<Device, TxEventType, TxEventMessages>;

class TxManager {
  #eventDispatcher!: TxEventDispatcher;
  get eventDispatcher() {
    return this.#eventDispatcher;
  }
  set eventDispatcher(newEventDispatcher) {
    this.#eventDispatcher = newEventDispatcher;
    this.#rawSensorManager.eventDispatcher = newEventDispatcher as RawSensorEventDispatcher;
  }
  get #dispatchEvent() {
    return this.eventDispatcher.dispatchEvent;
  }

  set rawSensorSensitivity(sensitivity: RawSensorSensitivity) {
    this.#rawSensorManager.sensitivity = sensitivity;
  }

  constructor() {
    autoBind(this);
  }

  parseMessage(messageType: TxMessageType, dataView: DataView) {
    _console.log({ messageType });

    switch (messageType) {
      case "tx":
        this.#rawSensorManager.parseMessage("rawSensor", dataView);
        break;
      default:
        throw Error(`uncaught messageType ${messageType}`);
    }
  }

  #rawSensorManager = new RawSensorManager();

  clear() {
    this.#rawSensorManager.clear();
  }
}

export default TxManager;
