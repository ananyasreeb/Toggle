const blockBtn = document.getElementById("blockBtn");
const allowBtn = document.getElementById("allowBtn");

const camera = document.getElementById("camera");
const mic = document.getElementById("mic");
const mode = document.getElementById("mode");

blockBtn.onclick = () => {
  camera.textContent = "BLOCKED";
  mic.textContent = "BLOCKED";

  camera.className = "red";
  mic.className = "red";

  mode.textContent = "🔴 BLOCK MODE";
};

allowBtn.onclick = () => {
  camera.textContent = "ALLOWED";
  mic.textContent = "ALLOWED";

  camera.className = "green";
  mic.className = "green";

  mode.textContent = "🟢 ALLOW MODE";
};
