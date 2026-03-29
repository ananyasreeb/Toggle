let password = localStorage.getItem("pass") || "1234";
let devices = JSON.parse(localStorage.getItem("devices")) || [];

// screens
const lock = document.getElementById("lock");
const app = document.getElementById("app");
const settings = document.getElementById("settings");
const devicesScreen = document.getElementById("devicesScreen");
const passScreen = document.getElementById("passScreen");

// LOGIN
function unlock() {
  let input = document.getElementById("pass").value;

  if (input === password) {
    lock.classList.add("hidden");
    app.classList.remove("hidden");
    update();
  } else {
    document.getElementById("err").innerText = "Wrong password";
  }
}

// FORGOT PASSWORD
function forgotPassword() {
  let newPass = prompt("Enter new password:");
  if (newPass) {
    password = newPass;
    localStorage.setItem("pass", newPass);
    alert("Password reset!");
  }
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
  localStorage.setItem("devices", JSON.stringify(devices));
  update();
}

function removeDevice(i) {
  devices.splice(i,1);
  localStorage.setItem("devices", JSON.stringify(devices));
  update();
}

function update() {
  document.getElementById("count").innerText =
    "📱 Devices: " + devices.length;

  let list = document.getElementById("deviceList");
  if (!list) return;

  list.innerHTML = "";

  devices.forEach((d,i)=>{
    let li = document.createElement("li");
    li.innerHTML = d + ` <button onclick="removeDevice(${i})">❌</button>`;
    list.appendChild(li);
  });
}

// NAVIGATION
function openSettings(){
  app.classList.add("hidden");
  settings.classList.remove("hidden");
}

function back(){
  settings.classList.add("hidden");
  app.classList.remove("hidden");
}

function openDevices(){
  settings.classList.add("hidden");
  devicesScreen.classList.remove("hidden");
  update();
}

function openPassword(){
  settings.classList.add("hidden");
  passScreen.classList.remove("hidden");
}

function backSettings(){
  devicesScreen.classList.add("hidden");
  passScreen.classList.add("hidden");
  settings.classList.remove("hidden");
}

// THEME
function toggleTheme(){
  document.body.classList.toggle("dark");
}

// PASSWORD CHANGE
function changePassword(){
  let newPass = document.getElementById("newPass").value;
  if(newPass){
    password = newPass;
    localStorage.setItem("pass", newPass);
    alert("Password updated!");
  }
}

// LOGOUT
function logout(){
  location.reload();
}
