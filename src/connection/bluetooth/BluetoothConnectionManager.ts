import { createConsole } from "../../utils/Console.ts";
import BaseConnectionManager from "../BaseConnectionManager.ts";

const _console = createConsole("BluetoothConnectionManager", { log: true });

import { BluetoothCharacteristicName } from "./bluetoothUUIDs.ts";

abstract class BluetoothConnectionManager extends BaseConnectionManager {
  isInRange = true;

  protected onCharacteristicValueChanged(characteristicName: BluetoothCharacteristicName, dataView: DataView) {
    switch (characteristicName) {
      case "batteryLevel":

      case "firmwareRevision":
      case "hardwareRevision":
      case "manufacturerName":
      case "modelNumber":
      case "pnpId":
      case "serialNumber":
      case "softwareRevision":
        this.onMessageReceived?.(characteristicName, dataView);
        break;
      default:
        break;
    }
  }

  protected async writeCharacteristic(characteristicName: BluetoothCharacteristicName, data: ArrayBuffer) {
    _console.log("writeCharacteristic", ...arguments);
  }

  async sendUICommandsData(data: ArrayBuffer) {
    super.sendUICommandsData(data);
    await this.writeCharacteristic("uiCommands", data);
  }

  async sendRxData(data: ArrayBuffer) {
    super.sendRxData(data);
    await this.writeCharacteristic("rx", data);
  }
}

export default BluetoothConnectionManager;
