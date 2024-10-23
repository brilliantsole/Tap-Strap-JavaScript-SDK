/**
 * @copyright Zack Qattan 2024
 * @license MIT
 */
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const __BRILLIANTSOLE__ENVIRONMENT__ = "__BRILLIANTSOLE__DEV__";
const isInProduction = __BRILLIANTSOLE__ENVIRONMENT__ == "__BRILLIANTSOLE__PROD__";
const isInDev = __BRILLIANTSOLE__ENVIRONMENT__ == "__BRILLIANTSOLE__DEV__";
const isInBrowser = typeof window !== "undefined" && typeof window?.document !== "undefined";
const isInNode = typeof process !== "undefined" && process?.versions?.node != null;
const userAgent = (isInBrowser && navigator.userAgent) || "";
let isBluetoothSupported = false;
if (isInBrowser) {
    isBluetoothSupported = Boolean(navigator.bluetooth);
}
else if (isInNode) {
    isBluetoothSupported = true;
}
const isInBluefy = isInBrowser && /Bluefy/i.test(userAgent);
const isInWebBLE = isInBrowser && /WebBLE/i.test(userAgent);
const isAndroid = isInBrowser && /Android/i.test(userAgent);
const isSafari = isInBrowser && /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
const isIOS = isInBrowser && /iPad|iPhone|iPod/i.test(userAgent);
const isMac = isInBrowser && /Macintosh/i.test(userAgent);
const isInLensStudio = !isInBrowser && !isInNode && typeof global !== "undefined" && typeof Studio !== "undefined";

var environment = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isAndroid: isAndroid,
    get isBluetoothSupported () { return isBluetoothSupported; },
    isIOS: isIOS,
    isInBluefy: isInBluefy,
    isInBrowser: isInBrowser,
    isInDev: isInDev,
    isInLensStudio: isInLensStudio,
    isInNode: isInNode,
    isInProduction: isInProduction,
    isInWebBLE: isInWebBLE,
    isMac: isMac,
    isSafari: isSafari
});

var _a$1, _Console_consoles, _Console_levelFlags;
var __console;
if (isInLensStudio) {
    const log = function (...args) {
        Studio.log(args.map((value) => new String(value)).join(","));
    };
    __console = {};
    __console.log = log;
    __console.warn = log.bind(__console, "WARNING");
    __console.error = log.bind(__console, "ERROR");
}
else {
    __console = console;
}
if (!__console.assert) {
    const assert = (condition, ...data) => {
        if (!condition) {
            __console.warn(...data);
        }
    };
    __console.assert = assert;
}
if (!__console.table) {
    const table = (...data) => {
        __console.log(...data);
    };
    __console.table = table;
}
function emptyFunction() { }
const log = __console.log.bind(__console);
const warn = __console.warn.bind(__console);
const error = __console.error.bind(__console);
const table = __console.table.bind(__console);
const assert = __console.assert.bind(__console);
class Console {
    constructor(type) {
        _Console_levelFlags.set(this, {
            log: isInDev,
            warn: isInDev,
            assert: true,
            error: true,
            table: true,
        });
        if (__classPrivateFieldGet(_a$1, _a$1, "f", _Console_consoles)[type]) {
            throw new Error(`"${type}" console already exists`);
        }
        __classPrivateFieldGet(_a$1, _a$1, "f", _Console_consoles)[type] = this;
    }
    setLevelFlags(levelFlags) {
        Object.assign(__classPrivateFieldGet(this, _Console_levelFlags, "f"), levelFlags);
    }
    static setLevelFlagsForType(type, levelFlags) {
        if (!__classPrivateFieldGet(this, _a$1, "f", _Console_consoles)[type]) {
            throw new Error(`no console found with type "${type}"`);
        }
        __classPrivateFieldGet(this, _a$1, "f", _Console_consoles)[type].setLevelFlags(levelFlags);
    }
    static setAllLevelFlags(levelFlags) {
        for (const type in __classPrivateFieldGet(this, _a$1, "f", _Console_consoles)) {
            __classPrivateFieldGet(this, _a$1, "f", _Console_consoles)[type].setLevelFlags(levelFlags);
        }
    }
    static create(type, levelFlags) {
        const console = __classPrivateFieldGet(this, _a$1, "f", _Console_consoles)[type] || new _a$1(type);
        if (levelFlags) {
            console.setLevelFlags(levelFlags);
        }
        return console;
    }
    get log() {
        return __classPrivateFieldGet(this, _Console_levelFlags, "f").log ? log : emptyFunction;
    }
    get warn() {
        return __classPrivateFieldGet(this, _Console_levelFlags, "f").warn ? warn : emptyFunction;
    }
    get error() {
        return __classPrivateFieldGet(this, _Console_levelFlags, "f").error ? error : emptyFunction;
    }
    get assert() {
        return __classPrivateFieldGet(this, _Console_levelFlags, "f").assert ? assert : emptyFunction;
    }
    get table() {
        return __classPrivateFieldGet(this, _Console_levelFlags, "f").table ? table : emptyFunction;
    }
    assertWithError(condition, message) {
        if (!Boolean(condition)) {
            throw new Error(message);
        }
    }
    assertTypeWithError(value, type) {
        this.assertWithError(typeof value == type, `value ${value} of type "${typeof value}" not of type "${type}"`);
    }
    assertEnumWithError(value, enumeration) {
        this.assertWithError(enumeration.includes(value), `invalid enum "${value}"`);
    }
}
_a$1 = Console, _Console_levelFlags = new WeakMap();
_Console_consoles = { value: {} };
function createConsole(type, levelFlags) {
    return Console.create(type, levelFlags);
}
function setConsoleLevelFlagsForType(type, levelFlags) {
    Console.setLevelFlagsForType(type, levelFlags);
}
function setAllConsoleLevelFlags(levelFlags) {
    Console.setAllLevelFlags(levelFlags);
}

const _console$c = createConsole("EventDispatcher", { log: false });
class EventDispatcher {
    constructor(target, validEventTypes) {
        this.target = target;
        this.validEventTypes = validEventTypes;
        this.listeners = {};
        this.addEventListener = this.addEventListener.bind(this);
        this.removeEventListener = this.removeEventListener.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.removeAllEventListeners = this.removeAllEventListeners.bind(this);
        this.dispatchEvent = this.dispatchEvent.bind(this);
        this.waitForEvent = this.waitForEvent.bind(this);
    }
    isValidEventType(type) {
        return this.validEventTypes.includes(type);
    }
    updateEventListeners(type) {
        if (!this.listeners[type])
            return;
        this.listeners[type] = this.listeners[type].filter((listenerObj) => {
            if (listenerObj.shouldRemove) {
                _console$c.log(`removing "${type}" eventListener`, listenerObj);
            }
            return !listenerObj.shouldRemove;
        });
    }
    addEventListener(type, listener, options = { once: false }) {
        if (!this.isValidEventType(type)) {
            throw new Error(`Invalid event type: ${type}`);
        }
        if (!this.listeners[type]) {
            this.listeners[type] = [];
            _console$c.log(`creating "${type}" listeners array`, this.listeners[type]);
        }
        const alreadyAdded = this.listeners[type].find((listenerObject) => {
            return listenerObject.listener == listener && listenerObject.once == options.once;
        });
        if (alreadyAdded) {
            _console$c.log("already added listener");
            return;
        }
        _console$c.log(`adding "${type}" listener`, listener, options);
        this.listeners[type].push({ listener, once: options.once });
        _console$c.log(`currently have ${this.listeners[type].length} "${type}" listeners`);
    }
    removeEventListener(type, listener) {
        if (!this.isValidEventType(type)) {
            throw new Error(`Invalid event type: ${type}`);
        }
        if (!this.listeners[type])
            return;
        _console$c.log(`removing "${type}" listener...`, listener);
        this.listeners[type].forEach((listenerObj) => {
            const isListenerToRemove = listenerObj.listener === listener;
            if (isListenerToRemove) {
                _console$c.log(`flagging "${type}" listener`, listener);
                listenerObj.shouldRemove = true;
            }
        });
        this.updateEventListeners(type);
    }
    removeEventListeners(type) {
        if (!this.isValidEventType(type)) {
            throw new Error(`Invalid event type: ${type}`);
        }
        if (!this.listeners[type])
            return;
        _console$c.log(`removing "${type}" listeners...`);
        this.listeners[type] = [];
    }
    removeAllEventListeners() {
        _console$c.log(`removing listeners...`);
        this.listeners = {};
    }
    dispatchEvent(type, message) {
        if (!this.isValidEventType(type)) {
            throw new Error(`Invalid event type: ${type}`);
        }
        if (!this.listeners[type])
            return;
        this.listeners[type].forEach((listenerObj) => {
            if (listenerObj.shouldRemove) {
                return;
            }
            _console$c.log(`dispatching "${type}" listener`, listenerObj);
            listenerObj.listener({ type, target: this.target, message });
            if (listenerObj.once) {
                _console$c.log(`flagging "${type}" listener`, listenerObj);
                listenerObj.shouldRemove = true;
            }
        });
        this.updateEventListeners(type);
    }
    waitForEvent(type) {
        return new Promise((resolve) => {
            const onceListener = (event) => {
                resolve(event);
            };
            this.addEventListener(type, onceListener, { once: true });
        });
    }
}

