import * as TS from "../../build/tapstrap.module.js";
window.TS = TS;
console.log(TS);

const device = new TS.Device();
console.log({ device });
window.device = device;

//TS.setAllConsoleLevelFlags({ log: false });

// GET DEVICES
/** @type {HTMLTemplateElement} */
const availableDeviceTemplate = document.getElementById("availableDeviceTemplate");
const availableDevicesContainer = document.getElementById("availableDevices");
/** @param {TS.Device[]} availableDevices */
function onAvailableDevices(availableDevices) {
  availableDevicesContainer.innerHTML = "";
  if (availableDevices.length == 0) {
    availableDevicesContainer.innerText = "no devices available";
  } else {
    availableDevices.forEach((availableDevice) => {
      const availableDeviceContainer = availableDeviceTemplate.content
        .cloneNode(true)
        .querySelector(".availableDevice");
      availableDeviceContainer.querySelector(".name").innerText = availableDevice.name;

      /** @type {HTMLButtonElement} */
      const toggleConnectionButton = availableDeviceContainer.querySelector(".toggleConnection");
      toggleConnectionButton.addEventListener("click", () => {
        device.connectionManager = availableDevice.connectionManager;
        device.reconnect();
      });
      device.addEventListener("connectionStatus", () => {
        toggleConnectionButton.disabled = device.connectionStatus != "notConnected";
      });
      toggleConnectionButton.disabled = device.connectionStatus != "notConnected";

      availableDevicesContainer.appendChild(availableDeviceContainer);
    });
  }
}
async function getDevices() {
  const availableDevices = await TS.DeviceManager.GetDevices();
  if (!availableDevices) {
    return;
  }
  onAvailableDevices(availableDevices);
}

TS.DeviceManager.AddEventListener("availableDevices", (event) => {
  const devices = event.message.availableDevices;
  onAvailableDevices(devices);
});
getDevices();

// CONNECTION

/** @type {HTMLButtonElement} */
const toggleConnectionButton = document.getElementById("toggleConnection");
toggleConnectionButton.addEventListener("click", () => {
  switch (device.connectionStatus) {
    case "notConnected":
      device.connect();
      break;
    case "connected":
      device.disconnect();
      break;
  }
});

/** @type {HTMLButtonElement} */
const reconnectButton = document.getElementById("reconnect");
reconnectButton.addEventListener("click", () => {
  device.reconnect();
});
device.addEventListener("connectionStatus", () => {
  reconnectButton.disabled = !device.canReconnect;
});

device.addEventListener("connectionStatus", () => {
  switch (device.connectionStatus) {
    case "connected":
    case "notConnected":
      toggleConnectionButton.disabled = false;
      toggleConnectionButton.innerText = device.isConnected ? "disconnect" : "connect";
      break;
    case "connecting":
    case "disconnecting":
      toggleConnectionButton.disabled = true;
      toggleConnectionButton.innerText = device.connectionStatus;
      break;
  }
});

/** @type {HTMLInputElement} */
const reconnectOnDisconnectionCheckbox = document.getElementById("reconnectOnDisconnection");
reconnectOnDisconnectionCheckbox.addEventListener("input", () => {
  device.reconnectOnDisconnection = reconnectOnDisconnectionCheckbox.checked;
});

// DEVICE INFORMATION

/** @type {HTMLPreElement} */
const deviceInformationPre = document.getElementById("deviceInformationPre");
device.addEventListener("deviceInformation", () => {
  deviceInformationPre.textContent = JSON.stringify(device.deviceInformation, null, 2);
});

// BATTERY LEVEL

/** @type {HTMLSpanElement} */
const batteryLevelSpan = document.getElementById("batteryLevel");
device.addEventListener("batteryLevel", () => {
  console.log(`batteryLevel updated to ${device.batteryLevel}%`);
  batteryLevelSpan.innerText = `${device.batteryLevel}%`;
});

// NAME

/** @type {HTMLSpanElement} */
const nameSpan = document.getElementById("name");
device.addEventListener("isConnected", () => {
  nameSpan.innerText = device.name;
});

// INPUT MODE

/** @type {HTMLSelectElement} */
const inputModeSelect = document.getElementById("inputMode");
const inputModeOptgroup = inputModeSelect.querySelector("optgroup");
TS.InputModes.forEach((inputMode) => {
  inputModeOptgroup.appendChild(new Option(inputMode));
});
inputModeSelect.addEventListener("input", () => {
  device.setInputMode(inputModeSelect.value);
});

/** @type {HTMLTemplateElement} */
const rawSensorSensitivityTemplate = document.getElementById("rawSensorSensitivityTemplate");
TS.RawSensorTypes.forEach((rawSensorType) => {
  const rawSensorSensitivityContainer = rawSensorSensitivityTemplate.content
    .cloneNode(true)
    .querySelector(".rawSensorSensitivity");
  /** @type {HTMLSelectElement} */
  const sensitivitySelect = rawSensorSensitivityContainer.querySelector(".sensitivity");
  const sensitivityOptgroup = sensitivitySelect.querySelector("optgroup");
  TS.RawSensorSensitivityFactors[rawSensorType].forEach((sensitivity, index) => {
    sensitivityOptgroup.appendChild(new Option(sensitivity, index));
  });
  sensitivitySelect.addEventListener("input", () => {
    device.setSensitivityForType(rawSensorType, Number(sensitivitySelect.value));
  });
  rawSensorSensitivityContainer.querySelector(".rawSensorType").innerText = rawSensorType;
  rawSensorSensitivityTemplate.parentElement.appendChild(rawSensorSensitivityContainer);
});

