import { createConsole } from "./utils/Console.ts";
import autoBind from "auto-bind";

const _console = createConsole("RawSensorManager");

class RawSensorManager {
  constructor() {
    autoBind(this);
  }
}

export default RawSensorManager;