var _Timer_callback, _Timer_interval, _Timer_intervalId;
const _console$b = createConsole("Timer", { log: false });
class Timer {
    get callback() {
        return __classPrivateFieldGet(this, _Timer_callback, "f");
    }
    set callback(newCallback) {
        _console$b.assertTypeWithError(newCallback, "function");
        _console$b.log({ newCallback });
        __classPrivateFieldSet(this, _Timer_callback, newCallback, "f");
        if (this.isRunning) {
            this.restart();
        }
    }
    get interval() {
        return __classPrivateFieldGet(this, _Timer_interval, "f");
    }
    set interval(newInterval) {
        _console$b.assertTypeWithError(newInterval, "number");
        _console$b.assertWithError(newInterval > 0, "interval must be above 0");
        _console$b.log({ newInterval });
        __classPrivateFieldSet(this, _Timer_interval, newInterval, "f");
        if (this.isRunning) {
            this.restart();
        }
    }
    constructor(callback, interval) {
        _Timer_callback.set(this, void 0);
        _Timer_interval.set(this, void 0);
        _Timer_intervalId.set(this, void 0);
        this.interval = interval;
        this.callback = callback;
    }
    get isRunning() {
        return __classPrivateFieldGet(this, _Timer_intervalId, "f") != undefined;
    }
    start(immediately = false) {
        if (this.isRunning) {
            _console$b.log("interval already running");
            return;
        }
        _console$b.log("starting interval");
        __classPrivateFieldSet(this, _Timer_intervalId, setInterval(__classPrivateFieldGet(this, _Timer_callback, "f"), __classPrivateFieldGet(this, _Timer_interval, "f")), "f");
        if (immediately) {
            __classPrivateFieldGet(this, _Timer_callback, "f").call(this);
        }
    }
    stop() {
        if (!this.isRunning) {
            _console$b.log("interval already not running");
            return;
        }
        _console$b.log("stopping interval");
        clearInterval(__classPrivateFieldGet(this, _Timer_intervalId, "f"));
        __classPrivateFieldSet(this, _Timer_intervalId, undefined, "f");
    }
    restart(startImmediately = false) {
        this.stop();
        this.start(startImmediately);
    }
}
_Timer_callback = new WeakMap(), _Timer_interval = new WeakMap(), _Timer_intervalId = new WeakMap();

var _TextEncoder;
if (typeof TextEncoder == "undefined") {
    _TextEncoder = class {
        encode(string) {
            const encoding = Array.from(string).map((char) => char.charCodeAt(0));
            return Uint8Array.from(encoding);
        }
    };
}
else {
    _TextEncoder = TextEncoder;
}
var _TextDecoder;
if (typeof TextDecoder == "undefined") {
    _TextDecoder = class {
        decode(data) {
            const byteArray = Array.from(new Uint8Array(data));
            return byteArray
                .map((value) => {
                return String.fromCharCode(value);
            })
                .join("");
        }
    };
}
else {
    _TextDecoder = TextDecoder;
}
const textEncoder = new _TextEncoder();
const textDecoder = new _TextDecoder();

var _DeviceInformationManager_instances, _DeviceInformationManager_dispatchEvent_get, _DeviceInformationManager_information, _DeviceInformationManager_isComplete_get, _DeviceInformationManager_update;
const _console$a = createConsole("DeviceInformationManager", { log: true });
const DeviceInformationMessageTypes = [
    "manufacturerName",
    "modelNumber",
    "softwareRevision",
    "hardwareRevision",
    "firmwareRevision",
    "pnpId",
    "serialNumber",
];
const DeviceInformationEventTypes = [...DeviceInformationMessageTypes, "deviceInformation"];
class DeviceInformationManager {
    constructor() {
        _DeviceInformationManager_instances.add(this);
        _DeviceInformationManager_information.set(this, {});
    }
    get information() {
        return __classPrivateFieldGet(this, _DeviceInformationManager_information, "f");
    }
    clear() {
        __classPrivateFieldSet(this, _DeviceInformationManager_information, {}, "f");
    }
    parseMessage(messageType, dataView) {
        _console$a.log({ messageType });
        switch (messageType) {
            case "manufacturerName":
                const manufacturerName = textDecoder.decode(dataView.buffer);
                _console$a.log({ manufacturerName });
                __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { manufacturerName });
                break;
            case "modelNumber":
                const modelNumber = textDecoder.decode(dataView.buffer);
                _console$a.log({ modelNumber });
                __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { modelNumber });
                break;
            case "softwareRevision":
                const softwareRevision = textDecoder.decode(dataView.buffer);
                _console$a.log({ softwareRevision });
                __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { softwareRevision });
                break;
            case "hardwareRevision":
                const hardwareRevision = textDecoder.decode(dataView.buffer);
                _console$a.log({ hardwareRevision });
                __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { hardwareRevision });
                break;
            case "firmwareRevision":
                const firmwareRevision = textDecoder.decode(dataView.buffer);
                _console$a.log({ firmwareRevision });
                __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { firmwareRevision });
                break;
            case "pnpId":
                const pnpId = {
                    source: dataView.getUint8(0) === 1 ? "Bluetooth" : "USB",
                    productId: dataView.getUint16(3, true),
                    productVersion: dataView.getUint16(5, true),
                    vendorId: 0,
                };
                if (pnpId.source == "Bluetooth") {
                    pnpId.vendorId = dataView.getUint16(1, true);
                }
                _console$a.log({ pnpId });
                __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { pnpId });
                break;
            case "serialNumber":
                const serialNumber = textDecoder.decode(dataView.buffer);
                _console$a.log({ serialNumber });
                break;
            default:
                throw Error(`uncaught messageType ${messageType}`);
        }
    }
}
_DeviceInformationManager_information = new WeakMap(), _DeviceInformationManager_instances = new WeakSet(), _DeviceInformationManager_dispatchEvent_get = function _DeviceInformationManager_dispatchEvent_get() {
    return this.eventDispatcher.dispatchEvent;
}, _DeviceInformationManager_isComplete_get = function _DeviceInformationManager_isComplete_get() {
    return DeviceInformationMessageTypes.every((key) => {
        switch (key) {
            case "modelNumber":
            case "serialNumber":
                return true;
            default:
                return key in __classPrivateFieldGet(this, _DeviceInformationManager_information, "f");
        }
    });
}, _DeviceInformationManager_update = function _DeviceInformationManager_update(partialDeviceInformation) {
    _console$a.log({ partialDeviceInformation });
    const deviceInformationNames = Object.keys(partialDeviceInformation);
    deviceInformationNames.forEach((deviceInformationName) => {
        __classPrivateFieldGet(this, _DeviceInformationManager_instances, "a", _DeviceInformationManager_dispatchEvent_get).call(this, deviceInformationName, {
            [deviceInformationName]: partialDeviceInformation[deviceInformationName],
        });
    });
    Object.assign(__classPrivateFieldGet(this, _DeviceInformationManager_information, "f"), partialDeviceInformation);
    _console$a.log({ deviceInformation: __classPrivateFieldGet(this, _DeviceInformationManager_information, "f") });
    if (__classPrivateFieldGet(this, _DeviceInformationManager_instances, "a", _DeviceInformationManager_isComplete_get)) {
        _console$a.log("completed deviceInformation");
        __classPrivateFieldGet(this, _DeviceInformationManager_instances, "a", _DeviceInformationManager_dispatchEvent_get).call(this, "deviceInformation", { deviceInformation: this.information });
    }
};

var _BaseConnectionManager_instances, _BaseConnectionManager_assertIsSupported, _BaseConnectionManager_status, _BaseConnectionManager_assertIsNotConnected, _BaseConnectionManager_assertIsNotConnecting, _BaseConnectionManager_assertIsConnected, _BaseConnectionManager_assertIsNotDisconnecting, _BaseConnectionManager_timer, _BaseConnectionManager_checkConnection;
const _console$9 = createConsole("BaseConnectionManager", { log: true });
const ConnectionStatuses = ["notConnected", "connecting", "connected", "disconnecting"];
const ConnectionEventTypes = [...ConnectionStatuses, "connectionStatus", "isConnected"];
const BatteryLevelMessageTypes = ["batteryLevel"];
class BaseConnectionManager {
    get baseConstructor() {
        return this.constructor;
    }
    static get isSupported() {
        return false;
    }
    get isSupported() {
        return this.baseConstructor.isSupported;
    }
    get type() {
        return this.baseConstructor.type;
    }
    constructor() {
        _BaseConnectionManager_instances.add(this);
        _BaseConnectionManager_status.set(this, "notConnected");
        _BaseConnectionManager_timer.set(this, new Timer(__classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_checkConnection).bind(this), 5000));
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsSupported).call(this);
    }
    get status() {
        return __classPrivateFieldGet(this, _BaseConnectionManager_status, "f");
    }
    set status(newConnectionStatus) {
        _console$9.assertEnumWithError(newConnectionStatus, ConnectionStatuses);
        if (__classPrivateFieldGet(this, _BaseConnectionManager_status, "f") == newConnectionStatus) {
            _console$9.log(`tried to assign same connection status "${newConnectionStatus}"`);
            return;
        }
        _console$9.log(`new connection status "${newConnectionStatus}"`);
        __classPrivateFieldSet(this, _BaseConnectionManager_status, newConnectionStatus, "f");
        this.onStatusUpdated(this.status);
        if (this.isConnected) {
            __classPrivateFieldGet(this, _BaseConnectionManager_timer, "f").start();
        }
        else {
            __classPrivateFieldGet(this, _BaseConnectionManager_timer, "f").stop();
        }
    }
    get isConnected() {
        return this.status == "connected";
    }
    async connect() {
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsNotConnected).call(this);
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsNotConnecting).call(this);
        this.status = "connecting";
    }
    get canReconnect() {
        return false;
    }
    async reconnect() {
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsNotConnected).call(this);
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsNotConnecting).call(this);
        _console$9.assert(this.canReconnect, "unable to reconnect");
    }
    async disconnect() {
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsConnected).call(this);
        __classPrivateFieldGet(this, _BaseConnectionManager_instances, "m", _BaseConnectionManager_assertIsNotDisconnecting).call(this);
        this.status = "disconnecting";
        _console$9.log("disconnecting from device...");
    }
    async sendUICommandsData(data) {
        _console$9.log("sendUICommandsData", data);
    }
    async sendRxData(data) {
        _console$9.log("sendRxData", data);
    }
}
_BaseConnectionManager_status = new WeakMap(), _BaseConnectionManager_timer = new WeakMap(), _BaseConnectionManager_instances = new WeakSet(), _BaseConnectionManager_assertIsSupported = function _BaseConnectionManager_assertIsSupported() {
    _console$9.assertWithError(this.isSupported, `${this.constructor.name} is not supported`);
}, _BaseConnectionManager_assertIsNotConnected = function _BaseConnectionManager_assertIsNotConnected() {
    _console$9.assertWithError(!this.isConnected, "device is already connected");
}, _BaseConnectionManager_assertIsNotConnecting = function _BaseConnectionManager_assertIsNotConnecting() {
    _console$9.assertWithError(this.status != "connecting", "device is already connecting");
}, _BaseConnectionManager_assertIsConnected = function _BaseConnectionManager_assertIsConnected() {
    _console$9.assertWithError(this.isConnected, "device is not connected");
}, _BaseConnectionManager_assertIsNotDisconnecting = function _BaseConnectionManager_assertIsNotDisconnecting() {
    _console$9.assertWithError(this.status != "disconnecting", "device is already disconnecting");
}, _BaseConnectionManager_checkConnection = function _BaseConnectionManager_checkConnection() {
    if (!this.isConnected) {
        _console$9.log("timer detected disconnection");
        this.status = "notConnected";
    }
};

