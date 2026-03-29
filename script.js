const blockBtn = document.getElementById("blockBtn");
const allowBtn = document.getElementById("allowBtn");

const camera = document.getElementById("camera");
const mic = document.getElementById("mic");

blockBtn.onclick = () => {
  camera.textContent = "BLOCKED";
  mic.textContent = "BLOCKED";
};

allowBtn.onclick = () => {
  camera.textContent = "ALLOWED";
  mic.textContent = "ALLOWED";
};
