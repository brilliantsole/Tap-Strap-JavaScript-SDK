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
      availableDeviceContainer.querySelector(".type").innerText = availableDevice.type;

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

/** @type {HTMLButtonElement} */
const resetDeviceButton = document.getElementById("resetDevice");
device.addEventListener("isConnected", () => {
  resetDeviceButton.disabled = !device.isConnected;
});
resetDeviceButton.addEventListener("click", () => {
  device.reset();
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
device.addEventListener("getName", () => {
  console.log(`name updated to ${device.name}`);
  nameSpan.innerText = device.name;
});

// VIBRATION

// FILL
