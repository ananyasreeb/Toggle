let devices = JSON.parse(localStorage.getItem("devices")) || [];
let PASSWORD = localStorage.getItem("appPassword") || "1234";

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");
const bluetoothScreen = document.getElementById("bluetoothScreen");

const unlockBtn = document.getElementById("unlockBtn");
const forgot = document.getElementById("forgot");

const blockBtn = document.getElementById("blockBtn");
const allowBtn = document.getElementById("allowBtn");
const btBtn = document.getElementById("btBtn");
const scanBtn = document.getElementById("scanBtn");
const backBtn = document.getElementById("backBtn");
const themeBtn = document.getElementById("themeBtn");

const camera = document.getElementById("camera");
const mic = document.getElementById("mic");
const mode = document.getElementById("mode");
const deviceCount = document.getElementById("deviceCount");

const clickSound = new Audio("https://www.soundjay.com/buttons/button-3.mp3");

// 🔒 UNLOCK
unlockBtn.onclick = () => {
  const input = document.getElementById("passwordInput").value;

  if (input === PASSWORD) {
    lockScreen.style.display = "none";
    app.style.display = "block";
    updateDeviceCount();
  } else {
    document.getElementById("error").textContent = "Wrong password!";
  }
};

// 🔁 RESET PASSWORD
forgot.onclick = () => {
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
};

// 🔴 BLOCK
blockBtn.onclick = () => {
  clickSound.play();

  camera.textContent = "BLOCKED";
  mic.textContent = "BLOCKED";
  camera.className = "red";
  mic.className = "red";
  mode.textContent = "🔴 BLOCK MODE";
};

// 🟢 ALLOW
allowBtn.onclick = () => {
  clickSound.play();

  camera.textContent = "ALLOWED";
  mic.textContent = "ALLOWED";
  camera.className = "green";
  mic.className = "green";
  mode.textContent = "🟢 ALLOW MODE";
};

// 📶 OPEN BLUETOOTH
btBtn.onclick = () => {
  app.style.display = "none";
  bluetoothScreen.style.display = "block";
  updateDeviceList();
};

// 🔍 SCAN DEVICE
scanBtn.onclick = () => {
  document.getElementById("btStatus").textContent = "Searching...";

  setTimeout(() => {
    const newDevice = "Device_" + Math.floor(Math.random() * 1000);

    devices.push(newDevice);
    localStorage.setItem("devices", JSON.stringify(devices));

    document.getElementById("btStatus").textContent =
      "Connected to " + newDevice + " ✅";

    updateDeviceCount();
    updateDeviceList();
  }, 2000);
};

// ⬅ BACK
backBtn.onclick = () => {
  bluetoothScreen.style.display = "none";
  app.style.display = "block";
};

// 📱 DEVICE COUNT
function updateDeviceCount() {
  deviceCount.textContent = "📱 Connected Devices: " + devices.length;
}

// 📃 DEVICE LIST
function updateDeviceList() {
  const list = document.getElementById("deviceList");
  list.innerHTML = "";

  devices.forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    list.appendChild(li);
  });
}

// 🌙 THEME
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

// LOAD THEME
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