const _console$8 = createConsole("EventUtils", { log: false });
function addEventListeners(target, boundEventListeners) {
    let addEventListener = target.addEventListener || target.addListener || target.on || target.AddEventListener;
    _console$8.assertWithError(addEventListener, "no add listener function found for target");
    addEventListener = addEventListener.bind(target);
    Object.entries(boundEventListeners).forEach(([eventType, eventListener]) => {
        addEventListener(eventType, eventListener);
    });
}
function removeEventListeners(target, boundEventListeners) {
    let removeEventListener = target.removeEventListener || target.removeListener || target.RemoveEventListener;
    _console$8.assertWithError(removeEventListener, "no remove listener function found for target");
    removeEventListener = removeEventListener.bind(target);
    Object.entries(boundEventListeners).forEach(([eventType, eventListener]) => {
        removeEventListener(eventType, eventListener);
    });
}

const _console$7 = createConsole("bluetoothUUIDs", { log: true });
if (isInBrowser) {
    var BluetoothUUID = window.BluetoothUUID;
}
function generateTapBluetoothUUID(value) {
    _console$7.assertTypeWithError(value, "string");
    _console$7.assertWithError(value.length == 1, "value must be 1 character long");
    return `C3FF000${value}-1D8B-40FD-A56F-C7BD5D0F3370`.toLowerCase();
}
function generateNUSBluetoothUUID(value) {
    _console$7.assertTypeWithError(value, "string");
    _console$7.assertWithError(value.length == 1, "value must be 1 character long");
    return `6E40000${value}-B5A3-F393-E0A9-E50E24DCCA9E`.toLowerCase();
}
function stringToCharacteristicUUID(identifier) {
    return BluetoothUUID?.getCharacteristic?.(identifier);
}
function stringToServiceUUID(identifier) {
    return BluetoothUUID?.getService?.(identifier);
}
const bluetoothUUIDs = Object.freeze({
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
                airGestures: { uuid: generateTapBluetoothUUID("A") },
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
const serviceUUIDs = [bluetoothUUIDs.services.tap.uuid];
const optionalServiceUUIDs = [
    bluetoothUUIDs.services.deviceInformation.uuid,
    bluetoothUUIDs.services.battery.uuid,
    bluetoothUUIDs.services.nus.uuid,
];
[...serviceUUIDs, ...optionalServiceUUIDs];
function getServiceNameFromUUID(serviceUUID) {
    serviceUUID = serviceUUID.toString().toLowerCase();
    const serviceNames = Object.keys(bluetoothUUIDs.services);
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
const characteristicUUIDs = [];
const allCharacteristicUUIDs = [];
Object.values(bluetoothUUIDs.services).forEach((serviceInfo) => {
    if (!serviceInfo.characteristics) {
        return;
    }
    const characteristicNames = Object.keys(serviceInfo.characteristics);
    characteristicNames.forEach((characteristicName) => {
        const characteristicInfo = serviceInfo.characteristics[characteristicName];
        if (serviceUUIDs.includes(serviceInfo.uuid)) {
            characteristicUUIDs.push(characteristicInfo.uuid);
            characteristicNames.push(characteristicName);
        }
        allCharacteristicUUIDs.push(characteristicInfo.uuid);
    });
}, []);
_console$7.log({ serviceUUIDs, optionalServiceUUIDs, characteristicUUIDs, allCharacteristicUUIDs });
function getCharacteristicNameFromUUID(characteristicUUID) {
    characteristicUUID = characteristicUUID.toString().toLowerCase();
    var characteristicName;
    Object.values(bluetoothUUIDs.services).some((serviceInfo) => {
        const characteristicNames = Object.keys(serviceInfo.characteristics);
        characteristicName = characteristicNames.find((_characteristicName) => {
            const characteristicInfo = serviceInfo.characteristics[_characteristicName];
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
function getCharacteristicProperties(characteristicName) {
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
    switch (characteristicName) {
        case "settings":
        case "tapData":
        case "mouseData":
        case "unknown7":
        case "unknown8":
            properties.read = false;
            break;
    }
    switch (characteristicName) {
        case "batteryLevel":
        case "tapData":
        case "mouseData":
        case "airGestures":
        case "unknown8":
        case "unknownB":
        case "unknownC":
        case "unknownD":
        case "tx":
            properties.notify = true;
            break;
    }
    switch (characteristicName) {
        case "airGestures":
        case "uiCommands":
        case "unknown7":
        case "unknownB":
            properties.writeWithoutResponse = true;
            break;
    }
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

const _console$6 = createConsole("BluetoothConnectionManager", { log: true });
class BluetoothConnectionManager extends BaseConnectionManager {
    constructor() {
        super(...arguments);
        this.isInRange = true;
    }
    onCharacteristicValueChanged(characteristicName, dataView) {
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
        }
    }
    async writeCharacteristic(characteristicName, data) {
        _console$6.log("writeCharacteristic", ...arguments);
    }
    async sendUICommandsData(data) {
        super.sendUICommandsData(data);
        await this.writeCharacteristic("uiCommands", data);
    }
    async sendRxData(data) {
        super.sendRxData(data);
        await this.writeCharacteristic("rx", data);
    }
}

var _WebBluetoothConnectionManager_instances, _WebBluetoothConnectionManager_boundBluetoothCharacteristicEventListeners, _WebBluetoothConnectionManager_boundBluetoothDeviceEventListeners, _WebBluetoothConnectionManager_device, _WebBluetoothConnectionManager_services, _WebBluetoothConnectionManager_characteristics, _WebBluetoothConnectionManager_getServicesAndCharacteristics, _WebBluetoothConnectionManager_removeEventListeners, _WebBluetoothConnectionManager_onCharacteristicvaluechanged, _WebBluetoothConnectionManager_onCharacteristicValueChanged, _WebBluetoothConnectionManager_onGattserverdisconnected;
const _console$5 = createConsole("WebBluetoothConnectionManager", { log: true });
var bluetooth;
if (isInBrowser) {
    bluetooth = window.navigator.bluetooth;
}
class WebBluetoothConnectionManager extends BluetoothConnectionManager {
    constructor() {
        super(...arguments);
        _WebBluetoothConnectionManager_instances.add(this);
        _WebBluetoothConnectionManager_boundBluetoothCharacteristicEventListeners.set(this, {
            characteristicvaluechanged: __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_onCharacteristicvaluechanged).bind(this),
        });
        _WebBluetoothConnectionManager_boundBluetoothDeviceEventListeners.set(this, {
            gattserverdisconnected: __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_onGattserverdisconnected).bind(this),
        });
        _WebBluetoothConnectionManager_device.set(this, void 0);
        _WebBluetoothConnectionManager_services.set(this, new Map());
        _WebBluetoothConnectionManager_characteristics.set(this, new Map());
    }
    get bluetoothId() {
        return this.device?.id || "";
    }
    get name() {
        return this.device?.name || "";
    }
    static get isSupported() {
        return Boolean(bluetooth);
    }
    static get type() {
        return "webBluetooth";
    }
    get device() {
        return __classPrivateFieldGet(this, _WebBluetoothConnectionManager_device, "f");
    }
    set device(newDevice) {
        if (__classPrivateFieldGet(this, _WebBluetoothConnectionManager_device, "f") == newDevice) {
            _console$5.log("tried to assign the same BluetoothDevice");
            return;
        }
        if (__classPrivateFieldGet(this, _WebBluetoothConnectionManager_device, "f")) {
            removeEventListeners(__classPrivateFieldGet(this, _WebBluetoothConnectionManager_device, "f"), __classPrivateFieldGet(this, _WebBluetoothConnectionManager_boundBluetoothDeviceEventListeners, "f"));
        }
        if (newDevice) {
            addEventListeners(newDevice, __classPrivateFieldGet(this, _WebBluetoothConnectionManager_boundBluetoothDeviceEventListeners, "f"));
        }
        __classPrivateFieldSet(this, _WebBluetoothConnectionManager_device, newDevice, "f");
    }
    get server() {
        return __classPrivateFieldGet(this, _WebBluetoothConnectionManager_device, "f")?.gatt;
    }
    get isConnected() {
        return this.server?.connected || false;
    }
    async connect() {
        await super.connect();
        try {
            const device = await bluetooth.requestDevice({
                filters: [{ services: serviceUUIDs }],
                optionalServices: isInBrowser ? optionalServiceUUIDs : [],
            });
            _console$5.log("got BluetoothDevice");
            this.device = device;
            _console$5.log("connecting to device...");
            const server = await this.server.connect();
            _console$5.log(`connected to device? ${server.connected}`);
            await __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_getServicesAndCharacteristics).call(this);
            _console$5.log("fully connected");
            this.status = "connected";
        }
        catch (error) {
            _console$5.error(error);
            this.status = "notConnected";
            this.server?.disconnect();
            __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_removeEventListeners).call(this);
        }
    }
    async disconnect() {
        await __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_removeEventListeners).call(this);
        await super.disconnect();
        this.server?.disconnect();
        this.status = "notConnected";
    }
    async writeCharacteristic(characteristicName, data) {
        super.writeCharacteristic(characteristicName, data);
        const characteristic = __classPrivateFieldGet(this, _WebBluetoothConnectionManager_characteristics, "f").get(characteristicName);
        _console$5.assertWithError(characteristic, `${characteristicName} characteristic not found`);
        _console$5.log("writing characteristic", characteristic, data);
        const characteristicProperties = characteristic.properties || getCharacteristicProperties(characteristicName);
        if (characteristicProperties.writeWithoutResponse) {
            _console$5.log("writing without response");
            await characteristic.writeValueWithoutResponse(data);
        }
        else {
            _console$5.log("writing with response");
            await characteristic.writeValueWithResponse(data);
        }
        _console$5.log("wrote characteristic");
        if (characteristicProperties.read && !characteristicProperties.notify) {
            _console$5.log("reading value after write...");
            await characteristic.readValue();
            if (isInBluefy || isInWebBLE) {
                __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_onCharacteristicValueChanged).call(this, characteristic);
            }
        }
    }
    get canReconnect() {
        return Boolean(this.server && !this.server.connected && this.isInRange);
    }
    async reconnect() {
        await super.reconnect();
        _console$5.log("attempting to reconnect...");
        this.status = "connecting";
        try {
            await this.server.connect();
        }
        catch (error) {
            _console$5.error(error);
            this.isInRange = false;
        }
        if (this.isConnected) {
            _console$5.log("successfully reconnected!");
            await __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_getServicesAndCharacteristics).call(this);
            this.status = "connected";
        }
        else {
            _console$5.log("unable to reconnect");
            this.status = "notConnected";
        }
    }
}
_WebBluetoothConnectionManager_boundBluetoothCharacteristicEventListeners = new WeakMap(), _WebBluetoothConnectionManager_boundBluetoothDeviceEventListeners = new WeakMap(), _WebBluetoothConnectionManager_device = new WeakMap(), _WebBluetoothConnectionManager_services = new WeakMap(), _WebBluetoothConnectionManager_characteristics = new WeakMap(), _WebBluetoothConnectionManager_instances = new WeakSet(), _WebBluetoothConnectionManager_getServicesAndCharacteristics = async function _WebBluetoothConnectionManager_getServicesAndCharacteristics() {
    __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_removeEventListeners).call(this);
    _console$5.log("getting services...");
    const services = await this.server.getPrimaryServices();
    _console$5.log("got services", services);
    const service = await this.server.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
    _console$5.log("got nus service", service);
    _console$5.log("getting characteristics...");
    for (const serviceIndex in services) {
        const service = services[serviceIndex];
        _console$5.log({ service });
        const serviceName = getServiceNameFromUUID(service.uuid);
        _console$5.assertWithError(serviceName, `no name found for service uuid "${service.uuid}"`);
        _console$5.log(`got "${serviceName}" service`);
        service.name = serviceName;
        __classPrivateFieldGet(this, _WebBluetoothConnectionManager_services, "f").set(serviceName, service);
        _console$5.log(`getting characteristics for "${serviceName}" service`);
        const characteristics = await service.getCharacteristics();
        _console$5.log(`got characteristics for "${serviceName}" service`);
        for (const characteristicIndex in characteristics) {
            const characteristic = characteristics[characteristicIndex];
            _console$5.log({ characteristic });
            const characteristicName = getCharacteristicNameFromUUID(characteristic.uuid);
            _console$5.assertWithError(Boolean(characteristicName), `no name found for characteristic uuid "${characteristic.uuid}" in "${serviceName}" service`);
            _console$5.log(`got "${characteristicName}" characteristic in "${serviceName}" service`);
            characteristic.name = characteristicName;
            __classPrivateFieldGet(this, _WebBluetoothConnectionManager_characteristics, "f").set(characteristicName, characteristic);
            addEventListeners(characteristic, __classPrivateFieldGet(this, _WebBluetoothConnectionManager_boundBluetoothCharacteristicEventListeners, "f"));
            const characteristicProperties = characteristic.properties || getCharacteristicProperties(characteristicName);
            if (characteristicProperties.notify) {
                _console$5.log(`starting notifications for "${characteristicName}" characteristic`);
                await characteristic.startNotifications();
            }
            if (characteristicProperties.read) {
                _console$5.log(`reading "${characteristicName}" characteristic...`);
                await characteristic.readValue();
                if (isInBluefy || isInWebBLE) {
                    __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_onCharacteristicValueChanged).call(this, characteristic);
                }
            }
        }
    }
}, _WebBluetoothConnectionManager_removeEventListeners = async function _WebBluetoothConnectionManager_removeEventListeners() {
    if (this.device) {
        removeEventListeners(this.device, __classPrivateFieldGet(this, _WebBluetoothConnectionManager_boundBluetoothDeviceEventListeners, "f"));
    }
    const promises = Array.from(__classPrivateFieldGet(this, _WebBluetoothConnectionManager_characteristics, "f").keys()).map((characteristicName) => {
        const characteristic = __classPrivateFieldGet(this, _WebBluetoothConnectionManager_characteristics, "f").get(characteristicName);
        removeEventListeners(characteristic, __classPrivateFieldGet(this, _WebBluetoothConnectionManager_boundBluetoothCharacteristicEventListeners, "f"));
        const characteristicProperties = characteristic.properties || getCharacteristicProperties(characteristicName);
        if (characteristicProperties.notify) {
            _console$5.log(`stopping notifications for "${characteristicName}" characteristic`);
            return characteristic.stopNotifications();
        }
    });
    return Promise.allSettled(promises);
}, _WebBluetoothConnectionManager_onCharacteristicvaluechanged = function _WebBluetoothConnectionManager_onCharacteristicvaluechanged(event) {
    _console$5.log("oncharacteristicvaluechanged");
    const characteristic = event.target;
    __classPrivateFieldGet(this, _WebBluetoothConnectionManager_instances, "m", _WebBluetoothConnectionManager_onCharacteristicValueChanged).call(this, characteristic);
}, _WebBluetoothConnectionManager_onCharacteristicValueChanged = function _WebBluetoothConnectionManager_onCharacteristicValueChanged(characteristic) {
    _console$5.log("onCharacteristicValue");
    const characteristicName = characteristic.name;
    _console$5.assertWithError(Boolean(characteristicName), `no name found for characteristic with uuid "${characteristic.uuid}"`);
    _console$5.log(`oncharacteristicvaluechanged for "${characteristicName}" characteristic`);
    const dataView = characteristic.value;
    _console$5.assertWithError(dataView, `no data found for "${characteristicName}" characteristic`);
    _console$5.log(`data for "${characteristicName}" characteristic`, Array.from(new Uint8Array(dataView.buffer)));
    try {
        this.onCharacteristicValueChanged(characteristicName, dataView);
    }
    catch (error) {
        _console$5.error(error);
    }
}, _WebBluetoothConnectionManager_onGattserverdisconnected = function _WebBluetoothConnectionManager_onGattserverdisconnected() {
    _console$5.log("gattserverdisconnected");
    this.status = "notConnected";
};

