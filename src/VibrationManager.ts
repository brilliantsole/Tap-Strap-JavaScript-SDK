import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";
import { clamp } from "./utils/MathUtils.ts";
import { SendDataCallback } from "./connection/BaseConnectionManager.ts";

const _console = createConsole("VibrationManager");

export const MaxNumberOfVibrations = 9;
export const MaxNumberOfVibrationSegments = MaxNumberOfVibrations * 2;

class VibrationManager {
  constructor() {
    autoBind(this);
  }
  sendUICommandsData!: SendDataCallback;

  #createData(segments: number[]) {
    const dataView = new DataView(new ArrayBuffer(2 + MaxNumberOfVibrationSegments));
    let index = 0;
    dataView.setUint8(index++, 0);
    dataView.setUint8(index++, 2);

    for (
      let segmentIndex = 0;
      segmentIndex < segments.length && segmentIndex < MaxNumberOfVibrationSegments;
      segmentIndex++
    ) {
      let value = segments[segmentIndex];
      value /= 10;
      value = clamp(value, 0, 2 ** 8 - 1);
      _console.log(`vibration segment #${segmentIndex}: ${value}`);
      dataView.setUint8(index + segmentIndex, value);
    }
    return dataView;
  }
  async vibrate(segments: number[]) {
    _console.log("triggering vibration segments", segments);
    const dataView = this.#createData(segments);
    await this.sendUICommandsData(dataView?.buffer);
  }
}

export default VibrationManager;
