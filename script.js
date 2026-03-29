let password = localStorage.getItem("pass") || "1234";
let devices = JSON.parse(localStorage.getItem("devices")) || [];

// SCREENS
const lock = document.getElementById("lock");
const app = document.getElementById("app");
const settings = document.getElementById("settings");

// LOGIN
function unlock() {
  const input = document.getElementById("pass").value;

  if (input === password) {
    lock.classList.add("hidden");
    app.classList.remove("hidden");
    update();
  } else {
    document.getElementById("err").innerText = "Wrong password";
  }
}

// LOGOUT
function logout() {
  app.classList.add("hidden");
  settings.classList.add("hidden");
  lock.classList.remove("hidden");
}

// TOGGLE
function block() {
  document.getElementById("cam").innerText = "BLOCKED";
  document.getElementById("mic").innerText = "BLOCKED";
  document.getElementById("mode").innerText = "🔴 BLOCK MODE";
}

function allow() {
  document.getElementById("cam").innerText = "ALLOWED";
  document.getElementById("mic").innerText = "ALLOWED";
  document.getElementById("mode").innerText = "🟢 ALLOW MODE";
}

// DEVICES
function scan() {
  let name = "Device_" + Math.floor(Math.random()*1000);
  devices.push(name);
  saveDevices();
  update();
}

function removeDevice(index) {
  devices.splice(index, 1);
  saveDevices();
  update();
}

function saveDevices() {
  localStorage.setItem("devices", JSON.stringify(devices));
}

function update() {
  document.getElementById("count").innerText = "📱 Devices: " + devices.length;

  let list = document.getElementById("deviceList");
  list.innerHTML = "";

  devices.forEach((d, i) => {
    let li = document.createElement("li");
    li.innerHTML = d + ` <button onclick="removeDevice(${i})">❌</button>`;
    list.appendChild(li);
  });
}

// SETTINGS
function openSettings() {
  app.classList.add("hidden");
  settings.classList.remove("hidden");
}

function back() {
  settings.classList.add("hidden");
  app.classList.remove("hidden");
}

// THEME
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// PASSWORD CHANGE
function changePassword() {
  const newPass = document.getElementById("newPass").value;
  if (newPass) {
    password = newPass;
    localStorage.setItem("pass", newPass);
    alert("Password changed!");
  }
}