const getAllProperties = object => {
	const properties = new Set();
	do {
		for (const key of Reflect.ownKeys(object)) {
			properties.add([object, key]);
		}
	} while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
	return properties;
};
function autoBind(self, {include, exclude} = {}) {
	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
		if (include) {
			return include.some(match);
		}
		if (exclude) {
			return !exclude.some(match);
		}
		return true;
	};
	for (const [object, key] of getAllProperties(self.constructor.prototype)) {
		if (key === 'constructor' || !filter(key)) {
			continue;
		}
		const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
		if (descriptor && typeof descriptor.value === 'function') {
			self[key] = self[key].bind(self);
		}
	}
	return self;
}

createConsole("MathUtils", { log: true });
function getInterpolation(value, min, max, span) {
    if (span == undefined) {
        span = max - min;
    }
    return (value - min) / span;
}
function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}

var _VibrationManager_instances, _VibrationManager_createData;
const _console$4 = createConsole("VibrationManager");
const MaxNumberOfVibrations = 9;
const MaxNumberOfVibrationSegments = MaxNumberOfVibrations * 2;
class VibrationManager {
    constructor() {
        _VibrationManager_instances.add(this);
        autoBind(this);
    }
    async vibrate(segments) {
        _console$4.log("triggering vibration segments", segments);
        const dataView = __classPrivateFieldGet(this, _VibrationManager_instances, "m", _VibrationManager_createData).call(this, segments);
        await this.sendUICommandsData(dataView?.buffer);
    }
}
_VibrationManager_instances = new WeakSet(), _VibrationManager_createData = function _VibrationManager_createData(segments) {
    const dataView = new DataView(new ArrayBuffer(2 + MaxNumberOfVibrationSegments));
    let index = 0;
    dataView.setUint8(index++, 0);
    dataView.setUint8(index++, 2);
    for (let segmentIndex = 0; segmentIndex < segments.length && segmentIndex < MaxNumberOfVibrationSegments; segmentIndex++) {
        let value = segments[segmentIndex];
        value /= 10;
        value = clamp(value, 0, 2 ** 8 - 1);
        _console$4.log(`vibration segment #${segmentIndex}: ${value}`);
        dataView.setUint8(index + segmentIndex, value);
    }
    return dataView;
};

