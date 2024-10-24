import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import { SendDataCallback } from "./connection/BaseConnectionManager.ts";
import { concatenateArrayBuffers } from "./utils/ArrayBufferUtils.ts";
import Timer from "./utils/Timer.ts";

const _console = createConsole("XRStateManager");

export const XRStates = ["user", "airMouse", "tapping", "dontSend"] as const;
export type XRState = (typeof XRStates)[number];

// https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/TAPXRState/TAPXRState.swift
const XRStateBytes: { [state in XRState]?: number } = {
  user: 0x3,
  airMouse: 0x1,
  tapping: 0x2,
};

class XRStateManager {
  constructor() {
    autoBind(this);
  }
  sendRxData!: SendDataCallback;

  #state: XRState = "user";
  get state() {
    return this.#state;
  }
  set state(newState) {
    this.#assertValidState(newState);
    if (this.state == newState) {
      _console.log(`redundant state assignment "${newState}"`);
      return;
    }
    this.#state = newState;

    if (this.#timer.isRunning) {
      this.#timer.restart(true);
    }
  }
  setState(newState: XRState) {
    this.state = newState;
  }
  #assertValidState(state: XRState) {
    _console.assertEnumWithError(state, XRStates);
  }

  // https://github.com/TapWithUs/tap-ios-sdk/blob/master/TAPKit-iOS/TAPXRState/TAPXRState.swift#L41
  #createData() {
    const stateByte = XRStateBytes[this.state];
    _console.assert(stateByte != undefined, `no stateByte found for state "${this.state}"`);
    const data = concatenateArrayBuffers(0x3, 0xd, 0x0, stateByte);
    return data;
  }

  #timer = new Timer(this.#sendStateData.bind(this), 10 * 1000);
  start() {
    this.#timer.start(true);
  }
  stop() {
    this.#timer.stop();
  }

  #sendStateData() {
    if (this.state == "dontSend") {
      return;
    }
    _console.log("sending state data...");
    const data = this.#createData();
    this.sendRxData(data);
  }
}

export default XRStateManager;
