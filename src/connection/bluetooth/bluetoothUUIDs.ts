import { isInBrowser, isInNode } from "../../utils/environment.ts";
import { createConsole } from "../../utils/Console.ts";

const _console = createConsole("bluetoothUUIDs", { log: false });

/** NODE_START */
import * as webbluetooth from "webbluetooth";
var BluetoothUUID = webbluetooth.BluetoothUUID;
/** NODE_END */
/** BROWSER_START */
if (isInBrowser) {
  var BluetoothUUID = window.BluetoothUUID;
}
/** BROWSER_END */

//https://github.com/TapWithUs/tap-ios-sdk/blob/155ab66658662a19d39b231264a3efdd8b5b7e7b/TAPKit-iOS/Helpers/TAPCBUUID.swift#L57
function generateTapBluetoothUUID(value: string): BluetoothServiceUUID {
  _console.assertTypeWithError(value, "string");
  _console.assertWithError(value.length == 1, "value must be 1 character long");
  return `C3FF000${value}-1D8B-40FD-A56F-C7BD5D0F3370`.toLowerCase();
}
// https://github.com/TapWithUs/tap-ios-sdk/blob/155ab66658662a19d39b231264a3efdd8b5b7e7b/TAPKit-iOS/Helpers/TAPCBUUID.swift#L58
function generateNUSBluetoothUUID(value: string): BluetoothServiceUUID {
  _console.assertTypeWithError(value, "string");
  _console.assertWithError(value.length == 1, "value must be 1 character long");
  return `6E40000${value}-B5A3-F393-E0A9-E50E24DCCA9E`.toLowerCase();
}

function stringToCharacteristicUUID(identifier: string): BluetoothCharacteristicUUID {
  return BluetoothUUID?.getCharacteristic?.(identifier);
}

function stringToServiceUUID(identifier: string): BluetoothServiceUUID {
  return BluetoothUUID?.getService?.(identifier);
}

export type BluetoothServiceName = "deviceInformation" | "battery" | "tap" | "nus";
import { DeviceInformationMessageType } from "../../DeviceInformationManager.ts";
export type BluetoothCharacteristicName =
  | DeviceInformationMessageType
  | "batteryLevel"
  | "tapData"
  | "mouseData"
  | "airGesture"
  | "uiCommands"
  | "settings"
  | "unknown3"
  | "unknown2"
  | "unknown7"
  | "unknown8"
  | "unknownB"
  | "unknownC"
  | "unknownD"
  | "rx"
  | "tx";

interface BluetoothCharacteristicInformation {
  uuid: BluetoothCharacteristicUUID;
}
interface BluetoothServiceInformation {
  uuid: BluetoothServiceUUID;
  characteristics: { [characteristicName in BluetoothCharacteristicName]?: BluetoothCharacteristicInformation };
}
interface BluetoothServicesInformation {
  services: { [serviceName in BluetoothServiceName]: BluetoothServiceInformation };
}

const bluetoothUUIDs: BluetoothServicesInformation = Object.freeze({
  services: {
    deviceInformation: {
      uuid: stringToServiceUUID("device_information"),
      characteristics: {
        manufacturerName: {
          uuid: stringToCharacteristicUUID("manufacturer_name_string"),
        },
        modelNumber: {
          uuid: stringToCharacteristicUUID("model_number_string"),
        },
        hardwareRevision: {
          uuid: stringToCharacteristicUUID("hardware_revision_string"),
        },
        firmwareRevision: {
          uuid: stringToCharacteristicUUID("firmware_revision_string"),
        },
        softwareRevision: {
          uuid: stringToCharacteristicUUID("software_revision_string"),
        },
        pnpId: {
          uuid: stringToCharacteristicUUID("pnp_id"),
        },
        serialNumber: {
          uuid: stringToCharacteristicUUID("serial_number_string"),
        },
      },
    },
    battery: {
      uuid: stringToServiceUUID("battery_service"),
      characteristics: {
        batteryLevel: {
          uuid: stringToCharacteristicUUID("battery_level"),
        },
      },
    },
    tap: {
      uuid: generateTapBluetoothUUID("1"),
      characteristics: {
        tapData: { uuid: generateTapBluetoothUUID("5") },
        mouseData: { uuid: generateTapBluetoothUUID("6") },
        airGesture: { uuid: generateTapBluetoothUUID("A") },
        uiCommands: { uuid: generateTapBluetoothUUID("9") },
        settings: { uuid: generateTapBluetoothUUID("2") },
        unknown3: { uuid: generateTapBluetoothUUID("3") },
        unknown7: { uuid: generateTapBluetoothUUID("7") },
        unknown8: { uuid: generateTapBluetoothUUID("8") },
        unknownB: { uuid: generateTapBluetoothUUID("B") },
        unknownC: { uuid: generateTapBluetoothUUID("C") },
        unknownD: { uuid: generateTapBluetoothUUID("D") },
      },
    },
    nus: {
      uuid: generateNUSBluetoothUUID("1"),
      characteristics: {
        rx: { uuid: generateNUSBluetoothUUID("2") },
        tx: { uuid: generateNUSBluetoothUUID("3") },
      },
    },
  },
});