// XR STATE

/** @type {HTMLSelectElement} */
const xrStateSelect = document.getElementById("xrState");
const xrStateOptgroup = xrStateSelect.querySelector("optgroup");
TS.XRStates.forEach((xrState) => {
  xrStateOptgroup.appendChild(new Option(xrState));
});
xrStateSelect.addEventListener("input", () => {
  device.setXRState(xrStateSelect.value);
});

// TAP DATA

/** @type {HTMLPreElement} */
const tapDataPre = document.getElementById("tapDataPre");
device.addEventListener("tapData", (event) => {
  tapDataPre.textContent = JSON.stringify(event.message, null, 2);
});

/** @type {HTMLPreElement} */
const tapAirGesturePre = document.getElementById("tapAirGesturePre");
device.addEventListener("tapAirGesture", (event) => {
  tapAirGesturePre.textContent = JSON.stringify(event.message, null, 2);
});

// AIR GESTURE

/** @type {HTMLPreElement} */
const airGesturePre = document.getElementById("airGesturePre");
device.addEventListener("airGesture", (event) => {
  airGesturePre.textContent = JSON.stringify(event.message, null, 2);
});

/** @type {HTMLPreElement} */
const xrAirGesturePre = document.getElementById("xrAirGesturePre");
device.addEventListener("xrAirGesture", (event) => {
  xrAirGesturePre.textContent = JSON.stringify(event.message, null, 2);
});

// MOUSE DATA

/** @type {HTMLPreElement} */
const mouseDataPre = document.getElementById("mouseDataPre");
device.addEventListener("mouseData", (event) => {
  mouseDataPre.textContent = JSON.stringify(event.message, null, 2);
});

// RAW SENSOR

/** @type {HTMLPreElement} */
const rawSensorDataPre = document.getElementById("rawSensorDataPre");
device.addEventListener("rawSensor", (event) => {
  rawSensorDataPre.textContent = JSON.stringify(event.message, null, 2);
});

// VIBRATION

device.addEventListener("connected", () => {
  device.vibrate([200, 100, 100, 20, 100, 20]);
});

/** @type {HTMLElement[]} */
const vibrationSegmentContainers = [];

const vibrationSegmentsContainer = document.getElementById("vibrationSegments");
/** @type {HTMLTemplateElement} */
const vibratonSegmentTemplate = document.getElementById("vibrationSegmentTemplate");

function addVibrationSegment() {
  if (vibrationSegmentContainers.length >= TS.MaxNumberOfVibrationSegments) {
    return;
  }

  const vibrationSegmentContainer = vibratonSegmentTemplate.content.cloneNode(true).querySelector(".vibrationSegment");
  vibrationSegmentContainers.push(vibrationSegmentContainer);

  const vibrationDurationInput = vibrationSegmentContainer.querySelector(".vibrationDuration");
  const vibrationDurationSpan = vibrationSegmentContainer.querySelector(".vibrationDurationSpan");
  vibrationDurationInput.addEventListener("input", () => {
    vibrationDurationSpan.innerText = vibrationDurationInput.value;
  });
  vibrationDurationInput.dispatchEvent(new Event("input"));
  const pauseDurationInput = vibrationSegmentContainer.querySelector(".pauseDuration");
  const pauseDurationSpan = vibrationSegmentContainer.querySelector(".pauseDurationSpan");
  pauseDurationInput.addEventListener("input", () => {
    pauseDurationSpan.innerText = pauseDurationInput.value;
  });
  pauseDurationInput.dispatchEvent(new Event("input"));

  vibrationSegmentContainer.querySelector(".remove").addEventListener("click", () => {
    vibrationSegmentContainers.splice(vibrationSegmentContainers.indexOf(vibrationSegmentContainer), 1);
    vibrationSegmentContainer.remove();
    updateAddVibrationSegmentButton();
    updateVibrationButton();
  });
  vibrationSegmentsContainer.appendChild(vibrationSegmentContainer);

  updateAddVibrationSegmentButton();
  updateVibrationButton();
}

/** @type {HTMLButtonElement} */
const addVibrationSegmentButton = document.getElementById("addVibrationSegment");
addVibrationSegmentButton.addEventListener("click", () => addVibrationSegment());
function updateAddVibrationSegmentButton() {
  addVibrationSegmentButton.disabled = vibrationSegmentContainers.length >= TS.MaxNumberOfVibrations;
}

/** @type {HTMLButtonElement} */
const vibrateButton = document.getElementById("vibrate");
function updateVibrationButton() {
  vibrateButton.disabled = !device.isConnected || vibrationSegmentContainers.length == 0;
}
device.addEventListener("isConnected", () => updateVibrationButton());
vibrateButton.addEventListener("click", () => {
  const vibrationSegments = vibrationSegmentContainers
    .map((vibrationSegmentContainer) => {
      const vibrationDuration = Number(vibrationSegmentContainer.querySelector(".vibrationDuration").value);
      const pauseDuration = Number(vibrationSegmentContainer.querySelector(".pauseDuration").value);
      return [vibrationDuration, pauseDuration];
    })
    .flat();
  console.log("vibrationSegments", vibrationSegments);
  device.vibrate(vibrationSegments);
});
