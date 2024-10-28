/**
 * @copyright Zack Qattan 2024
 * @license MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TS = {}));
})(this, (function (exports) { 'use strict';

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

    const isInProduction = "__BRILLIANTSOLE__PROD__" == "__BRILLIANTSOLE__PROD__";
    const isInDev = "__BRILLIANTSOLE__PROD__" == "__BRILLIANTSOLE__DEV__";
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

    const _console$j = createConsole("EventDispatcher", { log: false });
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
                    _console$j.log(`removing "${type}" eventListener`, listenerObj);
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
                _console$j.log(`creating "${type}" listeners array`, this.listeners[type]);
            }
            const alreadyAdded = this.listeners[type].find((listenerObject) => {
                return listenerObject.listener == listener && listenerObject.once == options.once;
            });
            if (alreadyAdded) {
                _console$j.log("already added listener");
                return;
            }
            _console$j.log(`adding "${type}" listener`, listener, options);
            this.listeners[type].push({ listener, once: options.once });
            _console$j.log(`currently have ${this.listeners[type].length} "${type}" listeners`);
        }
        removeEventListener(type, listener) {
            if (!this.isValidEventType(type)) {
                throw new Error(`Invalid event type: ${type}`);
            }
            if (!this.listeners[type])
                return;
            _console$j.log(`removing "${type}" listener...`, listener);
            this.listeners[type].forEach((listenerObj) => {
                const isListenerToRemove = listenerObj.listener === listener;
                if (isListenerToRemove) {
                    _console$j.log(`flagging "${type}" listener`, listener);
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
            _console$j.log(`removing "${type}" listeners...`);
            this.listeners[type] = [];
        }
        removeAllEventListeners() {
            _console$j.log(`removing listeners...`);
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
                _console$j.log(`dispatching "${type}" listener`, listenerObj);
                listenerObj.listener({ type, target: this.target, message });
                if (listenerObj.once) {
                    _console$j.log(`flagging "${type}" listener`, listenerObj);
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
    const _console$i = createConsole("Timer", { log: false });
    class Timer {
        get callback() {
            return __classPrivateFieldGet(this, _Timer_callback, "f");
        }
        set callback(newCallback) {
            _console$i.assertTypeWithError(newCallback, "function");
            _console$i.log({ newCallback });
            __classPrivateFieldSet(this, _Timer_callback, newCallback, "f");
            if (this.isRunning) {
                this.restart();
            }
        }
        get interval() {
            return __classPrivateFieldGet(this, _Timer_interval, "f");
        }
        set interval(newInterval) {
            _console$i.assertTypeWithError(newInterval, "number");
            _console$i.assertWithError(newInterval > 0, "interval must be above 0");
            _console$i.log({ newInterval });
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
                _console$i.log("interval already running");
                return;
            }
            _console$i.log("starting interval");
            __classPrivateFieldSet(this, _Timer_intervalId, setInterval(__classPrivateFieldGet(this, _Timer_callback, "f"), __classPrivateFieldGet(this, _Timer_interval, "f")), "f");
            if (immediately) {
                __classPrivateFieldGet(this, _Timer_callback, "f").call(this);
            }
        }
        stop() {
            if (!this.isRunning) {
                _console$i.log("interval already not running");
                return;
            }
            _console$i.log("stopping interval");
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
    const _console$h = createConsole("DeviceInformationManager", { log: true });
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
            _console$h.log({ messageType });
            switch (messageType) {
                case "manufacturerName":
                    const manufacturerName = textDecoder.decode(dataView.buffer);
                    _console$h.log({ manufacturerName });
                    __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { manufacturerName });
                    break;
                case "modelNumber":
                    const modelNumber = textDecoder.decode(dataView.buffer);
                    _console$h.log({ modelNumber });
                    __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { modelNumber });
                    break;
                case "softwareRevision":
                    const softwareRevision = textDecoder.decode(dataView.buffer);
                    _console$h.log({ softwareRevision });
                    __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { softwareRevision });
                    break;
                case "hardwareRevision":
                    const hardwareRevision = textDecoder.decode(dataView.buffer);
                    _console$h.log({ hardwareRevision });
                    __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { hardwareRevision });
                    break;
                case "firmwareRevision":
                    const firmwareRevision = textDecoder.decode(dataView.buffer);
                    _console$h.log({ firmwareRevision });
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
                    _console$h.log({ pnpId });
                    __classPrivateFieldGet(this, _DeviceInformationManager_instances, "m", _DeviceInformationManager_update).call(this, { pnpId });
                    break;
                case "serialNumber":
                    const serialNumber = textDecoder.decode(dataView.buffer);
                    _console$h.log({ serialNumber });
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
        _console$h.log({ partialDeviceInformation });
        const deviceInformationNames = Object.keys(partialDeviceInformation);
        deviceInformationNames.forEach((deviceInformationName) => {
            __classPrivateFieldGet(this, _DeviceInformationManager_instances, "a", _DeviceInformationManager_dispatchEvent_get).call(this, deviceInformationName, {
                [deviceInformationName]: partialDeviceInformation[deviceInformationName],
            });
        });
        Object.assign(__classPrivateFieldGet(this, _DeviceInformationManager_information, "f"), partialDeviceInformation);
        _console$h.log({ deviceInformation: __classPrivateFieldGet(this, _DeviceInformationManager_information, "f") });
        if (__classPrivateFieldGet(this, _DeviceInformationManager_instances, "a", _DeviceInformationManager_isComplete_get)) {
            _console$h.log("completed deviceInformation");
            __classPrivateFieldGet(this, _DeviceInformationManager_instances, "a", _DeviceInformationManager_dispatchEvent_get).call(this, "deviceInformation", { deviceInformation: this.information });
        }
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

    function tapByteToAirGesture(tapByte) {
        switch (tapByte) {
            case 2:
                return "indexToThumbTouch";
            case 4:
                return "middleToThumbTouch";
        }
    }
    const AirGestureEnum = {
        oneFingerUp: 2,
        twoFingersUp: 3,
        oneFingerDown: 4,
        twoFingersDown: 5,
        oneFingerLeft: 6,
        twoFingersLeft: 7,
        oneFingerRight: 8,
        twoFingersRight: 9,
        indexToThumbTouch: 10,
        middleToThumbTouch: 11,
        xrAirGestureNone: 100,
        xrAirGestureThumbIndex: 101,
        xrAirGestureThumbMiddle: 102,
    };
    const AirGestureEnumLookup = {};
    Object.keys(AirGestureEnum).forEach((airGesture) => {
        AirGestureEnumLookup[AirGestureEnum[airGesture]] = airGesture;
    });
    const XRAirGestureEnum = {
        clickIndex: 1,
        clickMiddle: 2,
        dragIndex: 3,
        dragMiddle: 4,
        drop: 5,
        potentialDragOrClickIndex: 6,
        potentialDragOrClickMiddle: 7,
    };
    const XRAirGestureEnumLookup = {};
    Object.keys(XRAirGestureEnum).forEach((xrAirGesture) => {
        XRAirGestureEnumLookup[XRAirGestureEnum[xrAirGesture]] = xrAirGesture;
    });

    var _TapDataManager_instances, _TapDataManager_dispatchEvent_get, _TapDataManager_parse;
    const _console$g = createConsole("TapDataManager");
    const TapDataMessageTypes = ["tapData"];
    const TapDataEventTypes = [...TapDataMessageTypes, "tapAirGesture"];
    const TapFingers = ["thumb", "index", "middle", "ring", "pinky"];
    class TapDataManager {
        constructor() {
            _TapDataManager_instances.add(this);
            this.isInAirGestureState = false;
            autoBind(this);
        }
        parseMessage(messageType, dataView) {
            _console$g.log({ messageType });
            switch (messageType) {
                case "tapData":
                    __classPrivateFieldGet(this, _TapDataManager_instances, "m", _TapDataManager_parse).call(this, dataView);
                    break;
                default:
                    throw Error(`uncaught messageType ${messageType}`);
            }
        }
    }
    _TapDataManager_instances = new WeakSet(), _TapDataManager_dispatchEvent_get = function _TapDataManager_dispatchEvent_get() {
        return this.eventDispatcher.dispatchEvent;
    }, _TapDataManager_parse = function _TapDataManager_parse(dataView) {
        _console$g.log("parsing tap data", dataView);
        const first = dataView.getUint8(0);
        if (this.isInAirGestureState) {
            const tapAirGesture = tapByteToAirGesture(first);
            _console$g.log({ tapAirGesture });
            if (tapAirGesture) {
                __classPrivateFieldGet(this, _TapDataManager_instances, "a", _TapDataManager_dispatchEvent_get).call(this, "tapAirGesture", { tapAirGesture });
            }
        }
        else {
            let keyboardState;
            if (dataView.byteLength >= 4) {
                const keyboardStateByte = dataView.getUint8(3);
                keyboardState = {
                    shiftState: keyboardStateByte & 0b00000011,
                    switchState: (keyboardStateByte >> 2) & 0b00000011,
                    multitap: Math.min(((keyboardStateByte >> 4) & 0b00000011) + 1, 3),
                };
            }
            const fingers = {};
            _console$g.log("fingerBits", first.toString(2));
            TapFingers.forEach((finger, index) => {
                fingers[finger] = (first & (1 << index)) != 0;
            });
            _console$g.log("fingers", fingers);
            __classPrivateFieldGet(this, _TapDataManager_instances, "a", _TapDataManager_dispatchEvent_get).call(this, "tapData", { fingers, keyboardState });
        }
    };

    var _MouseDataManager_instances, _MouseDataManager_dispatchEvent_get, _MouseDataManager_parseMouseData;
    const _console$f = createConsole("MouseDataManager");
    const MouseDataMessageTypes = ["mouseData"];
    const MouseDataEventTypes = [...MouseDataMessageTypes];
    class MouseDataManager {
        constructor() {
            _MouseDataManager_instances.add(this);
            autoBind(this);
        }
        parseMessage(messageType, dataView) {
            _console$f.log({ messageType });
            switch (messageType) {
                case "mouseData":
                    __classPrivateFieldGet(this, _MouseDataManager_instances, "m", _MouseDataManager_parseMouseData).call(this, dataView);
                    break;
                default:
                    throw Error(`uncaught messageType ${messageType}`);
            }
        }
    }
    _MouseDataManager_instances = new WeakSet(), _MouseDataManager_dispatchEvent_get = function _MouseDataManager_dispatchEvent_get() {
        return this.eventDispatcher.dispatchEvent;
    }, _MouseDataManager_parseMouseData = function _MouseDataManager_parseMouseData(dataView) {
        _console$f.log("parsing mouse data", dataView);
        const first = dataView.getUint8(0);
        if (first != 0) {
            return;
        }
        const velocity = {
            x: dataView.getInt16(1, true),
            y: -dataView.getInt16(3, true),
        };
        const isMouse = dataView.getUint8(9) == 1;
        __classPrivateFieldGet(this, _MouseDataManager_instances, "a", _MouseDataManager_dispatchEvent_get).call(this, "mouseData", { velocity, isMouse });
    };

    var _AirGestureManager_instances, _AirGestureManager_dispatchEvent_get, _AirGestureManager_isInState, _AirGestureManager_updateIsInState, _AirGestureManager_parseAirGesture;
    const _console$e = createConsole("AirGestureManager");
    const AirGestureMessageTypes = ["airGesture"];
    const AirGestureEventTypes = [...AirGestureMessageTypes, "isInAirGestureState", "xrAirGesture"];
    class AirGestureManager {
        constructor() {
            _AirGestureManager_instances.add(this);
            _AirGestureManager_isInState.set(this, false);
            autoBind(this);
        }
        get isInState() {
            return __classPrivateFieldGet(this, _AirGestureManager_isInState, "f");
        }
        parseMessage(messageType, dataView) {
            _console$e.log({ messageType });
            switch (messageType) {
                case "airGesture":
                    __classPrivateFieldGet(this, _AirGestureManager_instances, "m", _AirGestureManager_parseAirGesture).call(this, dataView);
                    break;
                default:
                    throw Error(`uncaught messageType ${messageType}`);
            }
        }
    }
    _AirGestureManager_isInState = new WeakMap(), _AirGestureManager_instances = new WeakSet(), _AirGestureManager_dispatchEvent_get = function _AirGestureManager_dispatchEvent_get() {
        return this.eventDispatcher.dispatchEvent;
    }, _AirGestureManager_updateIsInState = function _AirGestureManager_updateIsInState(newIsInState) {
        __classPrivateFieldSet(this, _AirGestureManager_isInState, newIsInState, "f");
        _console$e.log("isInAirGestureState", __classPrivateFieldGet(this, _AirGestureManager_isInState, "f"));
        __classPrivateFieldGet(this, _AirGestureManager_instances, "a", _AirGestureManager_dispatchEvent_get).call(this, "isInAirGestureState", { isInAirGestureState: __classPrivateFieldGet(this, _AirGestureManager_isInState, "f") });
    }, _AirGestureManager_parseAirGesture = function _AirGestureManager_parseAirGesture(dataView) {
        _console$e.log("parsing air gesture", dataView);
        const first = dataView.getUint8(0);
        if (first == 20) {
            const second = dataView.getUint8(1);
            __classPrivateFieldGet(this, _AirGestureManager_instances, "m", _AirGestureManager_updateIsInState).call(this, second == 1);
        }
        else {
            let airGesture = AirGestureEnumLookup[first];
            _console$e.log({ airGesture });
            if (airGesture) {
                __classPrivateFieldGet(this, _AirGestureManager_instances, "a", _AirGestureManager_dispatchEvent_get).call(this, "airGesture", { airGesture });
            }
            else {
                const xrAirGesture = XRAirGestureEnumLookup[first];
                _console$e.log({ xrAirGesture });
                if (xrAirGesture) {
                    __classPrivateFieldGet(this, _AirGestureManager_instances, "a", _AirGestureManager_dispatchEvent_get).call(this, "xrAirGesture", { xrAirGesture });
                }
            }
        }
    };

    const _console$d = createConsole("RawSensorUtils");
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
    const RawSensorDataTypes = ["imu", "device"];
    const RawSensorDataLength = {
        imu: 12,
        device: 30,
    };
    function assertValidRawSensorSensitivityForType(rawSensorType, index) {
        const value = RawSensorSensitivityFactors[rawSensorType][index];
        _console$d.assertWithError(value != undefined, `invalid RawSensorSensitivity index ${index} for sensor "${rawSensorType}" (got value ${value})`);
    }
    function assertValidRawSensorSensitivity(sensitivity) {
        RawSensorTypes.forEach((rawSensorType) => {
            const index = sensitivity[rawSensorType];
            assertValidRawSensorSensitivityForType(rawSensorType, index);
        });
    }
    const RawSensorImuTypes = ["gyroscope", "accelerometer"];
    const RawSensorFingers = ["thumb", "index", "middle", "ring", "pinky"];

    const _console$c = createConsole("ArrayBufferUtils", { log: false });
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
    function sliceDataView(dataView, begin, length) {
        let end;
        if (length != undefined) {
            end = dataView.byteOffset + begin + length;
        }
        _console$c.log({ dataView, begin, end, length });
        return new DataView(dataView.buffer.slice(dataView.byteOffset + begin, end));
    }

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var Mahony;
    var hasRequiredMahony;
    function requireMahony () {
    	if (hasRequiredMahony) return Mahony;
    	hasRequiredMahony = 1;
    	Mahony = function Mahony(sampleInterval, options) {
    	  options = options || {};
    	  const kp = options.kp || 1.0;
    	  const ki = options.ki || 0.0;
    	  const sampleFreq = 1000 / sampleInterval;
    	  let recipSampleFreq = 1 / sampleFreq;
    	  let initalised = options.doInitialisation === true ? false : true;
    	  let twoKp = 2.0 * kp;
    	  const twoKi = 2.0 * ki;
    	  let q0 = 1.0,
    	    q1 = 0.0,
    	    q2 = 0.0,
    	    q3 = 0.0;
    	  let integralFBx = 0.0,
    	    integralFBy = 0.0,
    	    integralFBz = 0.0;
    	  function mahonyAHRSUpdateIMU(gx, gy, gz, ax, ay, az) {
    	    let recipNorm;
    	    let halfvx, halfvy, halfvz;
    	    let halfex, halfey, halfez;
    	    if (ax !== 0 && ay !== 0 && az !== 0) {
    	      recipNorm = (ax * ax + ay * ay + az * az) ** -0.5;
    	      ax *= recipNorm;
    	      ay *= recipNorm;
    	      az *= recipNorm;
    	      halfvx = q1 * q3 - q0 * q2;
    	      halfvy = q0 * q1 + q2 * q3;
    	      halfvz = q0 * q0 - 0.5 + q3 * q3;
    	      halfex = ay * halfvz - az * halfvy;
    	      halfey = az * halfvx - ax * halfvz;
    	      halfez = ax * halfvy - ay * halfvx;
    	      if (twoKi > 0.0) {
    	        integralFBx += twoKi * halfex * recipSampleFreq;
    	        integralFBy += twoKi * halfey * recipSampleFreq;
    	        integralFBz += twoKi * halfez * recipSampleFreq;
    	        gx += integralFBx;
    	        gy += integralFBy;
    	        gz += integralFBz;
    	      } else {
    	        integralFBx = 0.0;
    	        integralFBy = 0.0;
    	        integralFBz = 0.0;
    	      }
    	      gx += twoKp * halfex;
    	      gy += twoKp * halfey;
    	      gz += twoKp * halfez;
    	    }
    	    gx *= 0.5 * recipSampleFreq;
    	    gy *= 0.5 * recipSampleFreq;
    	    gz *= 0.5 * recipSampleFreq;
    	    const qa = q0;
    	    const qb = q1;
    	    const qc = q2;
    	    q0 += -qb * gx - qc * gy - q3 * gz;
    	    q1 += qa * gx + qc * gz - q3 * gy;
    	    q2 += qa * gy - qb * gz + q3 * gx;
    	    q3 += qa * gz + qb * gy - qc * gx;
    	    recipNorm = (q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3) ** -0.5;
    	    q0 *= recipNorm;
    	    q1 *= recipNorm;
    	    q2 *= recipNorm;
    	    q3 *= recipNorm;
    	  }
    	  function cross_product(ax, ay, az, bx, by, bz) {
    	    return {
    	      x: ay * bz - az * by,
    	      y: az * bx - ax * bz,
    	      z: ax * by - ay * bx,
    	    };
    	  }
    	  function eulerAnglesFromImuRad(ax, ay, az, mx, my, mz) {
    	    const pitch = -Math.atan2(ax, Math.sqrt(ay * ay + az * az));
    	    const tmp1 = cross_product(ax, ay, az, 1.0, 0.0, 0.0);
    	    const tmp2 = cross_product(1.0, 0.0, 0.0, tmp1.x, tmp1.y, tmp1.z);
    	    const roll = Math.atan2(tmp2.y, tmp2.z);
    	    const cr = Math.cos(roll);
    	    const sp = Math.sin(pitch);
    	    const sr = Math.sin(roll);
    	    const yh = my * cr - mz * sr;
    	    const xh = mx * Math.cos(pitch) + my * sr * sp + mz * cr * sp;
    	    const heading = -Math.atan2(yh, xh);
    	    return {
    	      heading,
    	      pitch,
    	      roll,
    	    };
    	  }
    	  function toQuaternion(eulerAngles) {
    	    const cy = Math.cos(eulerAngles.heading * 0.5);
    	    const sy = Math.sin(eulerAngles.heading * 0.5);
    	    const cp = Math.cos(eulerAngles.pitch * 0.5);
    	    const sp = Math.sin(eulerAngles.pitch * 0.5);
    	    const cr = Math.cos(eulerAngles.roll * 0.5);
    	    const sr = Math.sin(eulerAngles.roll * 0.5);
    	    return {
    	      w: cr * cp * cy + sr * sp * sy,
    	      x: sr * cp * cy - cr * sp * sy,
    	      y: cr * sp * cy + sr * cp * sy,
    	      z: cr * cp * sy - sr * sp * cy,
    	    };
    	  }
    	  function init(ax, ay, az, mx, my, mz) {
    	    const ea = eulerAnglesFromImuRad(ax, ay, az, mx, my, mz);
    	    const iq = toQuaternion(ea);
    	    const recipNorm = (iq.w * iq.w + iq.x * iq.x + iq.y * iq.y + iq.z * iq.z) ** -0.5;
    	    q0 = iq.w * recipNorm;
    	    q1 = iq.x * recipNorm;
    	    q2 = iq.y * recipNorm;
    	    q3 = iq.z * recipNorm;
    	    initalised = true;
    	  }
    	  function mahonyAHRSUpdate(gx, gy, gz, ax, ay, az, mx, my, mz, deltaTimeSec) {
    	    recipSampleFreq = deltaTimeSec || recipSampleFreq;
    	    if (!initalised) {
    	      init(ax, ay, az, mx, my, mz);
    	    }
    	    let recipNorm;
    	    let q0q0, q0q1, q0q2, q0q3, q1q1, q1q2, q1q3, q2q2, q2q3, q3q3;
    	    let hx, hy, bx, bz;
    	    let halfvx, halfvy, halfvz, halfwx, halfwy, halfwz;
    	    let halfex, halfey, halfez;
    	    if (mx === undefined || my === undefined || mz === undefined || (mx === 0 && my === 0 && mz === 0)) {
    	      mahonyAHRSUpdateIMU(gx, gy, gz, ax, ay, az);
    	      return;
    	    }
    	    if (ax !== 0 && ay !== 0 && az !== 0) {
    	      recipNorm = (ax * ax + ay * ay + az * az) ** -0.5;
    	      ax *= recipNorm;
    	      ay *= recipNorm;
    	      az *= recipNorm;
    	      recipNorm = (mx * mx + my * my + mz * mz) ** -0.5;
    	      mx *= recipNorm;
    	      my *= recipNorm;
    	      mz *= recipNorm;
    	      q0q0 = q0 * q0;
    	      q0q1 = q0 * q1;
    	      q0q2 = q0 * q2;
    	      q0q3 = q0 * q3;
    	      q1q1 = q1 * q1;
    	      q1q2 = q1 * q2;
    	      q1q3 = q1 * q3;
    	      q2q2 = q2 * q2;
    	      q2q3 = q2 * q3;
    	      q3q3 = q3 * q3;
    	      hx = 2.0 * (mx * (0.5 - q2q2 - q3q3) + my * (q1q2 - q0q3) + mz * (q1q3 + q0q2));
    	      hy = 2.0 * (mx * (q1q2 + q0q3) + my * (0.5 - q1q1 - q3q3) + mz * (q2q3 - q0q1));
    	      bx = Math.sqrt(hx * hx + hy * hy);
    	      bz = 2.0 * (mx * (q1q3 - q0q2) + my * (q2q3 + q0q1) + mz * (0.5 - q1q1 - q2q2));
    	      halfvx = q1q3 - q0q2;
    	      halfvy = q0q1 + q2q3;
    	      halfvz = q0q0 - 0.5 + q3q3;
    	      halfwx = bx * (0.5 - q2q2 - q3q3) + bz * (q1q3 - q0q2);
    	      halfwy = bx * (q1q2 - q0q3) + bz * (q0q1 + q2q3);
    	      halfwz = bx * (q0q2 + q1q3) + bz * (0.5 - q1q1 - q2q2);
    	      halfex = ay * halfvz - az * halfvy + (my * halfwz - mz * halfwy);
    	      halfey = az * halfvx - ax * halfvz + (mz * halfwx - mx * halfwz);
    	      halfez = ax * halfvy - ay * halfvx + (mx * halfwy - my * halfwx);
    	      if (twoKi > 0.0) {
    	        integralFBx += twoKi * halfex * recipSampleFreq;
    	        integralFBy += twoKi * halfey * recipSampleFreq;
    	        integralFBz += twoKi * halfez * recipSampleFreq;
    	        gx += integralFBx;
    	        gy += integralFBy;
    	        gz += integralFBz;
    	      } else {
    	        integralFBx = 0.0;
    	        integralFBy = 0.0;
    	        integralFBz = 0.0;
    	      }
    	      gx += twoKp * halfex;
    	      gy += twoKp * halfey;
    	      gz += twoKp * halfez;
    	    }
    	    gx *= 0.5 * recipSampleFreq;
    	    gy *= 0.5 * recipSampleFreq;
    	    gz *= 0.5 * recipSampleFreq;
    	    const qa = q0;
    	    const qb = q1;
    	    const qc = q2;
    	    q0 += -qb * gx - qc * gy - q3 * gz;
    	    q1 += qa * gx + qc * gz - q3 * gy;
    	    q2 += qa * gy - qb * gz + q3 * gx;
    	    q3 += qa * gz + qb * gy - qc * gx;
    	    recipNorm = (q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3) ** -0.5;
    	    q0 *= recipNorm;
    	    q1 *= recipNorm;
    	    q2 *= recipNorm;
    	    q3 *= recipNorm;
    	  }
    	  return {
    	    update: mahonyAHRSUpdate,
    	    init,
    	    getQuaternion() {
    	      return {
    	        w: q0,
    	        x: q1,
    	        y: q2,
    	        z: q3,
    	      };
    	    },
    	  };
    	};
    	return Mahony;
    }

    var Madgwick;
    var hasRequiredMadgwick;
    function requireMadgwick () {
    	if (hasRequiredMadgwick) return Madgwick;
    	hasRequiredMadgwick = 1;
    	Madgwick = function Madgwick(sampleInterval, options) {
    	  options = options || {};
    	  const sampleFreq = 1000 / sampleInterval;
    	  let beta = options.beta || 0.4;
    	  let initalised = options.doInitialisation === true ? false : true;
    	  let q0 = 1.0,
    	    q1 = 0.0,
    	    q2 = 0.0,
    	    q3 = 0.0;
    	  let recipSampleFreq = 1.0 / sampleFreq;
    	  function madgwickAHRSUpdateIMU(gx, gy, gz, ax, ay, az) {
    	    let recipNorm;
    	    let s0, s1, s2, s3;
    	    let qDot1, qDot2, qDot3, qDot4;
    	    let v2q0, v2q1, v2q2, v2q3, v4q0, v4q1, v4q2, v8q1, v8q2, q0q0, q1q1, q2q2, q3q3;
    	    qDot1 = 0.5 * (-q1 * gx - q2 * gy - q3 * gz);
    	    qDot2 = 0.5 * (q0 * gx + q2 * gz - q3 * gy);
    	    qDot3 = 0.5 * (q0 * gy - q1 * gz + q3 * gx);
    	    qDot4 = 0.5 * (q0 * gz + q1 * gy - q2 * gx);
    	    if (!(ax === 0.0 && ay === 0.0 && az === 0.0)) {
    	      recipNorm = (ax * ax + ay * ay + az * az) ** -0.5;
    	      ax *= recipNorm;
    	      ay *= recipNorm;
    	      az *= recipNorm;
    	      v2q0 = 2.0 * q0;
    	      v2q1 = 2.0 * q1;
    	      v2q2 = 2.0 * q2;
    	      v2q3 = 2.0 * q3;
    	      v4q0 = 4.0 * q0;
    	      v4q1 = 4.0 * q1;
    	      v4q2 = 4.0 * q2;
    	      v8q1 = 8.0 * q1;
    	      v8q2 = 8.0 * q2;
    	      q0q0 = q0 * q0;
    	      q1q1 = q1 * q1;
    	      q2q2 = q2 * q2;
    	      q3q3 = q3 * q3;
    	      s0 = v4q0 * q2q2 + v2q2 * ax + v4q0 * q1q1 - v2q1 * ay;
    	      s1 = v4q1 * q3q3 - v2q3 * ax + 4.0 * q0q0 * q1 - v2q0 * ay - v4q1 + v8q1 * q1q1 + v8q1 * q2q2 + v4q1 * az;
    	      s2 = 4.0 * q0q0 * q2 + v2q0 * ax + v4q2 * q3q3 - v2q3 * ay - v4q2 + v8q2 * q1q1 + v8q2 * q2q2 + v4q2 * az;
    	      s3 = 4.0 * q1q1 * q3 - v2q1 * ax + 4.0 * q2q2 * q3 - v2q2 * ay;
    	      recipNorm = (s0 * s0 + s1 * s1 + s2 * s2 + s3 * s3) ** -0.5;
    	      s0 *= recipNorm;
    	      s1 *= recipNorm;
    	      s2 *= recipNorm;
    	      s3 *= recipNorm;
    	      qDot1 -= beta * s0;
    	      qDot2 -= beta * s1;
    	      qDot3 -= beta * s2;
    	      qDot4 -= beta * s3;
    	    }
    	    q0 += qDot1 * recipSampleFreq;
    	    q1 += qDot2 * recipSampleFreq;
    	    q2 += qDot3 * recipSampleFreq;
    	    q3 += qDot4 * recipSampleFreq;
    	    recipNorm = (q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3) ** -0.5;
    	    q0 *= recipNorm;
    	    q1 *= recipNorm;
    	    q2 *= recipNorm;
    	    q3 *= recipNorm;
    	  }
    	  function cross_product(ax, ay, az, bx, by, bz) {
    	    return {
    	      x: ay * bz - az * by,
    	      y: az * bx - ax * bz,
    	      z: ax * by - ay * bx,
    	    };
    	  }
    	  function eulerAnglesFromImuRad(ax, ay, az, mx, my, mz) {
    	    const pitch = -Math.atan2(ax, Math.sqrt(ay * ay + az * az));
    	    const tmp1 = cross_product(ax, ay, az, 1.0, 0.0, 0.0);
    	    const tmp2 = cross_product(1.0, 0.0, 0.0, tmp1.x, tmp1.y, tmp1.z);
    	    const roll = Math.atan2(tmp2.y, tmp2.z);
    	    const cr = Math.cos(roll);
    	    const sp = Math.sin(pitch);
    	    const sr = Math.sin(roll);
    	    const yh = my * cr - mz * sr;
    	    const xh = mx * Math.cos(pitch) + my * sr * sp + mz * cr * sp;
    	    const heading = -Math.atan2(yh, xh);
    	    return {
    	      heading,
    	      pitch,
    	      roll,
    	    };
    	  }
    	  function toQuaternion(eulerAngles) {
    	    const cy = Math.cos(eulerAngles.heading * 0.5);
    	    const sy = Math.sin(eulerAngles.heading * 0.5);
    	    const cp = Math.cos(eulerAngles.pitch * 0.5);
    	    const sp = Math.sin(eulerAngles.pitch * 0.5);
    	    const cr = Math.cos(eulerAngles.roll * 0.5);
    	    const sr = Math.sin(eulerAngles.roll * 0.5);
    	    return {
    	      w: cr * cp * cy + sr * sp * sy,
    	      x: sr * cp * cy - cr * sp * sy,
    	      y: cr * sp * cy + sr * cp * sy,
    	      z: cr * cp * sy - sr * sp * cy,
    	    };
    	  }
    	  function init(ax, ay, az, mx, my, mz) {
    	    const ea = eulerAnglesFromImuRad(ax, ay, az, mx, my, mz);
    	    const iq = toQuaternion(ea);
    	    const recipNorm = (iq.w * iq.w + iq.x * iq.x + iq.y * iq.y + iq.z * iq.z) ** -0.5;
    	    q0 = iq.w * recipNorm;
    	    q1 = iq.x * recipNorm;
    	    q2 = iq.y * recipNorm;
    	    q3 = iq.z * recipNorm;
    	    initalised = true;
    	  }
    	  function madgwickAHRSUpdate(gx, gy, gz, ax, ay, az, mx, my, mz, deltaTimeSec) {
    	    recipSampleFreq = deltaTimeSec || recipSampleFreq;
    	    if (!initalised) {
    	      init(ax, ay, az, mx, my, mz);
    	    }
    	    let recipNorm;
    	    let s0, s1, s2, s3;
    	    let qDot1, qDot2, qDot3, qDot4;
    	    let hx, hy;
    	    let v2q0mx, v2q0my, v2q0mz, v2q1mx, v2bx, v2bz, v4bx, v4bz, v2q0, v2q1, v2q2, v2q3, v2q0q2, v2q2q3;
    	    let q0q0, q0q1, q0q2, q0q3, q1q1, q1q2, q1q3, q2q2, q2q3, q3q3;
    	    if (mx === undefined || my === undefined || mz === undefined || (mx === 0 && my === 0 && mz === 0)) {
    	      madgwickAHRSUpdateIMU(gx, gy, gz, ax, ay, az);
    	      return;
    	    }
    	    qDot1 = 0.5 * (-q1 * gx - q2 * gy - q3 * gz);
    	    qDot2 = 0.5 * (q0 * gx + q2 * gz - q3 * gy);
    	    qDot3 = 0.5 * (q0 * gy - q1 * gz + q3 * gx);
    	    qDot4 = 0.5 * (q0 * gz + q1 * gy - q2 * gx);
    	    if (!(ax === 0.0 && ay === 0.0 && az === 0.0)) {
    	      recipNorm = (ax * ax + ay * ay + az * az) ** -0.5;
    	      ax *= recipNorm;
    	      ay *= recipNorm;
    	      az *= recipNorm;
    	      recipNorm = (mx * mx + my * my + mz * mz) ** -0.5;
    	      mx *= recipNorm;
    	      my *= recipNorm;
    	      mz *= recipNorm;
    	      v2q0mx = 2.0 * q0 * mx;
    	      v2q0my = 2.0 * q0 * my;
    	      v2q0mz = 2.0 * q0 * mz;
    	      v2q1mx = 2.0 * q1 * mx;
    	      v2q0 = 2.0 * q0;
    	      v2q1 = 2.0 * q1;
    	      v2q2 = 2.0 * q2;
    	      v2q3 = 2.0 * q3;
    	      v2q0q2 = 2.0 * q0 * q2;
    	      v2q2q3 = 2.0 * q2 * q3;
    	      q0q0 = q0 * q0;
    	      q0q1 = q0 * q1;
    	      q0q2 = q0 * q2;
    	      q0q3 = q0 * q3;
    	      q1q1 = q1 * q1;
    	      q1q2 = q1 * q2;
    	      q1q3 = q1 * q3;
    	      q2q2 = q2 * q2;
    	      q2q3 = q2 * q3;
    	      q3q3 = q3 * q3;
    	      hx = mx * q0q0 - v2q0my * q3 + v2q0mz * q2 + mx * q1q1 + v2q1 * my * q2 + v2q1 * mz * q3 - mx * q2q2 - mx * q3q3;
    	      hy = v2q0mx * q3 + my * q0q0 - v2q0mz * q1 + v2q1mx * q2 - my * q1q1 + my * q2q2 + v2q2 * mz * q3 - my * q3q3;
    	      v2bx = Math.sqrt(hx * hx + hy * hy);
    	      v2bz = -v2q0mx * q2 + v2q0my * q1 + mz * q0q0 + v2q1mx * q3 - mz * q1q1 + v2q2 * my * q3 - mz * q2q2 + mz * q3q3;
    	      v4bx = 2.0 * v2bx;
    	      v4bz = 2.0 * v2bz;
    	      s0 =
    	        -v2q2 * (2.0 * q1q3 - v2q0q2 - ax) +
    	        v2q1 * (2.0 * q0q1 + v2q2q3 - ay) -
    	        v2bz * q2 * (v2bx * (0.5 - q2q2 - q3q3) + v2bz * (q1q3 - q0q2) - mx) +
    	        (-v2bx * q3 + v2bz * q1) * (v2bx * (q1q2 - q0q3) + v2bz * (q0q1 + q2q3) - my) +
    	        v2bx * q2 * (v2bx * (q0q2 + q1q3) + v2bz * (0.5 - q1q1 - q2q2) - mz);
    	      s1 =
    	        v2q3 * (2.0 * q1q3 - v2q0q2 - ax) +
    	        v2q0 * (2.0 * q0q1 + v2q2q3 - ay) -
    	        4.0 * q1 * (1 - 2.0 * q1q1 - 2.0 * q2q2 - az) +
    	        v2bz * q3 * (v2bx * (0.5 - q2q2 - q3q3) + v2bz * (q1q3 - q0q2) - mx) +
    	        (v2bx * q2 + v2bz * q0) * (v2bx * (q1q2 - q0q3) + v2bz * (q0q1 + q2q3) - my) +
    	        (v2bx * q3 - v4bz * q1) * (v2bx * (q0q2 + q1q3) + v2bz * (0.5 - q1q1 - q2q2) - mz);
    	      s2 =
    	        -v2q0 * (2.0 * q1q3 - v2q0q2 - ax) +
    	        v2q3 * (2.0 * q0q1 + v2q2q3 - ay) -
    	        4.0 * q2 * (1 - 2.0 * q1q1 - 2.0 * q2q2 - az) +
    	        (-v4bx * q2 - v2bz * q0) * (v2bx * (0.5 - q2q2 - q3q3) + v2bz * (q1q3 - q0q2) - mx) +
    	        (v2bx * q1 + v2bz * q3) * (v2bx * (q1q2 - q0q3) + v2bz * (q0q1 + q2q3) - my) +
    	        (v2bx * q0 - v4bz * q2) * (v2bx * (q0q2 + q1q3) + v2bz * (0.5 - q1q1 - q2q2) - mz);
    	      s3 =
    	        v2q1 * (2.0 * q1q3 - v2q0q2 - ax) +
    	        v2q2 * (2.0 * q0q1 + v2q2q3 - ay) +
    	        (-v4bx * q3 + v2bz * q1) * (v2bx * (0.5 - q2q2 - q3q3) + v2bz * (q1q3 - q0q2) - mx) +
    	        (-v2bx * q0 + v2bz * q2) * (v2bx * (q1q2 - q0q3) + v2bz * (q0q1 + q2q3) - my) +
    	        v2bx * q1 * (v2bx * (q0q2 + q1q3) + v2bz * (0.5 - q1q1 - q2q2) - mz);
    	      recipNorm = (s0 * s0 + s1 * s1 + s2 * s2 + s3 * s3) ** -0.5;
    	      s0 *= recipNorm;
    	      s1 *= recipNorm;
    	      s2 *= recipNorm;
    	      s3 *= recipNorm;
    	      qDot1 -= beta * s0;
    	      qDot2 -= beta * s1;
    	      qDot3 -= beta * s2;
    	      qDot4 -= beta * s3;
    	    }
    	    q0 += qDot1 * recipSampleFreq;
    	    q1 += qDot2 * recipSampleFreq;
    	    q2 += qDot3 * recipSampleFreq;
    	    q3 += qDot4 * recipSampleFreq;
    	    recipNorm = (q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3) ** -0.5;
    	    q0 *= recipNorm;
    	    q1 *= recipNorm;
    	    q2 *= recipNorm;
    	    q3 *= recipNorm;
    	  }
    	  return {
    	    update: madgwickAHRSUpdate,
    	    init,
    	    getQuaternion() {
    	      return {
    	        w: q0,
    	        x: q1,
    	        y: q2,
    	        z: q3,
    	      };
    	    },
    	  };
    	};
    	return Madgwick;
    }

    const rad2deg = 180.0 / Math.PI;
    function AHRS(options) {
      options = options || {};
      const sampleInterval = options.sampleInterval || 20;
      const algorithmName = options.algorithm || 'Madgwick';
      let Req;
      if (algorithmName === 'Mahony') {
        Req = requireMahony();
      } else if (algorithmName === 'Madgwick') {
        Req = requireMadgwick();
      } else {
        throw new Error(`AHRS(): Algorithm not valid: ${algorithmName}`);
      }
      const algorithmFn = Req(sampleInterval, options);
      const self = this;
      Object.keys(algorithmFn).forEach(prop => self[prop] = algorithmFn[prop]);
    }
    AHRS.prototype.toVector = function toVector() {
      const q = this.getQuaternion();
      const angle = 2 * Math.acos(q.w);
      const sinAngle = Math.sin(angle / 2);
      return {
        angle,
        x: q.x / sinAngle,
        y: q.y / sinAngle,
        z: q.z / sinAngle,
      };
    };
    AHRS.prototype.getEulerAngles = function getEulerAngles() {
      const q = this.getQuaternion();
      const ww = q.w * q.w,
        xx = q.x * q.x,
        yy = q.y * q.y,
        zz = q.z * q.z;
      return {
        heading: Math.atan2(2 * (q.x * q.y + q.z * q.w), xx - yy - zz + ww),
        pitch: -Math.asin(2 * (q.x * q.z - q.y * q.w)),
        roll: Math.atan2(2 * (q.y * q.z + q.x * q.w), -xx - yy + zz + ww),
      };
    };
    AHRS.prototype.getEulerAnglesDegrees = function getEulerAnglesDegrees() {
      const getEulerAnglesRad = this.getEulerAngles();
      return {
        heading: getEulerAnglesRad.heading * rad2deg,
        pitch: getEulerAnglesRad.pitch * rad2deg,
        roll: getEulerAnglesRad.roll * rad2deg,
      };
    };
    var ahrs = AHRS;
    var AHRS$1 = getDefaultExportFromCjs(ahrs);

    const DEG2RAD = Math.PI / 180;
    function degToRad( degrees ) {
    	return degrees * DEG2RAD;
    }

    var _RawSensorManager_instances, _RawSensorManager_dispatchEvent_get, _RawSensorManager_ahrs, _RawSensorManager_latestImuTimestamp, _RawSensorManager_parseWhole, _RawSensorManager_parseSingle, _RawSensorManager_updateAHRS;
    const _console$b = createConsole("RawSensorManager");
    const RawSensorMessageTypes = ["rawSensor"];
    const RawSensorEventTypes = [...RawSensorMessageTypes, ...RawSensorDataTypes, "orientation"];
    class RawSensorManager {
        constructor() {
            _RawSensorManager_instances.add(this);
            _RawSensorManager_ahrs.set(this, new AHRS$1({ sampleInterval: 18, algorithm: "Madgwick" }));
            _RawSensorManager_latestImuTimestamp.set(this, 0);
            this.calculateOrientation = false;
            autoBind(this);
        }
        parseMessage(messageType, dataView) {
            _console$b.log({ messageType });
            switch (messageType) {
                case "rawSensor":
                    __classPrivateFieldGet(this, _RawSensorManager_instances, "m", _RawSensorManager_parseWhole).call(this, dataView);
                    break;
                default:
                    throw Error(`uncaught messageType ${messageType}`);
            }
        }
        clear() {
            __classPrivateFieldSet(this, _RawSensorManager_latestImuTimestamp, 0, "f");
        }
    }
    _RawSensorManager_ahrs = new WeakMap(), _RawSensorManager_latestImuTimestamp = new WeakMap(), _RawSensorManager_instances = new WeakSet(), _RawSensorManager_dispatchEvent_get = function _RawSensorManager_dispatchEvent_get() {
        return this.eventDispatcher.dispatchEvent;
    }, _RawSensorManager_parseWhole = function _RawSensorManager_parseWhole(dataView) {
        _console$b.log("parsing whole", dataView);
        let offset = 0;
        while (offset + 4 < dataView.byteLength) {
            const rawValue = dataView.getUint32(0, true);
            offset += 4;
            _console$b.log({ rawValue });
            const firstBit = (rawValue & 0x80000000) >> 31;
            const timestamp = rawValue & 0x7fffffff;
            _console$b.log({ firstBit, timestamp });
            if (timestamp == 0) {
                break;
            }
            const sensorDataType = firstBit == 0 ? "imu" : "device";
            _console$b.log({ sensorDataType });
            const sensorDataLength = RawSensorDataLength[sensorDataType];
            _console$b.log({ sensorDataLength });
            if (sensorDataLength == 0) {
                break;
            }
            const sensorData = sliceDataView(dataView, offset, sensorDataLength);
            if (sensorData.byteLength == sensorDataLength) {
                __classPrivateFieldGet(this, _RawSensorManager_instances, "m", _RawSensorManager_parseSingle).call(this, sensorDataType, timestamp, sensorData);
            }
            offset += sensorDataLength;
        }
    }, _RawSensorManager_parseSingle = function _RawSensorManager_parseSingle(sensorDataType, timestamp, sensorData) {
        _console$b.log(`parsing ${sensorDataType} ${timestamp}ms`, sensorData);
        let rawSensorType = sensorDataType == "device" ? "deviceAccelerometer" : "imuGyroscope";
        const vectors = [];
        for (let offset = 0; offset < sensorData.byteLength; offset += 6) {
            const sensitivityFactorIndex = this.sensitivity[rawSensorType];
            const sensitivityFactor = RawSensorSensitivityFactors[rawSensorType][sensitivityFactorIndex];
            const [z, y, x] = [
                -sensorData.getInt16(offset + 0, true),
                sensorData.getInt16(offset + 2, true),
                sensorData.getInt16(offset + 4, true),
            ].map((value) => value * sensitivityFactor * 0.001);
            _console$b.log({ x, y, z });
            const vector = { x, y, z };
            _console$b.log("vector", vector);
            vectors.push(vector);
            if (sensorDataType == "imu") {
                rawSensorType = "imuAccelerometer";
            }
        }
        let validNumberOfVectors = 0;
        switch (sensorDataType) {
            case "imu":
                validNumberOfVectors = 2;
                break;
            case "device":
                validNumberOfVectors = 5;
                break;
        }
        if (vectors.length != validNumberOfVectors) {
            _console$b.log(`invalid number of ${sensorDataType} vectors (expected ${validNumberOfVectors}, get ${vectors.length})`);
            return;
        }
        const message = { sensorDataType, timestamp };
        switch (message.sensorDataType) {
            case "imu":
                message.accelerometer = vectors[RawSensorImuTypes.indexOf("accelerometer")];
                message.gyroscope = vectors[RawSensorImuTypes.indexOf("gyroscope")];
                if (this.calculateOrientation && __classPrivateFieldGet(this, _RawSensorManager_latestImuTimestamp, "f") != timestamp) {
                    __classPrivateFieldSet(this, _RawSensorManager_latestImuTimestamp, timestamp, "f");
                    const timestampDelta = __classPrivateFieldGet(this, _RawSensorManager_latestImuTimestamp, "f") == 0 ? 55 : timestamp - __classPrivateFieldGet(this, _RawSensorManager_latestImuTimestamp, "f");
                    __classPrivateFieldGet(this, _RawSensorManager_instances, "m", _RawSensorManager_updateAHRS).call(this, message.accelerometer, message.gyroscope, timestampDelta);
                    const quaternion = __classPrivateFieldGet(this, _RawSensorManager_ahrs, "f").getQuaternion();
                    const euler = __classPrivateFieldGet(this, _RawSensorManager_ahrs, "f").getEulerAngles();
                    __classPrivateFieldGet(this, _RawSensorManager_instances, "a", _RawSensorManager_dispatchEvent_get).call(this, "orientation", { quaternion, euler, timestamp });
                }
                break;
            case "device":
                message.fingers = {};
                RawSensorFingers.forEach((finger, index) => {
                    message.fingers[finger] = vectors[index];
                });
                break;
        }
        __classPrivateFieldGet(this, _RawSensorManager_instances, "a", _RawSensorManager_dispatchEvent_get).call(this, sensorDataType, message);
        __classPrivateFieldGet(this, _RawSensorManager_instances, "a", _RawSensorManager_dispatchEvent_get).call(this, "rawSensor", message);
    }, _RawSensorManager_updateAHRS = function _RawSensorManager_updateAHRS(accelerometer, gyroscope, timestampDelta) {
        _console$b.log("updating ahrs...");
        __classPrivateFieldGet(this, _RawSensorManager_ahrs, "f").update(degToRad(gyroscope.x), degToRad(gyroscope.y), degToRad(gyroscope.z), accelerometer.x, accelerometer.y, accelerometer.z, undefined, undefined, undefined, timestampDelta / 1000);
    };

    var _TxManager_instances, _TxManager_eventDispatcher, _TxManager_rawSensorManager;
    const _console$a = createConsole("TxManager");
    const TxMessageTypes = ["tx", ...RawSensorMessageTypes];
    const TxEventTypes = [...RawSensorEventTypes];
    class TxManager {
        get eventDispatcher() {
            return __classPrivateFieldGet(this, _TxManager_eventDispatcher, "f");
        }
        set eventDispatcher(newEventDispatcher) {
            __classPrivateFieldSet(this, _TxManager_eventDispatcher, newEventDispatcher, "f");
            __classPrivateFieldGet(this, _TxManager_rawSensorManager, "f").eventDispatcher = newEventDispatcher;
        }
        set rawSensorSensitivity(sensitivity) {
            __classPrivateFieldGet(this, _TxManager_rawSensorManager, "f").sensitivity = sensitivity;
        }
        constructor() {
            _TxManager_instances.add(this);
            _TxManager_eventDispatcher.set(this, void 0);
            _TxManager_rawSensorManager.set(this, new RawSensorManager());
            autoBind(this);
        }
        parseMessage(messageType, dataView) {
            _console$a.log({ messageType });
            switch (messageType) {
                case "tx":
                    __classPrivateFieldGet(this, _TxManager_rawSensorManager, "f").parseMessage("rawSensor", dataView);
                    break;
                default:
                    throw Error(`uncaught messageType ${messageType}`);
            }
        }
        get calculateOrientation() {
            return __classPrivateFieldGet(this, _TxManager_rawSensorManager, "f").calculateOrientation;
        }
        set calculateOrientation(newValue) {
            __classPrivateFieldGet(this, _TxManager_rawSensorManager, "f").calculateOrientation = newValue;
        }
        clear() {
            __classPrivateFieldGet(this, _TxManager_rawSensorManager, "f").clear();
        }
    }
    _TxManager_eventDispatcher = new WeakMap(), _TxManager_rawSensorManager = new WeakMap(), _TxManager_instances = new WeakSet();

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

    const _console$7 = createConsole("bluetoothUUIDs", { log: false });
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
            case "airGesture":
            case "unknown8":
            case "unknownB":
            case "unknownC":
            case "unknownD":
            case "tx":
                properties.notify = true;
                break;
        }
        switch (characteristicName) {
            case "airGesture":
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
                case "tapData":
                case "mouseData":
                case "airGesture":
                case "tx":
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

    var _InputManager_instances, _InputManager_sensitivity, _InputManager_mode, _InputManager_assertValidMode, _InputManager_createData, _InputManager_timer, _InputManager_sendModeData;
    const _console$2 = createConsole("InputManager");
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
            Object.assign(__classPrivateFieldGet(this, _InputManager_sensitivity, "f"), newSensitivity);
        }
        setSensitivityForType(rawSensorType, index) {
            assertValidRawSensorSensitivityForType(rawSensorType, index);
            _console$2.log(`setting ${rawSensorType} sensitivity index to ${index}`);
            __classPrivateFieldGet(this, _InputManager_sensitivity, "f")[rawSensorType] = index;
            __classPrivateFieldGet(this, _InputManager_timer, "f").restart(true);
        }
        get mode() {
            return __classPrivateFieldGet(this, _InputManager_mode, "f");
        }
        set mode(newMode) {
            __classPrivateFieldGet(this, _InputManager_instances, "m", _InputManager_assertValidMode).call(this, newMode);
            if (this.mode == newMode) {
                _console$2.log(`redundant mode assignment "${newMode}"`);
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
        _console$2.assertEnumWithError(mode, InputModes);
    }, _InputManager_createData = function _InputManager_createData() {
        const modeByte = InputModeBytes[this.mode];
        let sensitivityFactorIndices = [];
        if (this.mode == "rawSensor") {
            _console$2.assertWithError(this.sensitivity, "no sensitivity defined for rawSensor input mode");
            assertValidRawSensorSensitivity(this.sensitivity);
            RawSensorTypes.forEach((rawSensorType) => {
                sensitivityFactorIndices.push(this.sensitivity[rawSensorType]);
            });
        }
        const data = concatenateArrayBuffers(0x3, 0xc, 0x0, modeByte, ...sensitivityFactorIndices);
        return data;
    }, _InputManager_sendModeData = function _InputManager_sendModeData() {
        _console$2.log("sending mode data...");
        const data = __classPrivateFieldGet(this, _InputManager_instances, "m", _InputManager_createData).call(this);
        this.sendRxData(data);
    };

    var _XRStateManager_instances, _XRStateManager_state, _XRStateManager_assertValidState, _XRStateManager_createData, _XRStateManager_timer, _XRStateManager_sendStateData;
    const _console$1 = createConsole("XRStateManager");
    const XRStates = ["user", "airMouse", "tapping", "dontSend"];
    const XRStateBytes = {
        user: 0x3,
        airMouse: 0x1,
        tapping: 0x2,
    };
    class XRStateManager {
        constructor() {
            _XRStateManager_instances.add(this);
            _XRStateManager_state.set(this, "user");
            _XRStateManager_timer.set(this, new Timer(__classPrivateFieldGet(this, _XRStateManager_instances, "m", _XRStateManager_sendStateData).bind(this), 10 * 1000));
            autoBind(this);
        }
        get state() {
            return __classPrivateFieldGet(this, _XRStateManager_state, "f");
        }
        set state(newState) {
            __classPrivateFieldGet(this, _XRStateManager_instances, "m", _XRStateManager_assertValidState).call(this, newState);
            if (this.state == newState) {
                _console$1.log(`redundant state assignment "${newState}"`);
                return;
            }
            __classPrivateFieldSet(this, _XRStateManager_state, newState, "f");
            if (__classPrivateFieldGet(this, _XRStateManager_timer, "f").isRunning) {
                __classPrivateFieldGet(this, _XRStateManager_timer, "f").restart(true);
            }
        }
        setState(newState) {
            this.state = newState;
        }
        start() {
            __classPrivateFieldGet(this, _XRStateManager_timer, "f").start(true);
        }
        stop() {
            __classPrivateFieldGet(this, _XRStateManager_timer, "f").stop();
        }
    }
    _XRStateManager_state = new WeakMap(), _XRStateManager_timer = new WeakMap(), _XRStateManager_instances = new WeakSet(), _XRStateManager_assertValidState = function _XRStateManager_assertValidState(state) {
        _console$1.assertEnumWithError(state, XRStates);
    }, _XRStateManager_createData = function _XRStateManager_createData() {
        const stateByte = XRStateBytes[this.state];
        _console$1.assert(stateByte != undefined, `no stateByte found for state "${this.state}"`);
        const data = concatenateArrayBuffers(0x3, 0xd, 0x0, stateByte);
        return data;
    }, _XRStateManager_sendStateData = function _XRStateManager_sendStateData() {
        if (this.state == "dontSend") {
            return;
        }
        _console$1.log("sending state data...");
        const data = __classPrivateFieldGet(this, _XRStateManager_instances, "m", _XRStateManager_createData).call(this);
        this.sendRxData(data);
    };

    var _Device_instances, _a, _Device_DefaultConnectionManager, _Device_eventDispatcher, _Device_dispatchEvent_get, _Device_connectionManager, _Device_sendUICommandsData, _Device_sendRxData, _Device_isConnected, _Device_assertIsConnected, _Device_assertCanReconnect, _Device_ReconnectOnDisconnection, _Device_reconnectOnDisconnection, _Device_reconnectIntervalId, _Device_onConnectionStatusUpdated, _Device_dispatchConnectionEvents, _Device_checkConnection, _Device_clear, _Device_onConnectionMessageReceived, _Device_onConnectionMessagesReceived, _Device_deviceInformationManager, _Device_batteryLevel, _Device_updateBatteryLevel, _Device_inputManager, _Device_xrStateManager, _Device_tapDataManager, _Device_mouseDataManager, _Device_airGestureManager, _Device_txManager, _Device_vibrationManager, _Device_isServerSide;
    const _console = createConsole("Device", { log: true });
    const DeviceEventTypes = [
        "connectionMessage",
        ...ConnectionEventTypes,
        ...BatteryLevelMessageTypes,
        ...DeviceInformationEventTypes,
        ...TapDataEventTypes,
        ...MouseDataEventTypes,
        ...AirGestureEventTypes,
        ...TxEventTypes,
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
            _Device_xrStateManager.set(this, new XRStateManager());
            _Device_tapDataManager.set(this, new TapDataManager());
            _Device_mouseDataManager.set(this, new MouseDataManager());
            _Device_airGestureManager.set(this, new AirGestureManager());
            _Device_txManager.set(this, new TxManager());
            _Device_vibrationManager.set(this, new VibrationManager());
            _Device_isServerSide.set(this, false);
            __classPrivateFieldGet(this, _Device_deviceInformationManager, "f").eventDispatcher = __classPrivateFieldGet(this, _Device_eventDispatcher, "f");
            __classPrivateFieldGet(this, _Device_inputManager, "f").sendRxData = this.sendRxData;
            __classPrivateFieldGet(this, _Device_xrStateManager, "f").sendRxData = this.sendRxData;
            __classPrivateFieldGet(this, _Device_tapDataManager, "f").eventDispatcher = __classPrivateFieldGet(this, _Device_eventDispatcher, "f");
            __classPrivateFieldGet(this, _Device_mouseDataManager, "f").eventDispatcher = __classPrivateFieldGet(this, _Device_eventDispatcher, "f");
            __classPrivateFieldGet(this, _Device_airGestureManager, "f").eventDispatcher = __classPrivateFieldGet(this, _Device_eventDispatcher, "f");
            __classPrivateFieldGet(this, _Device_txManager, "f").eventDispatcher = __classPrivateFieldGet(this, _Device_eventDispatcher, "f");
            __classPrivateFieldGet(this, _Device_vibrationManager, "f").sendUICommandsData = this.sendUICommandsData;
            __classPrivateFieldGet(this, _Device_txManager, "f").rawSensorSensitivity = __classPrivateFieldGet(this, _Device_inputManager, "f").sensitivity;
            this.addEventListener("hardwareRevision", () => {
            });
            this.addEventListener("isInAirGestureState", (event) => {
                __classPrivateFieldGet(this, _Device_tapDataManager, "f").isInAirGestureState = event.message.isInAirGestureState;
            });
            this.addEventListener("isConnected", () => {
                if (this.isConnected) {
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _Device_inputManager, "f").start();
                    }, 0);
                    setTimeout(() => {
                    }, 20);
                }
                else {
                    __classPrivateFieldGet(this, _Device_inputManager, "f").stop();
                    __classPrivateFieldGet(this, _Device_xrStateManager, "f").stop();
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
        get inputMode() {
            return __classPrivateFieldGet(this, _Device_inputManager, "f").mode;
        }
        set inputMode(newInputMode) {
            this.setInputMode(newInputMode);
        }
        get setInputMode() {
            return __classPrivateFieldGet(this, _Device_inputManager, "f").setMode;
        }
        get setSensitivityForType() {
            return __classPrivateFieldGet(this, _Device_inputManager, "f").setSensitivityForType;
        }
        get xrState() {
            return __classPrivateFieldGet(this, _Device_xrStateManager, "f").state;
        }
        set xrState(newXrState) {
            this.setXRState(newXrState);
        }
        get setXRState() {
            return __classPrivateFieldGet(this, _Device_xrStateManager, "f").setState;
        }
        get calculateOrientation() {
            return __classPrivateFieldGet(this, _Device_txManager, "f").calculateOrientation;
        }
        set calculateOrientation(newValue) {
            __classPrivateFieldGet(this, _Device_txManager, "f").calculateOrientation = newValue;
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
    _a = Device, _Device_eventDispatcher = new WeakMap(), _Device_connectionManager = new WeakMap(), _Device_isConnected = new WeakMap(), _Device_reconnectOnDisconnection = new WeakMap(), _Device_reconnectIntervalId = new WeakMap(), _Device_deviceInformationManager = new WeakMap(), _Device_batteryLevel = new WeakMap(), _Device_inputManager = new WeakMap(), _Device_xrStateManager = new WeakMap(), _Device_tapDataManager = new WeakMap(), _Device_mouseDataManager = new WeakMap(), _Device_airGestureManager = new WeakMap(), _Device_txManager = new WeakMap(), _Device_vibrationManager = new WeakMap(), _Device_isServerSide = new WeakMap(), _Device_instances = new WeakSet(), _Device_DefaultConnectionManager = function _Device_DefaultConnectionManager() {
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
        __classPrivateFieldGet(this, _Device_txManager, "f").clear();
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
                else if (TapDataMessageTypes.includes(messageType)) {
                    __classPrivateFieldGet(this, _Device_tapDataManager, "f").parseMessage(messageType, dataView);
                }
                else if (MouseDataMessageTypes.includes(messageType)) {
                    __classPrivateFieldGet(this, _Device_mouseDataManager, "f").parseMessage(messageType, dataView);
                }
                else if (AirGestureMessageTypes.includes(messageType)) {
                    __classPrivateFieldGet(this, _Device_airGestureManager, "f").parseMessage(messageType, dataView);
                }
                else if (TxMessageTypes.includes(messageType)) {
                    __classPrivateFieldGet(this, _Device_txManager, "f").parseMessage(messageType, dataView);
                }
                else {
                    throw Error(`uncaught messageType "${messageType}"`);
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

    exports.Device = Device;
    exports.DeviceManager = DeviceManager$1;
    exports.Environment = environment;
    exports.InputModes = InputModes;
    exports.MaxNumberOfVibrationSegments = MaxNumberOfVibrationSegments;
    exports.MaxNumberOfVibrations = MaxNumberOfVibrations;
    exports.RangeHelper = RangeHelper;
    exports.RawSensorSensitivityFactors = RawSensorSensitivityFactors;
    exports.RawSensorTypes = RawSensorTypes;
    exports.XRStates = XRStates;
    exports.setAllConsoleLevelFlags = setAllConsoleLevelFlags;
    exports.setConsoleLevelFlagsForType = setConsoleLevelFlagsForType;

}));
//# sourceMappingURL=tapstrap.ls.js.map
