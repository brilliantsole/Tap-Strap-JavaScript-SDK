export declare const AirGestures: readonly ["oneFingerUp", "twoFingersUp", "oneFingerDown", "twoFingersDown", "oneFingerLeft", "twoFingersLeft", "oneFingerRight", "twoFingersRight", "indexToThumbTouch", "middleToThumbTouch", "xrAirGestureNone", "xrAirGestureThumbIndex", "xrAirGestureThumbMiddle"];
export type AirGesture = (typeof AirGestures)[number];
export declare const AirGestureEnum: {
    [airGesture in AirGesture]: number;
};
export declare const AirGestureEnumLookup: {
    [key: number]: AirGesture;
};
export declare const XRGestureStates: readonly ["none", "thumbIndex", "thumbMiddle"];
export type XRGestureState = (typeof XRGestureStates)[number];
export declare const XRGestureStateEnum: {
    [xrGesture in XRGestureState]: number;
};
export declare const XRAirGestures: readonly ["clickIndex", "clickMiddle", "dragIndex", "dragMiddle", "drop", "potentialDragOrClickIndex", "potentialDragOrClickMiddle"];
export type XRAirGesture = (typeof XRAirGestures)[number];
export declare const XRAirGestureEnum: {
    [xrAirGesture in XRAirGesture]: number;
};
export declare const XRAirGestureEnumLookup: {
    [key: number]: XRAirGesture;
};