var _DeviceManager_instances, _DeviceManager_boundDeviceEventListeners, _DeviceManager_ConnectedDevices, _DeviceManager_UseLocalStorage, _DeviceManager_DefaultLocalStorageConfiguration, _DeviceManager_LocalStorageConfiguration, _DeviceManager_AssertLocalStorage, _DeviceManager_LocalStorageKey, _DeviceManager_SaveToLocalStorage, _DeviceManager_LoadFromLocalStorage, _DeviceManager_AvailableDevices, _DeviceManager_EventDispatcher, _DeviceManager_DispatchEvent_get, _DeviceManager_OnDeviceIsConnected, _DeviceManager_DispatchAvailableDevices, _DeviceManager_DispatchConnectedDevices;
const _console$3 = createConsole("DeviceManager", { log: true });
const DeviceManagerEventTypes = [
    "deviceConnected",
    "deviceDisconnected",
    "deviceIsConnected",
    "availableDevices",
    "connectedDevices",
];
class DeviceManager {
    constructor() {
        _DeviceManager_instances.add(this);
        _DeviceManager_boundDeviceEventListeners.set(this, {
            isConnected: __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_OnDeviceIsConnected).bind(this),
        });
        _DeviceManager_ConnectedDevices.set(this, []);
        _DeviceManager_UseLocalStorage.set(this, false);
        _DeviceManager_DefaultLocalStorageConfiguration.set(this, {
            devices: [],
        });
        _DeviceManager_LocalStorageConfiguration.set(this, void 0);
        _DeviceManager_LocalStorageKey.set(this, "TS.Device");
        _DeviceManager_AvailableDevices.set(this, []);
        _DeviceManager_EventDispatcher.set(this, new EventDispatcher(this, DeviceManagerEventTypes));
        if (DeviceManager.shared && this != DeviceManager.shared) {
            throw Error("DeviceManager is a singleton - use DeviceManager.shared");
        }
        if (this.CanUseLocalStorage) {
            this.UseLocalStorage = true;
        }
    }
    onDevice(device) {
        addEventListeners(device, __classPrivateFieldGet(this, _DeviceManager_boundDeviceEventListeners, "f"));
    }
    OnDeviceConnectionStatusUpdated(device, connectionStatus) {
        if (connectionStatus == "notConnected" && !device.canReconnect && __classPrivateFieldGet(this, _DeviceManager_AvailableDevices, "f").includes(device)) {
            const deviceIndex = __classPrivateFieldGet(this, _DeviceManager_AvailableDevices, "f").indexOf(device);
            this.AvailableDevices.splice(deviceIndex, 1);
            __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_DispatchAvailableDevices).call(this);
        }
    }
    get ConnectedDevices() {
        return __classPrivateFieldGet(this, _DeviceManager_ConnectedDevices, "f");
    }
    get UseLocalStorage() {
        return __classPrivateFieldGet(this, _DeviceManager_UseLocalStorage, "f");
    }
    set UseLocalStorage(newUseLocalStorage) {
        __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_AssertLocalStorage).call(this);
        _console$3.assertTypeWithError(newUseLocalStorage, "boolean");
        __classPrivateFieldSet(this, _DeviceManager_UseLocalStorage, newUseLocalStorage, "f");
        if (__classPrivateFieldGet(this, _DeviceManager_UseLocalStorage, "f") && !__classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f")) {
            __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_LoadFromLocalStorage).call(this);
        }
    }
    get CanUseLocalStorage() {
        return isInBrowser && window.localStorage;
    }
    get AvailableDevices() {
        return __classPrivateFieldGet(this, _DeviceManager_AvailableDevices, "f");
    }
    get CanGetDevices() {
        return isInBrowser && navigator.bluetooth?.getDevices;
    }
    async GetDevices() {
        if (!isInBrowser) {
            _console$3.warn("GetDevices is only available in the browser");
            return;
        }
        if (!navigator.bluetooth) {
            _console$3.warn("bluetooth is not available in this browser");
            return;
        }
        if (isInBluefy) {
            _console$3.warn("bluefy lists too many devices...");
            return;
        }
        if (!navigator.bluetooth.getDevices) {
            _console$3.warn("bluetooth.getDevices() is not available in this browser");
            return;
        }
        if (!this.CanGetDevices) {
            _console$3.log("CanGetDevices is false");
            return;
        }
        if (!__classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f")) {
            __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_LoadFromLocalStorage).call(this);
        }
        const configuration = __classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f");
        if (!configuration.devices || configuration.devices.length == 0) {
            _console$3.log("no devices found in configuration");
            return;
        }
        const bluetoothDevices = await navigator.bluetooth.getDevices();
        _console$3.log({ bluetoothDevices });
        bluetoothDevices.forEach((bluetoothDevice) => {
            if (!bluetoothDevice.gatt) {
                return;
            }
            let deviceInformation = configuration.devices.find((deviceInformation) => bluetoothDevice.id == deviceInformation.bluetoothId);
            if (!deviceInformation) {
                return;
            }
            let existingConnectedDevice = this.ConnectedDevices.filter((device) => device.connectionType == "webBluetooth").find((device) => device.bluetoothId == bluetoothDevice.id);
            const existingAvailableDevice = this.AvailableDevices.filter((device) => device.connectionType == "webBluetooth").find((device) => device.bluetoothId == bluetoothDevice.id);
            if (existingAvailableDevice) {
                if (existingConnectedDevice &&
                    existingConnectedDevice?.bluetoothId == existingAvailableDevice.bluetoothId &&
                    existingConnectedDevice != existingAvailableDevice) {
                    this.AvailableDevices[__classPrivateFieldGet(this, _DeviceManager_AvailableDevices, "f").indexOf(existingAvailableDevice)] = existingConnectedDevice;
                }
                return;
            }
            if (existingConnectedDevice) {
                this.AvailableDevices.push(existingConnectedDevice);
                return;
            }
            const device = new Device();
            const connectionManager = new WebBluetoothConnectionManager();
            connectionManager.device = bluetoothDevice;
            if (bluetoothDevice.name) ;
            device.connectionManager = connectionManager;
            this.AvailableDevices.push(device);
        });
        __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_DispatchAvailableDevices).call(this);
        return this.AvailableDevices;
    }
    get AddEventListener() {
        return __classPrivateFieldGet(this, _DeviceManager_EventDispatcher, "f").addEventListener;
    }
    get RemoveEventListener() {
        return __classPrivateFieldGet(this, _DeviceManager_EventDispatcher, "f").removeEventListener;
    }
    get RemoveEventListeners() {
        return __classPrivateFieldGet(this, _DeviceManager_EventDispatcher, "f").removeEventListeners;
    }
    get RemoveAllEventListeners() {
        return __classPrivateFieldGet(this, _DeviceManager_EventDispatcher, "f").removeAllEventListeners;
    }
}
_DeviceManager_boundDeviceEventListeners = new WeakMap(), _DeviceManager_ConnectedDevices = new WeakMap(), _DeviceManager_UseLocalStorage = new WeakMap(), _DeviceManager_DefaultLocalStorageConfiguration = new WeakMap(), _DeviceManager_LocalStorageConfiguration = new WeakMap(), _DeviceManager_LocalStorageKey = new WeakMap(), _DeviceManager_AvailableDevices = new WeakMap(), _DeviceManager_EventDispatcher = new WeakMap(), _DeviceManager_instances = new WeakSet(), _DeviceManager_AssertLocalStorage = function _DeviceManager_AssertLocalStorage() {
    _console$3.assertWithError(isInBrowser, "localStorage is only available in the browser");
    _console$3.assertWithError(window.localStorage, "localStorage not found");
}, _DeviceManager_SaveToLocalStorage = function _DeviceManager_SaveToLocalStorage() {
    __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_AssertLocalStorage).call(this);
    localStorage.setItem(__classPrivateFieldGet(this, _DeviceManager_LocalStorageKey, "f"), JSON.stringify(__classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f")));
}, _DeviceManager_LoadFromLocalStorage = async function _DeviceManager_LoadFromLocalStorage() {
    __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_AssertLocalStorage).call(this);
    let localStorageString = localStorage.getItem(__classPrivateFieldGet(this, _DeviceManager_LocalStorageKey, "f"));
    if (typeof localStorageString != "string") {
        _console$3.log("no info found in localStorage");
        __classPrivateFieldSet(this, _DeviceManager_LocalStorageConfiguration, Object.assign({}, __classPrivateFieldGet(this, _DeviceManager_DefaultLocalStorageConfiguration, "f")), "f");
        __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_SaveToLocalStorage).call(this);
        return;
    }
    try {
        const configuration = JSON.parse(localStorageString);
        _console$3.log({ configuration });
        __classPrivateFieldSet(this, _DeviceManager_LocalStorageConfiguration, configuration, "f");
        if (this.CanGetDevices) {
            await this.GetDevices();
        }
    }
    catch (error) {
        _console$3.error(error);
    }
}, _DeviceManager_DispatchEvent_get = function _DeviceManager_DispatchEvent_get() {
    return __classPrivateFieldGet(this, _DeviceManager_EventDispatcher, "f").dispatchEvent;
}, _DeviceManager_OnDeviceIsConnected = function _DeviceManager_OnDeviceIsConnected(event) {
    const { target: device } = event;
    if (device.isConnected) {
        if (!__classPrivateFieldGet(this, _DeviceManager_ConnectedDevices, "f").includes(device)) {
            _console$3.log("adding device", device);
            __classPrivateFieldGet(this, _DeviceManager_ConnectedDevices, "f").push(device);
            if (this.UseLocalStorage && device.connectionType == "webBluetooth") {
                const deviceInformation = {
                    bluetoothId: device.bluetoothId,
                };
                const deviceInformationIndex = __classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f").devices.findIndex((_deviceInformation) => _deviceInformation.bluetoothId == deviceInformation.bluetoothId);
                if (deviceInformationIndex == -1) {
                    __classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f").devices.push(deviceInformation);
                }
                else {
                    __classPrivateFieldGet(this, _DeviceManager_LocalStorageConfiguration, "f").devices[deviceInformationIndex] = deviceInformation;
                }
                __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_SaveToLocalStorage).call(this);
            }
            __classPrivateFieldGet(this, _DeviceManager_instances, "a", _DeviceManager_DispatchEvent_get).call(this, "deviceConnected", { device });
            __classPrivateFieldGet(this, _DeviceManager_instances, "a", _DeviceManager_DispatchEvent_get).call(this, "deviceIsConnected", { device });
            __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_DispatchConnectedDevices).call(this);
        }
        else {
            _console$3.log("device already included");
        }
    }
    else {
        if (__classPrivateFieldGet(this, _DeviceManager_ConnectedDevices, "f").includes(device)) {
            _console$3.log("removing device", device);
            __classPrivateFieldGet(this, _DeviceManager_ConnectedDevices, "f").splice(__classPrivateFieldGet(this, _DeviceManager_ConnectedDevices, "f").indexOf(device), 1);
            __classPrivateFieldGet(this, _DeviceManager_instances, "a", _DeviceManager_DispatchEvent_get).call(this, "deviceDisconnected", { device });
            __classPrivateFieldGet(this, _DeviceManager_instances, "a", _DeviceManager_DispatchEvent_get).call(this, "deviceIsConnected", { device });
            __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_DispatchConnectedDevices).call(this);
        }
        else {
            _console$3.log("device already not included");
        }
    }
    if (this.CanGetDevices) {
        this.GetDevices();
    }
    if (device.isConnected && !this.AvailableDevices.includes(device)) {
        const existingAvailableDevice = this.AvailableDevices.find((_device) => _device.bluetoothId == device.bluetoothId);
        _console$3.log({ existingAvailableDevice });
        if (existingAvailableDevice) {
            this.AvailableDevices[this.AvailableDevices.indexOf(existingAvailableDevice)] = device;
        }
        else {
            this.AvailableDevices.push(device);
        }
        __classPrivateFieldGet(this, _DeviceManager_instances, "m", _DeviceManager_DispatchAvailableDevices).call(this);
    }
}, _DeviceManager_DispatchAvailableDevices = function _DeviceManager_DispatchAvailableDevices() {
    _console$3.log({ AvailableDevices: this.AvailableDevices });
    __classPrivateFieldGet(this, _DeviceManager_instances, "a", _DeviceManager_DispatchEvent_get).call(this, "availableDevices", { availableDevices: this.AvailableDevices });
}, _DeviceManager_DispatchConnectedDevices = function _DeviceManager_DispatchConnectedDevices() {
    _console$3.log({ ConnectedDevices: this.ConnectedDevices });
    __classPrivateFieldGet(this, _DeviceManager_instances, "a", _DeviceManager_DispatchEvent_get).call(this, "connectedDevices", { connectedDevices: this.ConnectedDevices });
};
DeviceManager.shared = new DeviceManager();
var DeviceManager$1 = DeviceManager.shared;

