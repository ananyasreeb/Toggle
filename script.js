let devices = JSON.parse(localStorage.getItem("devices")) || [];
let PASSWORD = localStorage.getItem("appPassword") || "1234";

const deviceCount = document.getElementById("deviceCount");

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");
const bluetoothScreen = document.getElementById("bluetoothScreen");

const camera = document.getElementById("camera");
const mic = document.getElementById("mic");
const mode = document.getElementById("mode");

const clickSound = new Audio("https://www.soundjay.com/buttons/button-3.mp3");

// PASSWORD
function checkPassword() {
  const input = document.getElementById("passwordInput").value;

  if (input === PASSWORD) {
    lockScreen.style.display = "none";
    app.style.display = "block";
    updateDeviceCount();
  } else {
    document.getElementById("error").textContent = "Wrong password!";
  }
}

// RESET PASSWORD (OTP)
function resetPassword() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  alert("Your OTP: " + otp);

  const userOtp = prompt("Enter OTP:");

  if (userOtp == otp) {
    const newPass = prompt("New password:");
    localStorage.setItem("appPassword", newPass);
    PASSWORD = newPass;
    alert("Password changed!");
  } else {
    alert("Wrong OTP");
  }
}

// TOGGLE
document.getElementById("blockBtn").onclick = () => {
  clickSound.play();

  camera.textContent = "BLOCKED";
  mic.textContent = "BLOCKED";

  camera.className = "red";
  mic.className = "red";

  mode.textContent = "🔴 BLOCK MODE";
};

document.getElementById("allowBtn").onclick = () => {
  clickSound.play();

  camera.textContent = "ALLOWED";
  mic.textContent = "ALLOWED";

  camera.className = "green";
  mic.className = "green";

  mode.textContent = "🟢 ALLOW MODE";
};

// BLUETOOTH NAV
function openBluetooth() {
  app.style.display = "none";
  bluetoothScreen.style.display = "block";
  updateDeviceList();
}

function goBack() {
  bluetoothScreen.style.display = "none";
  app.style.display = "block";
}

// CONNECT DEVICE
function connectBluetooth() {
  document.getElementById("btStatus").textContent = "Searching...";

  setTimeout(() => {
    const newDevice = "Device_" + Math.floor(Math.random() * 1000);

    devices.push(newDevice);
    localStorage.setItem("devices", JSON.stringify(devices));

    document.getElementById("btStatus").textContent =
      "Connected to " + newDevice + " ✅";

    updateDeviceCount();
    updateDeviceList(); // ✅ FIXED (you missed this earlier)
  }, 2000);
}

// DEVICE COUNT
function updateDeviceCount() {
  deviceCount.textContent = "📱 Connected Devices: " + devices.length;
}

// DEVICE LIST
function updateDeviceList() {
  const list = document.getElementById("deviceList");
  list.innerHTML = "";

  devices.forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    list.appendChild(li);
  });
}

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
