import { createConsole } from "../utils/Console.ts";
import { concatenateArrayBuffers } from "../utils/ArrayBufferUtils.ts";
import { SendMessageCallback } from "../Device.ts";
import autoBind from "auto-bind";

const _console = createConsole("VibrationManager");

export const VibrationMessageTypes = ["triggerVibration"] as const;
export type VibrationMessageType = (typeof VibrationMessageTypes)[number];

export const MaxNumberOfVibrationSegments = 9;

export type SendVibrationMessageCallback = SendMessageCallback<VibrationMessageType>;

class VibrationManager {
  constructor() {
    autoBind(this);
  }
  sendMessage!: SendVibrationMessageCallback;

  async triggerVibration(segments: number[]) {
    // FILL
    //await this.sendMessage([{ type: "triggerVibration", data: triggerVibrationData }]);
  }
}

export default VibrationManager;