createConsole("ArrayBufferUtils", { log: false });
function concatenateArrayBuffers(...arrayBuffers) {
    arrayBuffers = arrayBuffers.filter((arrayBuffer) => arrayBuffer != undefined || arrayBuffer != null);
    arrayBuffers = arrayBuffers.map((arrayBuffer) => {
        if (typeof arrayBuffer == "number") {
            const number = arrayBuffer;
            return Uint8Array.from([Math.floor(number)]);
        }
        else if (typeof arrayBuffer == "boolean") {
            const boolean = arrayBuffer;
            return Uint8Array.from([boolean ? 1 : 0]);
        }
        else if (typeof arrayBuffer == "string") {
            const string = arrayBuffer;
            return stringToArrayBuffer(string);
        }
        else if (arrayBuffer instanceof Array) {
            const array = arrayBuffer;
            return concatenateArrayBuffers(...array);
        }
        else if (arrayBuffer instanceof ArrayBuffer) {
            return arrayBuffer;
        }
        else if ("buffer" in arrayBuffer && arrayBuffer.buffer instanceof ArrayBuffer) {
            const bufferContainer = arrayBuffer;
            return bufferContainer.buffer;
        }
        else if (arrayBuffer instanceof DataView) {
            const dataView = arrayBuffer;
            return dataView.buffer;
        }
        else if (typeof arrayBuffer == "object") {
            const object = arrayBuffer;
            return objectToArrayBuffer(object);
        }
        else {
            return arrayBuffer;
        }
    });
    arrayBuffers = arrayBuffers.filter((arrayBuffer) => arrayBuffer && "byteLength" in arrayBuffer);
    const length = arrayBuffers.reduce((length, arrayBuffer) => length + arrayBuffer.byteLength, 0);
    const uint8Array = new Uint8Array(length);
    let byteOffset = 0;
    arrayBuffers.forEach((arrayBuffer) => {
        uint8Array.set(new Uint8Array(arrayBuffer), byteOffset);
        byteOffset += arrayBuffer.byteLength;
    });
    return uint8Array.buffer;
}
function stringToArrayBuffer(string) {
    const encoding = textEncoder.encode(string);
    return concatenateArrayBuffers(encoding.byteLength, encoding);
}
function objectToArrayBuffer(object) {
    return stringToArrayBuffer(JSON.stringify(object));
}

const _console$2 = createConsole("RawSensorUtils");
const RawSensorTypes = ["deviceAccelerometer", "imuGyroscope", "imuAccelerometer"];
const RawSensorSensitivityFactors = {
    deviceAccelerometer: [31.25, 3.90625, 7.8125, 15.625, 31.25],
    imuGyroscope: [17.5, 4.375, 8.75, 17.5, 35, 70],
    imuAccelerometer: [0.122, 0.061, 0.122, 0.244, 0.488],
};
const DefaultRawSensorSensitivity = {
    deviceAccelerometer: 0,
    imuGyroscope: 0,
    imuAccelerometer: 0,
};
function assertValidRawSensorSensitivityForType(rawSensorType, index) {
    const value = RawSensorSensitivityFactors[rawSensorType][index];
    _console$2.assertWithError(value != undefined, `invalid RawSensorSensitivity index ${index} for sensor "${rawSensorType}" (got value ${value})`);
}
function assertValidRawSensorSensitivity(sensitivity) {
    RawSensorTypes.forEach((rawSensorType) => {
        const index = sensitivity[rawSensorType];
        assertValidRawSensorSensitivityForType(rawSensorType, index);
    });
}

var _InputManager_instances, _InputManager_sensitivity, _InputManager_mode, _InputManager_assertValidMode, _InputManager_createData, _InputManager_timer, _InputManager_sendModeData;
const _console$1 = createConsole("InputManager");
const InputModes = [
    "controller",
    "text",
    "rawSensor",
    "controllerWithMouse",
    "controllerWithMouseAndKeyboard",
];
const InputModeBytes = {
    controller: 0x1,
    text: 0x0,
    rawSensor: 0xa,
    controllerWithMouse: 0x3,
    controllerWithMouseAndKeyboard: 0x5,
};
class InputManager {
    constructor() {
        _InputManager_instances.add(this);
        _InputManager_sensitivity.set(this, Object.assign({}, DefaultRawSensorSensitivity));
        _InputManager_mode.set(this, "controller");
        _InputManager_timer.set(this, new Timer(__classPrivateFieldGet(this, _InputManager_instances, "m", _InputManager_sendModeData).bind(this), 10 * 1000));
        autoBind(this);
    }
    get sensitivity() {
        return __classPrivateFieldGet(this, _InputManager_sensitivity, "f");
    }
    set sensitivity(newSensitivity) {
        __classPrivateFieldSet(this, _InputManager_sensitivity, newSensitivity, "f");
    }
    setSensitivityForType(rawSensorType, index) {
        assertValidRawSensorSensitivityForType(rawSensorType, index);
        _console$1.log(`setting ${rawSensorType} sensitivity index to ${index}`);
        __classPrivateFieldGet(this, _InputManager_sensitivity, "f")[rawSensorType] = index;
    }
    get mode() {
        return __classPrivateFieldGet(this, _InputManager_mode, "f");
    }
    set mode(newMode) {
        __classPrivateFieldGet(this, _InputManager_instances, "m", _InputManager_assertValidMode).call(this, newMode);
        if (this.mode == newMode) {
            _console$1.log(`redundant mode assignment "${newMode}"`);
            return;
        }
        __classPrivateFieldSet(this, _InputManager_mode, newMode, "f");
        if (__classPrivateFieldGet(this, _InputManager_timer, "f").isRunning) {
            __classPrivateFieldGet(this, _InputManager_timer, "f").restart(true);
        }
    }
    setMode(newMode) {
        this.mode = newMode;
    }
    start() {
        __classPrivateFieldGet(this, _InputManager_timer, "f").start(true);
    }
    stop() {
        __classPrivateFieldGet(this, _InputManager_timer, "f").stop();
    }
}
_InputManager_sensitivity = new WeakMap(), _InputManager_mode = new WeakMap(), _InputManager_timer = new WeakMap(), _InputManager_instances = new WeakSet(), _InputManager_assertValidMode = function _InputManager_assertValidMode(mode) {
    _console$1.assertEnumWithError(mode, InputModes);
}, _InputManager_createData = function _InputManager_createData() {
    const modeByte = InputModeBytes[this.mode];
    let sensitivityFactorIndices = [];
    if (this.mode == "rawSensor") {
        _console$1.assertWithError(this.sensitivity, "no sensitivity defined for rawSensor input mode");
        assertValidRawSensorSensitivity(this.sensitivity);
        RawSensorTypes.forEach((rawSensorType) => {
            sensitivityFactorIndices.push(this.sensitivity[rawSensorType]);
        });
    }
    const data = concatenateArrayBuffers(0x3, 0xc, 0x0, modeByte, sensitivityFactorIndices);
    return data;
}, _InputManager_sendModeData = function _InputManager_sendModeData() {
    _console$1.log("sending mode data...");
    const data = __classPrivateFieldGet(this, _InputManager_instances, "m", _InputManager_createData).call(this);
    this.sendRxData(data);
};

