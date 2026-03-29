let PASSWORD = localStorage.getItem("appPassword") || "1234";

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
  } else {
    document.getElementById("error").textContent = "Wrong password!";
  }
}

// SOUND + TOGGLE
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

// BLUETOOTH SCREEN
function openBluetooth() {
  app.style.display = "none";
  bluetoothScreen.style.display = "block";
}

function goBack() {
  bluetoothScreen.style.display = "none";
  app.style.display = "block";
}

// FAKE BLUETOOTH SCAN (REAL needs Android app)
function connectBluetooth() {
  document.getElementById("btStatus").textContent = "Searching...";
  
  setTimeout(() => {
    document.getElementById("btStatus").textContent = "Connected to Device ✅";
  }, 2000);
}

// PWA INSTALL
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
function resetPassword() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  alert("Your OTP: " + otp);

  const userOtp = prompt("Enter OTP:");
  
  if (userOtp == otp) {
    const newPass = prompt("New password:");
    localStorage.setItem("appPassword", newPass);
  } else {
    alert("Wrong OTP");
  }
}
