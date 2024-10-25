export const AirGestures = [
  "oneFingerUp",
  "twoFingersUp",
  "oneFingerDown",
  "twoFingersDown",
  "oneFingerLeft",
  "twoFingersLeft",
  "oneFingerRight",
  "twoFingersRight",
  "indexToThumbTouch",
  "middleToThumbTouch",
  "xrAirGestureNone",
  "xrAirGestureThumbIndex",
  "xrAirGestureThumbMiddle",
] as const;
export type AirGesture = (typeof AirGestures)[number];
export function tapByteToAirGesture(tapByte: number): AirGesture | undefined {
  switch (tapByte) {
    case 2:
      return "indexToThumbTouch";
    case 4:
      return "middleToThumbTouch";
  }
}

export const AirGestureEnum: { [airGesture in AirGesture]: number } = {
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
// @ts-ignore
export const AirGestureEnumLookup: { [key: number]: AirGesture } = {};
Object.keys(AirGestureEnum).forEach((airGesture) => {
  // @ts-ignore
  AirGestureEnumLookup[airGesture] = AirGestureEnum[airGesture];
});

export const XRGestureStates = ["none", "thumbIndex", "thumbMiddle"] as const;
export type XRGestureState = (typeof XRGestureStates)[number];
export const XRGestureStateEnum: { [xrGesture in XRGestureState]: number } = {
  none: 100,
  thumbIndex: 101,
  thumbMiddle: 102,
};

export const XRAirGestures = [
  "clickIndex",
  "clickMiddle",
  "dragIndex",
  "dragMiddle",
  "drop",
  "potentialDragOrClickIndex",
  "potentialDragOrClickMiddle",
] as const;
export type XRAirGesture = (typeof XRAirGestures)[number];
export const XRAirGestureEnum: { [xrAirGesture in XRAirGesture]: number } = {
  clickIndex: 1,
  clickMiddle: 2, // not implemented
  dragIndex: 3,
  dragMiddle: 4,
  drop: 5,
  potentialDragOrClickIndex: 6,
  potentialDragOrClickMiddle: 7,
};
// @ts-ignore
export const XRAirGestureEnumLookup: { [key: number]: XRAirGesture } = {};
Object.keys(XRAirGestureEnum).forEach((xrAirGesture) => {
  // @ts-ignore
  XRAirGestureEnumLookup[xrAirGesture] = XRAirGestureEnum[xrAirGesture];
});