createConsole("RawSensorManager");
class RawSensorManager {
    constructor() {
        autoBind(this);
    }
}

var _Device_instances, _a, _Device_DefaultConnectionManager, _Device_eventDispatcher, _Device_dispatchEvent_get, _Device_connectionManager, _Device_sendUICommandsData, _Device_sendRxData, _Device_isConnected, _Device_assertIsConnected, _Device_assertCanReconnect, _Device_ReconnectOnDisconnection, _Device_reconnectOnDisconnection, _Device_reconnectIntervalId, _Device_onConnectionStatusUpdated, _Device_dispatchConnectionEvents, _Device_checkConnection, _Device_clear, _Device_onConnectionMessageReceived, _Device_onConnectionMessagesReceived, _Device_deviceInformationManager, _Device_batteryLevel, _Device_updateBatteryLevel, _Device_inputManager, _Device_rawSensorManager, _Device_vibrationManager, _Device_isServerSide;
const _console = createConsole("Device", { log: true });
const DeviceEventTypes = [
    "connectionMessage",
    ...ConnectionEventTypes,
    ...BatteryLevelMessageTypes,
    ...DeviceInformationEventTypes,
];
class Device {
    get bluetoothId() {
        return __classPrivateFieldGet(this, _Device_connectionManager, "f")?.bluetoothId;
    }
    get name() {
        return __classPrivateFieldGet(this, _Device_connectionManager, "f")?.name;
    }
    constructor() {
        _Device_instances.add(this);
        _Device_eventDispatcher.set(this, new EventDispatcher(this, DeviceEventTypes));
        _Device_connectionManager.set(this, void 0);
        this.sendUICommandsData = __classPrivateFieldGet(this, _Device_instances, "m", _Device_sendUICommandsData).bind(this);
        this.sendRxData = __classPrivateFieldGet(this, _Device_instances, "m", _Device_sendRxData).bind(this);
        _Device_isConnected.set(this, false);
        _Device_reconnectOnDisconnection.set(this, _a.ReconnectOnDisconnection);
        _Device_reconnectIntervalId.set(this, void 0);
        this.latestConnectionMessage = new Map();
        _Device_deviceInformationManager.set(this, new DeviceInformationManager());
        _Device_batteryLevel.set(this, 0);
        _Device_inputManager.set(this, new InputManager());
        _Device_rawSensorManager.set(this, new RawSensorManager());
        _Device_vibrationManager.set(this, new VibrationManager());
        _Device_isServerSide.set(this, false);
        __classPrivateFieldGet(this, _Device_deviceInformationManager, "f").eventDispatcher = __classPrivateFieldGet(this, _Device_eventDispatcher, "f");
        __classPrivateFieldGet(this, _Device_vibrationManager, "f").sendUICommandsData = this.sendUICommandsData;
        __classPrivateFieldGet(this, _Device_inputManager, "f").sendRxData = this.sendRxData;
        this.addEventListener("hardwareRevision", () => {
        });
        this.addEventListener("isConnected", () => {
            if (this.isConnected) {
                __classPrivateFieldGet(this, _Device_inputManager, "f").start();
            }
            else {
                __classPrivateFieldGet(this, _Device_inputManager, "f").stop();
            }
        });
        DeviceManager$1.onDevice(this);
        if (isInBrowser) {
            window.addEventListener("beforeunload", () => {
                if (this.isConnected) ;
            });
        }
        if (isInNode) {
            process.on("exit", () => {
                if (this.isConnected) ;
            });
        }
    }
    get addEventListener() {
        return __classPrivateFieldGet(this, _Device_eventDispatcher, "f").addEventListener;
    }
    get removeEventListener() {
        return __classPrivateFieldGet(this, _Device_eventDispatcher, "f").removeEventListener;
    }
    get waitForEvent() {
        return __classPrivateFieldGet(this, _Device_eventDispatcher, "f").waitForEvent;
    }
    get removeEventListeners() {
        return __classPrivateFieldGet(this, _Device_eventDispatcher, "f").removeEventListeners;
    }
    get removeAllEventListeners() {
        return __classPrivateFieldGet(this, _Device_eventDispatcher, "f").removeAllEventListeners;
    }
    get connectionManager() {
        return __classPrivateFieldGet(this, _Device_connectionManager, "f");
    }
    set connectionManager(newConnectionManager) {
        if (this.connectionManager == newConnectionManager) {
            _console.log("same connectionManager is already assigned");
            return;
        }
        if (this.connectionManager) {
            this.connectionManager.onStatusUpdated = undefined;
            this.connectionManager.onMessageReceived = undefined;
            this.connectionManager.onMessagesReceived = undefined;
        }
        if (newConnectionManager) {
            newConnectionManager.onStatusUpdated = __classPrivateFieldGet(this, _Device_instances, "m", _Device_onConnectionStatusUpdated).bind(this);
            newConnectionManager.onMessageReceived = __classPrivateFieldGet(this, _Device_instances, "m", _Device_onConnectionMessageReceived).bind(this);
            newConnectionManager.onMessagesReceived = __classPrivateFieldGet(this, _Device_instances, "m", _Device_onConnectionMessagesReceived).bind(this);
        }
        __classPrivateFieldSet(this, _Device_connectionManager, newConnectionManager, "f");
        _console.log("assigned new connectionManager", __classPrivateFieldGet(this, _Device_connectionManager, "f"));
    }
    async connect() {
        if (!this.connectionManager) {
            this.connectionManager = __classPrivateFieldGet(_a, _a, "m", _Device_DefaultConnectionManager).call(_a);
        }
        __classPrivateFieldGet(this, _Device_instances, "m", _Device_clear).call(this);
        return this.connectionManager.connect();
    }
    get isConnected() {
        return __classPrivateFieldGet(this, _Device_isConnected, "f");
    }
    get canReconnect() {
        return this.connectionManager?.canReconnect;
    }
    async reconnect() {
        __classPrivateFieldGet(this, _Device_instances, "m", _Device_assertCanReconnect).call(this);
        __classPrivateFieldGet(this, _Device_instances, "m", _Device_clear).call(this);
        return this.connectionManager?.reconnect();
    }
    static async Connect() {
        const device = new _a();
        await device.connect();
        return device;
    }
    static get ReconnectOnDisconnection() {
        return __classPrivateFieldGet(this, _a, "f", _Device_ReconnectOnDisconnection);
    }
    static set ReconnectOnDisconnection(newReconnectOnDisconnection) {
        _console.assertTypeWithError(newReconnectOnDisconnection, "boolean");
        __classPrivateFieldSet(this, _a, newReconnectOnDisconnection, "f", _Device_ReconnectOnDisconnection);
    }
    get reconnectOnDisconnection() {
        return __classPrivateFieldGet(this, _Device_reconnectOnDisconnection, "f");
    }
    set reconnectOnDisconnection(newReconnectOnDisconnection) {
        _console.assertTypeWithError(newReconnectOnDisconnection, "boolean");
        __classPrivateFieldSet(this, _Device_reconnectOnDisconnection, newReconnectOnDisconnection, "f");
    }
    get connectionType() {
        return this.connectionManager?.type;
    }
    async disconnect() {
        __classPrivateFieldGet(this, _Device_instances, "m", _Device_assertIsConnected).call(this);
        if (this.reconnectOnDisconnection) {
            this.reconnectOnDisconnection = false;
            this.addEventListener("isConnected", () => {
                this.reconnectOnDisconnection = true;
            }, { once: true });
        }
        return this.connectionManager.disconnect();
    }
    toggleConnection() {
        if (this.isConnected) {
            this.disconnect();
        }
        else if (this.canReconnect) {
            this.reconnect();
        }
        else {
            this.connect();
        }
    }
    get connectionStatus() {
        switch (__classPrivateFieldGet(this, _Device_connectionManager, "f")?.status) {
            case "connected":
                return this.isConnected ? "connected" : "connecting";
            case "notConnected":
            case "connecting":
            case "disconnecting":
                return __classPrivateFieldGet(this, _Device_connectionManager, "f").status;
            default:
                return "notConnected";
        }
    }
    get isConnectionBusy() {
        return this.connectionStatus == "connecting" || this.connectionStatus == "disconnecting";
    }
    get deviceInformation() {
        return __classPrivateFieldGet(this, _Device_deviceInformationManager, "f").information;
    }
    get batteryLevel() {
        return __classPrivateFieldGet(this, _Device_batteryLevel, "f");
    }
    get setInputMode() {
        return __classPrivateFieldGet(this, _Device_inputManager, "f").setMode;
    }
    get setSensitivityForType() {
        return __classPrivateFieldGet(this, _Device_inputManager, "f").setSensitivityForType;
    }
    get vibrate() {
        return __classPrivateFieldGet(this, _Device_vibrationManager, "f").vibrate;
    }
    get isServerSide() {
        return __classPrivateFieldGet(this, _Device_isServerSide, "f");
    }
    set isServerSide(newIsServerSide) {
        if (__classPrivateFieldGet(this, _Device_isServerSide, "f") == newIsServerSide) {
            _console.log("redundant isServerSide assignment");
            return;
        }
        _console.log({ newIsServerSide });
        __classPrivateFieldSet(this, _Device_isServerSide, newIsServerSide, "f");
    }
}
_a = Device, _Device_eventDispatcher = new WeakMap(), _Device_connectionManager = new WeakMap(), _Device_isConnected = new WeakMap(), _Device_reconnectOnDisconnection = new WeakMap(), _Device_reconnectIntervalId = new WeakMap(), _Device_deviceInformationManager = new WeakMap(), _Device_batteryLevel = new WeakMap(), _Device_inputManager = new WeakMap(), _Device_rawSensorManager = new WeakMap(), _Device_vibrationManager = new WeakMap(), _Device_isServerSide = new WeakMap(), _Device_instances = new WeakSet(), _Device_DefaultConnectionManager = function _Device_DefaultConnectionManager() {
    return new WebBluetoothConnectionManager();
}, _Device_dispatchEvent_get = function _Device_dispatchEvent_get() {
    return __classPrivateFieldGet(this, _Device_eventDispatcher, "f").dispatchEvent;
}, _Device_sendUICommandsData = async function _Device_sendUICommandsData(data) {
    await __classPrivateFieldGet(this, _Device_connectionManager, "f")?.sendUICommandsData(data);
}, _Device_sendRxData = async function _Device_sendRxData(data) {
    await __classPrivateFieldGet(this, _Device_connectionManager, "f")?.sendRxData(data);
}, _Device_assertIsConnected = function _Device_assertIsConnected() {
    _console.assertWithError(this.isConnected, "notConnected");
}, _Device_assertCanReconnect = function _Device_assertCanReconnect() {
    _console.assertWithError(this.canReconnect, "cannot reconnect to device");
}, _Device_onConnectionStatusUpdated = function _Device_onConnectionStatusUpdated(connectionStatus) {
    _console.log({ connectionStatus });
    if (connectionStatus == "notConnected") {
        if (this.canReconnect && this.reconnectOnDisconnection) {
            _console.log("starting reconnect interval...");
            __classPrivateFieldSet(this, _Device_reconnectIntervalId, setInterval(() => {
                _console.log("attempting reconnect...");
                this.reconnect();
            }, 1000), "f");
        }
    }
    else {
        if (__classPrivateFieldGet(this, _Device_reconnectIntervalId, "f") != undefined) {
            _console.log("clearing reconnect interval");
            clearInterval(__classPrivateFieldGet(this, _Device_reconnectIntervalId, "f"));
            __classPrivateFieldSet(this, _Device_reconnectIntervalId, undefined, "f");
        }
    }
    __classPrivateFieldGet(this, _Device_instances, "m", _Device_checkConnection).call(this);
    if (connectionStatus == "connected" && !__classPrivateFieldGet(this, _Device_isConnected, "f")) ;
    DeviceManager$1.OnDeviceConnectionStatusUpdated(this, connectionStatus);
}, _Device_dispatchConnectionEvents = function _Device_dispatchConnectionEvents(includeIsConnected = false) {
    __classPrivateFieldGet(this, _Device_instances, "a", _Device_dispatchEvent_get).call(this, "connectionStatus", { connectionStatus: this.connectionStatus });
    __classPrivateFieldGet(this, _Device_instances, "a", _Device_dispatchEvent_get).call(this, this.connectionStatus, {});
    if (includeIsConnected) {
        __classPrivateFieldGet(this, _Device_instances, "a", _Device_dispatchEvent_get).call(this, "isConnected", { isConnected: this.isConnected });
    }
}, _Device_checkConnection = function _Device_checkConnection() {
    __classPrivateFieldSet(this, _Device_isConnected, Boolean(this.connectionManager?.isConnected), "f");
    switch (this.connectionStatus) {
        case "connected":
            if (__classPrivateFieldGet(this, _Device_isConnected, "f")) {
                __classPrivateFieldGet(this, _Device_instances, "m", _Device_dispatchConnectionEvents).call(this, true);
            }
            break;
        case "notConnected":
            __classPrivateFieldGet(this, _Device_instances, "m", _Device_dispatchConnectionEvents).call(this, true);
            break;
        default:
            __classPrivateFieldGet(this, _Device_instances, "m", _Device_dispatchConnectionEvents).call(this, false);
            break;
    }
}, _Device_clear = function _Device_clear() {
    this.latestConnectionMessage.clear();
    __classPrivateFieldGet(this, _Device_deviceInformationManager, "f").clear();
}, _Device_onConnectionMessageReceived = function _Device_onConnectionMessageReceived(messageType, dataView) {
    _console.log({ messageType, dataView });
    switch (messageType) {
        case "batteryLevel":
            const batteryLevel = dataView.getUint8(0);
            _console.log("received battery level", { batteryLevel });
            __classPrivateFieldGet(this, _Device_instances, "m", _Device_updateBatteryLevel).call(this, batteryLevel);
            break;
        default:
            if (DeviceInformationMessageTypes.includes(messageType)) {
                __classPrivateFieldGet(this, _Device_deviceInformationManager, "f").parseMessage(messageType, dataView);
            }
            else {
                throw Error(`uncaught messageType ${messageType}`);
            }
    }
    this.latestConnectionMessage.set(messageType, dataView);
    __classPrivateFieldGet(this, _Device_instances, "a", _Device_dispatchEvent_get).call(this, "connectionMessage", { messageType, dataView });
}, _Device_onConnectionMessagesReceived = function _Device_onConnectionMessagesReceived() {
    if (!this.isConnected) {
        __classPrivateFieldGet(this, _Device_instances, "m", _Device_checkConnection).call(this);
    }
}, _Device_updateBatteryLevel = function _Device_updateBatteryLevel(updatedBatteryLevel) {
    _console.assertTypeWithError(updatedBatteryLevel, "number");
    if (__classPrivateFieldGet(this, _Device_batteryLevel, "f") == updatedBatteryLevel) {
        _console.log(`duplicate batteryLevel assignment ${updatedBatteryLevel}`);
        return;
    }
    __classPrivateFieldSet(this, _Device_batteryLevel, updatedBatteryLevel, "f");
    _console.log({ updatedBatteryLevel: __classPrivateFieldGet(this, _Device_batteryLevel, "f") });
    __classPrivateFieldGet(this, _Device_instances, "a", _Device_dispatchEvent_get).call(this, "batteryLevel", { batteryLevel: __classPrivateFieldGet(this, _Device_batteryLevel, "f") });
};
_Device_ReconnectOnDisconnection = { value: false };