export const serviceUUIDs = [bluetoothUUIDs.services.tap.uuid];
export const optionalServiceUUIDs = [
  bluetoothUUIDs.services.deviceInformation.uuid,
  bluetoothUUIDs.services.battery.uuid,
  bluetoothUUIDs.services.nus.uuid,
];
export const allServiceUUIDs = [...serviceUUIDs, ...optionalServiceUUIDs];

export function getServiceNameFromUUID(serviceUUID: BluetoothServiceUUID): BluetoothServiceName | undefined {
  serviceUUID = serviceUUID.toString().toLowerCase();
  const serviceNames = Object.keys(bluetoothUUIDs.services) as BluetoothServiceName[];
  return serviceNames.find((serviceName) => {
    const serviceInfo = bluetoothUUIDs.services[serviceName];
    let serviceInfoUUID = serviceInfo.uuid.toString();
    if (serviceUUID.length == 4) {
      serviceInfoUUID = serviceInfoUUID.slice(4, 8);
    }
    if (!serviceUUID.includes("-")) {
      serviceInfoUUID = serviceInfoUUID.replaceAll("-", "");
    }
    return serviceUUID == serviceInfoUUID;
  });
}

export const characteristicUUIDs: BluetoothCharacteristicUUID[] = [];
export const allCharacteristicUUIDs: BluetoothCharacteristicUUID[] = [];

export const characteristicNames: BluetoothCharacteristicName[] = [];
export const allCharacteristicNames: BluetoothCharacteristicName[] = [];

Object.values(bluetoothUUIDs.services).forEach((serviceInfo) => {
  if (!serviceInfo.characteristics) {
    return;
  }
  const characteristicNames = Object.keys(serviceInfo.characteristics) as BluetoothCharacteristicName[];
  characteristicNames.forEach((characteristicName) => {
    const characteristicInfo = serviceInfo.characteristics[characteristicName]!;
    if (serviceUUIDs.includes(serviceInfo.uuid)) {
      characteristicUUIDs.push(characteristicInfo.uuid);
      characteristicNames.push(characteristicName);
    }
    allCharacteristicUUIDs.push(characteristicInfo.uuid);
    allCharacteristicNames.push(characteristicName);
  });
}, []);

_console.log({ serviceUUIDs, optionalServiceUUIDs, characteristicUUIDs, allCharacteristicUUIDs });

export function getCharacteristicNameFromUUID(
  characteristicUUID: BluetoothCharacteristicUUID
): BluetoothCharacteristicName | undefined {
  //_console.log({ characteristicUUID });
  characteristicUUID = characteristicUUID.toString().toLowerCase();
  var characteristicName: BluetoothCharacteristicName | undefined;
  Object.values(bluetoothUUIDs.services).some((serviceInfo) => {
    const characteristicNames = Object.keys(serviceInfo.characteristics) as BluetoothCharacteristicName[];
    characteristicName = characteristicNames.find((_characteristicName) => {
      const characteristicInfo = serviceInfo.characteristics[_characteristicName]!;
      let characteristicInfoUUID = characteristicInfo.uuid.toString();
      if (characteristicUUID.length == 4) {
        characteristicInfoUUID = characteristicInfoUUID.slice(4, 8);
      }
      if (!characteristicUUID.includes("-")) {
        characteristicInfoUUID = characteristicInfoUUID.replaceAll("-", "");
      }
      return characteristicUUID == characteristicInfoUUID;
    });
    return characteristicName;
  });
  return characteristicName;
}

export function getCharacteristicProperties(
  characteristicName: BluetoothCharacteristicName
): BluetoothCharacteristicProperties {
  const properties = {
    broadcast: false,
    read: true,
    writeWithoutResponse: false,
    write: false,
    notify: false,
    indicate: false,
    authenticatedSignedWrites: false,
    reliableWrite: false,
    writableAuxiliaries: false,
  };

  // read
  switch (characteristicName) {
    case "settings":
    case "tapData":
    case "mouseData":
    case "unknown7":
    case "unknown8":
      properties.read = false;
      break;
  }

  // notify
  switch (characteristicName) {
    case "batteryLevel":
    case "tapData":
    case "mouseData":
    case "airGesture":
    case "unknown8":
    case "unknownB":
    case "unknownC":
    case "unknownD":
    case "tx":
      properties.notify = true;
      break;
  }

  // write without response
  switch (characteristicName) {
    case "airGesture":
    case "uiCommands":
    case "unknown7":
    case "unknownB":
      properties.writeWithoutResponse = true;
      break;
  }

  // write
  switch (characteristicName) {
    case "settings":
    case "unknown3":
    case "unknown7":
    case "rx":
      properties.write = true;
      break;
  }

  return properties;
}
