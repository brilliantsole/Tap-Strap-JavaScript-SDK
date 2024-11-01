export type BluetoothServiceName = "deviceInformation" | "battery" | "tap" | "nus";
import { DeviceInformationMessageType } from "../../DeviceInformationManager.ts";
export type BluetoothCharacteristicName = DeviceInformationMessageType | "batteryLevel" | "tapData" | "mouseData" | "airGesture" | "uiCommands" | "settings" | "unknown3" | "unknown2" | "unknown7" | "unknown8" | "unknownB" | "unknownC" | "unknownD" | "rx" | "tx";
export declare const serviceUUIDs: BluetoothServiceUUID[];
export declare const optionalServiceUUIDs: BluetoothServiceUUID[];
export declare const allServiceUUIDs: BluetoothServiceUUID[];
export declare function getServiceNameFromUUID(serviceUUID: BluetoothServiceUUID): BluetoothServiceName | undefined;
export declare const characteristicUUIDs: BluetoothCharacteristicUUID[];
export declare const allCharacteristicUUIDs: BluetoothCharacteristicUUID[];
export declare const characteristicNames: BluetoothCharacteristicName[];
export declare const allCharacteristicNames: BluetoothCharacteristicName[];
export declare function getCharacteristicNameFromUUID(characteristicUUID: BluetoothCharacteristicUUID): BluetoothCharacteristicName | undefined;
export declare function getCharacteristicProperties(characteristicName: BluetoothCharacteristicName): BluetoothCharacteristicProperties;