var _RangeHelper_instances, _RangeHelper_range, _RangeHelper_updateSpan;
const initialRange = { min: Infinity, max: -Infinity, span: 0 };
class RangeHelper {
    constructor() {
        _RangeHelper_instances.add(this);
        _RangeHelper_range.set(this, Object.assign({}, initialRange));
    }
    get min() {
        return __classPrivateFieldGet(this, _RangeHelper_range, "f").min;
    }
    get max() {
        return __classPrivateFieldGet(this, _RangeHelper_range, "f").max;
    }
    set min(newMin) {
        __classPrivateFieldGet(this, _RangeHelper_range, "f").min = newMin;
        __classPrivateFieldGet(this, _RangeHelper_range, "f").max = Math.max(newMin, __classPrivateFieldGet(this, _RangeHelper_range, "f").max);
        __classPrivateFieldGet(this, _RangeHelper_instances, "m", _RangeHelper_updateSpan).call(this);
    }
    set max(newMax) {
        __classPrivateFieldGet(this, _RangeHelper_range, "f").max = newMax;
        __classPrivateFieldGet(this, _RangeHelper_range, "f").min = Math.min(newMax, __classPrivateFieldGet(this, _RangeHelper_range, "f").min);
        __classPrivateFieldGet(this, _RangeHelper_instances, "m", _RangeHelper_updateSpan).call(this);
    }
    reset() {
        Object.assign(__classPrivateFieldGet(this, _RangeHelper_range, "f"), initialRange);
    }
    update(value) {
        __classPrivateFieldGet(this, _RangeHelper_range, "f").min = Math.min(value, __classPrivateFieldGet(this, _RangeHelper_range, "f").min);
        __classPrivateFieldGet(this, _RangeHelper_range, "f").max = Math.max(value, __classPrivateFieldGet(this, _RangeHelper_range, "f").max);
        __classPrivateFieldGet(this, _RangeHelper_instances, "m", _RangeHelper_updateSpan).call(this);
    }
    getNormalization(value, weightByRange) {
        let normalization = getInterpolation(value, __classPrivateFieldGet(this, _RangeHelper_range, "f").min, __classPrivateFieldGet(this, _RangeHelper_range, "f").max, __classPrivateFieldGet(this, _RangeHelper_range, "f").span);
        if (weightByRange) {
            normalization *= __classPrivateFieldGet(this, _RangeHelper_range, "f").span;
        }
        return normalization || 0;
    }
    updateAndGetNormalization(value, weightByRange) {
        this.update(value);
        return this.getNormalization(value, weightByRange);
    }
}
_RangeHelper_range = new WeakMap(), _RangeHelper_instances = new WeakSet(), _RangeHelper_updateSpan = function _RangeHelper_updateSpan() {
    __classPrivateFieldGet(this, _RangeHelper_range, "f").span = __classPrivateFieldGet(this, _RangeHelper_range, "f").max - __classPrivateFieldGet(this, _RangeHelper_range, "f").min;
};

export { Device, DeviceManager$1 as DeviceManager, environment as Environment, InputModes, MaxNumberOfVibrationSegments, MaxNumberOfVibrations, RangeHelper, RawSensorSensitivityFactors, RawSensorTypes, setAllConsoleLevelFlags, setConsoleLevelFlagsForType };
//# sourceMappingURL=tapstrap.module.js.map
