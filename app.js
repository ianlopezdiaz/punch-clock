const punches = [];

function populateDropdowns() {
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  for (let h = 5; h <= 22; h++) {
    hour.add(new Option(h.toString().padStart(2, "0")));
  }
  for (let m = 0; m < 60; m++) {
    minute.add(new Option(m.toString().padStart(2, "0")));
  }
}

function timeStrToFloat(s) {
  const [h, m] = s.split(" ");
  return parseInt(h) + parseInt(m) / 60;
}

function timeFloatToStr(x) {
  const totalMinutes = Math.round(x * 60);
  const hh = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  return `${hh.toString().padStart(2, "0")}h ${mm.toString().padStart(2, "0")}m`;
}


function addPunch() {
  const h = document.getElementById("hour").value;
  const m = document.getElementById("minute").value;
  const timeStr = `${h}h ${m}m`;
  punches.push(timeStr);
  const li = document.createElement("li");
  const type = punches.length % 2 === 1 ? "IN" : "OUT";
  li.className = type === "IN" ? "punch-in" : "punch-out";  // 👈 NEW
  li.textContent = `${type}  ${timeStr}`;
  document.getElementById("punches").appendChild(li);
  document.getElementById("result").textContent = "Click 'Calculate' to update";
}


function removeLast() {
  if (!punches.length) return;
  punches.pop();
  const list = document.getElementById("punches");
  list.removeChild(list.lastChild);
}

function calculate() {
  const result = document.getElementById("result");
  const TARGET = parseFloat(localStorage.getItem("dailyHours")) || 8;
  if (!punches.length) {
    result.textContent = "No punches added";
    return;
  }
  const times = punches.map(timeStrToFloat);
  const now = new Date();
  const nowFloat = now.getHours() + now.getMinutes() / 60;
  // --- worked time in CLOSED intervals only ---
  let workedClosed = 0;
  for (let i = 0; i + 1 < times.length; i += 2) {
    workedClosed += times[i + 1] - times[i];
  }
  // --- worked time so far (for display) ---
  let workedSoFar = workedClosed;
  if (times.length % 2 === 1 && nowFloat > times[times.length - 1]) {
    workedSoFar += nowFloat - times[times.length - 1];
  }
  if (times.length % 2 === 0) {
    result.textContent =
      `Total worked: ${timeFloatToStr(workedClosed)}`;
  } else {
    const lastIn = times[times.length - 1];
    const exitTime = lastIn + (TARGET - workedClosed);

    result.textContent =
      `Punch OUT: ${timeFloatToStr(exitTime)}\n` +
      `Total worked: ${timeFloatToStr(workedSoFar)}`;
  }
}

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
}

/* Load saved preference */
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
  }
})();


const dailyHoursSelect = document.getElementById("daily-hours");

// load saved value
const savedHours = localStorage.getItem("dailyHours");
if (savedHours) {
  dailyHoursSelect.value = savedHours;
}

// save on change
dailyHoursSelect.addEventListener("change", () => {
  localStorage.setItem("dailyHours", dailyHoursSelect.value);
});

populateDropdowns();





