import * as TS from "../../build/tapstrap.module.js";
window.TS = TS;
console.log(TS);

const device = new TS.Device();
console.log({ device });
window.device = device;

device.setInputMode("rawSensor");

//TS.setAllConsoleLevelFlags({ log: false });

// GET DEVICES
/** @type {HTMLTemplateElement} */
const availableDeviceTemplate = document.getElementById("availableDeviceTemplate");
const availableDevicesContainer = document.getElementById("availableDevices");
/** @type {Object.<string, HTMLElement>} */
const availableDeviceContainers = {};
/** @param {TS.Device[]} availableDevices */
function onAvailableDevices(availableDevices) {
  availableDevicesContainer.innerHTML = "";
  if (availableDevices.length == 0) {
    availableDevicesContainer.innerText = "no devices available";
  } else {
    availableDevices.forEach((availableDevice) => {
      let availableDeviceContainer = availableDeviceContainers[availableDevice.bluetoothId];
      if (!availableDeviceContainer) {
        availableDeviceContainer = availableDeviceTemplate.content.cloneNode(true).querySelector(".availableDevice");
        availableDeviceContainers[availableDevice.bluetoothId] = availableDeviceContainer;

        availableDeviceContainer.querySelector(".bluetoothId").innerText = availableDevice.bluetoothId;

        /** @type {HTMLButtonElement} */
        const toggleConnectionButton = availableDeviceContainer.querySelector(".toggleConnection");
        toggleConnectionButton.addEventListener("click", () => {
          device.connectionManager = availableDevice.connectionManager;
          device.toggleConnection();
        });

        const onConnectionStatus = () => {
          let innerText = "";
          let disabled = false;
          switch (device.connectionStatus) {
            case "notConnected":
              innerText = "connect";
              break;
            case "connected":
              innerText = "disconnect";
              break;
            case "connecting":
            case "disconnecting":
              innerText = device.connectionStatus;
              break;
          }
          toggleConnectionButton.innerText = innerText;
          toggleConnectionButton.disabled = disabled;
        };
        device.addEventListener("connectionStatus", () => onConnectionStatus());
        onConnectionStatus();
      }

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
  device.toggleConnection();
});
device.addEventListener("connectionStatus", (event) => {
  let innerText = "";
  let disabled = false;
  switch (device.connectionStatus) {
    case "notConnected":
      innerText = "connect";
      break;
    case "connected":
      innerText = "disconnect";
      break;
    case "connecting":
    case "disconnecting":
      innerText = device.connectionStatus;
      break;
  }
  toggleConnectionButton.innerText = innerText;
  toggleConnectionButton.disabled = disabled;
});

// 3D

const target = document.querySelector(".target");
const targetRotation = target.querySelector(".rotation");
const targetPosition = target.querySelector(".position");

let isMirrorMode = false;
/** @type {HTMLButtonElement} */
const toggleMirrorModeButton = document.getElementById("toggleMirrorMode");
toggleMirrorModeButton.addEventListener("click", () => {
  isMirrorMode = !isMirrorMode;
  toggleMirrorModeButton.innerText = isMirrorMode ? "disable mirror mode" : "enable mirror mode";
});

device.addEventListener("isConnected", () => {
  toggleMirrorModeButton.disabled = !device.isConnected;
});

const quaternion = new THREE.Quaternion();
const position = new THREE.Vector3();
const euler = new THREE.Euler(0, 0, 0, "YXZ");

device.addEventListener("imu", (event) => {
  const { accelerometer, gyroscope } = event.message;

  euler.set(...[gyroscope.x, gyroscope.y, gyroscope.z].map((value) => value * 0.00001));
  if (isMirrorMode) {
    euler.x *= -1;
    euler.y *= -1;
  }
  quaternion.setFromEuler(euler);
  targetRotation.object3D.quaternion.slerp(quaternion, 0.5);

  position.copy(accelerometer).multiplyScalar(0.001);
  if (isMirrorMode) {
    position.x *= -1;
    position.z *= -1;
  }
  targetPosition.object3D.position.lerp(position, 0.5);
});