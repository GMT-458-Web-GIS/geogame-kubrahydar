// script.js - Geo World Guess Game
// Multi-mode: capitals, country, flag, random city, landmarks
// All UI text is English only.

// ================== DATA ==================

// Bigger capitals database (not full 200+, but wider coverage).
const CAPITALS = [
  { country: "Turkey", capital: "Ankara", lat: 39.925533, lng: 32.866287, flag: "🇹🇷" },
  { country: "France", capital: "Paris", lat: 48.856613, lng: 2.352222, flag: "🇫🇷" },
  { country: "United Kingdom", capital: "London", lat: 51.507222, lng: -0.1275, flag: "🇬🇧" },
  { country: "Germany", capital: "Berlin", lat: 52.520008, lng: 13.404954, flag: "🇩🇪" },
  { country: "Italy", capital: "Rome", lat: 41.902782, lng: 12.496366, flag: "🇮🇹" },
  { country: "Spain", capital: "Madrid", lat: 40.416775, lng: -3.70379, flag: "🇪🇸" },
  { country: "Portugal", capital: "Lisbon", lat: 38.722252, lng: -9.139337, flag: "🇵🇹" },
  { country: "Greece", capital: "Athens", lat: 37.98381, lng: 23.727539, flag: "🇬🇷" },
  { country: "Russia", capital: "Moscow", lat: 55.755825, lng: 37.617298, flag: "🇷🇺" },
  { country: "United States", capital: "Washington, D.C.", lat: 38.9072, lng: -77.0369, flag: "🇺🇸" },
  { country: "Canada", capital: "Ottawa", lat: 45.4215, lng: -75.6972, flag: "🇨🇦" },
  { country: "Mexico", capital: "Mexico City", lat: 19.432608, lng: -99.133209, flag: "🇲🇽" },
  { country: "Brazil", capital: "Brasília", lat: -15.793889, lng: -47.882778, flag: "🇧🇷" },
  { country: "Argentina", capital: "Buenos Aires", lat: -34.603722, lng: -58.381592, flag: "🇦🇷" },
  { country: "Chile", capital: "Santiago", lat: -33.44889, lng: -70.669265, flag: "🇨🇱" },
  { country: "Peru", capital: "Lima", lat: -12.046374, lng: -77.042793, flag: "🇵🇪" },
  { country: "Colombia", capital: "Bogotá", lat: 4.711, lng: -74.0721, flag: "🇨🇴" },
  { country: "South Africa", capital: "Pretoria", lat: -25.747868, lng: 28.229271, flag: "🇿🇦" },
  { country: "Egypt", capital: "Cairo", lat: 30.04442, lng: 31.235712, flag: "🇪🇬" },
  { country: "Kenya", capital: "Nairobi", lat: -1.292066, lng: 36.821945, flag: "🇰🇪" },
  { country: "Nigeria", capital: "Abuja", lat: 9.076479, lng: 7.398574, flag: "🇳🇬" },
  { country: "Ethiopia", capital: "Addis Ababa", lat: 8.980603, lng: 38.757759, flag: "🇪🇹" },
  { country: "India", capital: "New Delhi", lat: 28.613939, lng: 77.209021, flag: "🇮🇳" },
  { country: "Pakistan", capital: "Islamabad", lat: 33.684422, lng: 73.047882, flag: "🇵🇰" },
  { country: "China", capital: "Beijing", lat: 39.904202, lng: 116.407394, flag: "🇨🇳" },
  { country: "Japan", capital: "Tokyo", lat: 35.689487, lng: 139.691706, flag: "🇯🇵" },
  { country: "South Korea", capital: "Seoul", lat: 37.5665, lng: 126.978, flag: "🇰🇷" },
  { country: "Indonesia", capital: "Jakarta", lat: -6.208763, lng: 106.845599, flag: "🇮🇩" },
  { country: "Australia", capital: "Canberra", lat: -35.280937, lng: 149.130009, flag: "🇦🇺" },
  { country: "New Zealand", capital: "Wellington", lat: -41.286461, lng: 174.77623, flag: "🇳🇿" },
  { country: "Sweden", capital: "Stockholm", lat: 59.329323, lng: 18.068581, flag: "🇸🇪" },
  { country: "Norway", capital: "Oslo", lat: 59.913868, lng: 10.752245, flag: "🇳🇴" },
  { country: "Finland", capital: "Helsinki", lat: 60.169857, lng: 24.938379, flag: "🇫🇮" },
  { country: "Poland", capital: "Warsaw", lat: 52.229676, lng: 21.012229, flag: "🇵🇱" },
  { country: "Netherlands", capital: "Amsterdam", lat: 52.3676, lng: 4.9041, flag: "🇳🇱" },
  { country: "Belgium", capital: "Brussels", lat: 50.850346, lng: 4.351721, flag: "🇧🇪" },
  { country: "Switzerland", capital: "Bern", lat: 46.94809, lng: 7.44744, flag: "🇨🇭" },
  { country: "Austria", capital: "Vienna", lat: 48.208176, lng: 16.373819, flag: "🇦🇹" },
  { country: "Czech Republic", capital: "Prague", lat: 50.075538, lng: 14.4378, flag: "🇨🇿" },
  { country: "Hungary", capital: "Budapest", lat: 47.497913, lng: 19.040236, flag: "🇭🇺" },
  { country: "Romania", capital: "Bucharest", lat: 44.4268, lng: 26.1025, flag: "🇷🇴" },
  { country: "Ukraine", capital: "Kyiv", lat: 50.4501, lng: 30.5234, flag: "🇺🇦" },
  { country: "Saudi Arabia", capital: "Riyadh", lat: 24.713552, lng: 46.675297, flag: "🇸🇦" },
  { country: "United Arab Emirates", capital: "Abu Dhabi", lat: 24.453884, lng: 54.3773438, flag: "🇦🇪" },
  { country: "Qatar", capital: "Doha", lat: 25.285447, lng: 51.53104, flag: "🇶🇦" },
  { country: "Iran", capital: "Tehran", lat: 35.6892, lng: 51.389, flag: "🇮🇷" },
  { country: "Iraq", capital: "Baghdad", lat: 33.3152, lng: 44.3661, flag: "🇮🇶" },
  { country: "Thailand", capital: "Bangkok", lat: 13.7563, lng: 100.5018, flag: "🇹🇭" },
  { country: "Vietnam", capital: "Hanoi", lat: 21.0278, lng: 105.8342, flag: "🇻🇳" },
  { country: "Philippines", capital: "Manila", lat: 14.5995, lng: 120.9842, flag: "🇵🇭" },
  { country: "Malaysia", capital: "Kuala Lumpur", lat: 3.139, lng: 101.6869, flag: "🇲🇾" },
  { country: "Singapore", capital: "Singapore", lat: 1.3521, lng: 103.8198, flag: "🇸🇬" },
  { country: "Morocco", capital: "Rabat", lat: 34.020882, lng: -6.84165, flag: "🇲🇦" },
  { country: "Algeria", capital: "Algiers", lat: 36.7538, lng: 3.0588, flag: "🇩🇿" },
  { country: "Tunisia", capital: "Tunis", lat: 36.8065, lng: 10.1815, flag: "🇹🇳" },
  { country: "Sudan", capital: "Khartoum", lat: 15.5007, lng: 32.5599, flag: "🇸🇩" },
  { country: "Israel", capital: "Jerusalem", lat: 31.7683, lng: 35.2137, flag: "🇮🇱" },
  { country: "Jordan", capital: "Amman", lat: 31.9539, lng: 35.9106, flag: "🇯🇴" },
  { country: "Lebanon", capital: "Beirut", lat: 33.8938, lng: 35.5018, flag: "🇱🇧" },
  { country: "Ireland", capital: "Dublin", lat: 53.3498, lng: -6.2603, flag: "🇮🇪" },
  { country: "Denmark", capital: "Copenhagen", lat: 55.6761, lng: 12.5683, flag: "🇩🇰" },
  { country: "Iceland", capital: "Reykjavík", lat: 64.1466, lng: -21.9426, flag: "🇮🇸" },
];

// Non-capital big cities
const CITIES = [
  { city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { city: "New York City", country: "United States", lat: 40.7128, lng: -74.0060 },
  { city: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437 },
  { city: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
  { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
  { city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
  { city: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011 },
  { city: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  { city: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473 },
  { city: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 },
  { city: "Milan", country: "Italy", lat: 45.4642, lng: 9.19 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { city: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
  { city: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298 },
  { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
  { city: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },
  { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { city: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780 },
  { city: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023 },
];

// Landmarks dataset
const LANDMARKS = [
  { name: "Eiffel Tower", country: "France", lat: 48.8584, lng: 2.2945, emoji: "🗼" },
  { name: "Colosseum", country: "Italy", lat: 41.8902, lng: 12.4922, emoji: "🏛️" },
  { name: "Burj Khalifa", country: "United Arab Emirates", lat: 25.1972, lng: 55.2744, emoji: "🏙️" },
  { name: "Statue of Liberty", country: "United States", lat: 40.6892, lng: -74.0445, emoji: "🗽" },
  { name: "Pyramids of Giza", country: "Egypt", lat: 29.9792, lng: 31.1342, emoji: "🛕" },
  { name: "Sydney Opera House", country: "Australia", lat: -33.8568, lng: 151.2153, emoji: "🎭" },
  { name: "Taj Mahal", country: "India", lat: 27.1751, lng: 78.0421, emoji: "🏰" },
  { name: "Christ the Redeemer", country: "Brazil", lat: -22.9519, lng: -43.2105, emoji: "✝️" },
  { name: "Great Wall of China", country: "China", lat: 40.4319, lng: 116.5704, emoji: "🧱" },
];

// Modes & difficulties
const MODES = {
  capitals:  { id: "capitals",  label: "Capitals" },
  country:   { id: "country",   label: "Country" },
  flags:     { id: "flags",     label: "Flag" },
  cities:    { id: "cities",    label: "Random City" },
  landmarks: { id: "landmarks", label: "Landmark" },
};

const DIFFICULTIES = {
  easy: {
    label: "Easy",
    time: 90,
    lives: 7,
    brackets: [150, 400, 900],
    points: [130, 80, 30],
  },
  normal: {
    label: "Normal",
    time: 60,
    lives: 5,
    brackets: [80, 250, 600],
    points: [110, 60, 25],
  },
  hard: {
    label: "Hard",
    time: 45,
    lives: 3,
    brackets: [40, 150, 400],
    points: [140, 80, 30],
  },
};

// ============== STATE ==============
let map, miniMapControl;
let target = null;
let score = 0;
let lives = 5;
let remaining = 60;
let timerId = null;
let gameActive = false;
let difficulty = "normal";
let currentMode = "capitals";

// Analytics
let guesses = []; // { mode, label, dist, points }
let statsChart = null;

// Map overlays
let guessMarker = null;
let actualMarker = null;
let linkLine = null;

// Audio (simple remote sounds; triggered only by user interaction)
let sfx = {
  correct: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"),
  wrong:   new Audio("https://assets.mixkit.co/sfx/preview/mixkit-failure-arcade-alert-notification-240.wav"),
  click:   new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3"),
};

// ======== Shortcuts ========
const $ = (id) => document.getElementById(id);

const timeEl = () => $("time");
const scoreEl = () => $("score");
const livesEl = () => $("lives");
const cityNameEl = () => $("cityName");
const logEl = () => $("log");
const roundResultEl = () => $("roundResult");
const modeLabelEl = () => $("modeLabel");
const difficultyLabelEl = () => $("difficultyLabel");

const flagEmojiEl = () => $("flagEmoji");
const targetTitleEl = () => $("targetTitle");
const targetSubtitleEl = () => $("targetSubtitle");
const targetExtraEl = () => $("targetExtra");

// ============ Utils ============
function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (a) => (a * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDifficultyConfig() {
  return DIFFICULTIES[difficulty] || DIFFICULTIES.normal;
}

function setDifficulty(newVal) {
  if (!DIFFICULTIES[newVal]) newVal = "normal";
  difficulty = newVal;
  const cfg = getDifficultyConfig();
  if (difficultyLabelEl()) difficultyLabelEl().textContent = cfg.label;

  const bottomSel = $("difficultySel");
  const introSel = $("difficultySelIntro");
  if (bottomSel && bottomSel.value !== newVal) bottomSel.value = newVal;
  if (introSel && introSel.value !== newVal) introSel.value = newVal;
}

function setMode(newMode) {
  if (!MODES[newMode]) newMode = "capitals";
  currentMode = newMode;

  if (modeLabelEl()) modeLabelEl().textContent = MODES[newMode].label;

  const bottomSel = $("modeSel");
  const introSel = $("modeSelIntro");
  if (bottomSel && bottomSel.value !== newMode) bottomSel.value = newMode;
  if (introSel && introSel.value !== newMode) introSel.value = newMode;
}

// Simple helper to play sfx safely
function playSfx(type) {
  try {
    const snd = sfx[type];
    if (!snd) return;
    // reset to start for quick consecutive plays
    snd.currentTime = 0;
    snd.play().catch(() => {});
  } catch (e) {
    // ignore
  }
}

// Remove previous overlays
function clearOverlays() {
  if (guessMarker) map.removeLayer(guessMarker);
  if (actualMarker) map.removeLayer(actualMarker);
  if (linkLine) map.removeLayer(linkLine);
  guessMarker = null;
  actualMarker = null;
  linkLine = null;
}

// ========== Target selection & UI ==========
function pickTarget() {
  let data = null;

  if (currentMode === "capitals" || currentMode === "country" || currentMode === "flags") {
    const idx = Math.floor(Math.random() * CAPITALS.length);
    data = CAPITALS[idx];
    target = {
      mode: currentMode,
      country: data.country,
      capital: data.capital,
      lat: data.lat,
      lng: data.lng,
      flag: data.flag || "🌍",
    };
  } else if (currentMode === "cities") {
    const idx = Math.floor(Math.random() * CITIES.length);
    data = CITIES[idx];
    target = {
      mode: currentMode,
      country: data.country,
      city: data.city,
      lat: data.lat,
      lng: data.lng,
      flag: "📍",
    };
  } else if (currentMode === "landmarks") {
    const idx = Math.floor(Math.random() * LANDMARKS.length);
    data = LANDMARKS[idx];
    target = {
      mode: currentMode,
      country: data.country,
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      flag: data.emoji || "⭐",
    };
  }

  updateTargetUI();
}

function updateTargetUI() {
  if (!target) {
    cityNameEl().textContent = "—";
    targetTitleEl().textContent = "—";
    targetSubtitleEl().textContent = "No target selected";
    targetExtraEl().textContent = "";
    flagEmojiEl().textContent = "🌍";
    return;
  }

  let title = "";
  let subtitle = "";
  let extra = "";

  if (currentMode === "capitals") {
    title = target.capital || "Unknown";
    subtitle = target.country;
    extra = "Guess the capital location on the map.";
    cityNameEl().textContent = `${target.capital} — ${target.country}`;
  } else if (currentMode === "country") {
    title = target.country;
    subtitle = "Guess this country on the map.";
    extra = `Capital: ${target.capital}`;
    cityNameEl().textContent = `Country: ${target.country}`;
  } else if (currentMode === "flags") {
    title = "Which country is this?";
    subtitle = "Click on the correct country on the map.";
    extra = "";
    cityNameEl().textContent = "Flag mode: guess the country";
  } else if (currentMode === "cities") {
    title = target.city;
    subtitle = target.country;
    extra = "Random big city (not capital).";
    cityNameEl().textContent = `${target.city} — ${target.country}`;
  } else if (currentMode === "landmarks") {
    title = target.name;
    subtitle = target.country;
    extra = "Guess where this landmark is located.";
    cityNameEl().textContent = `${target.name} — ${target.country}`;
  }

  flagEmojiEl().textContent = target.flag || "🌍";
  targetTitleEl().textContent = title;
  targetSubtitleEl().textContent = subtitle;
  targetExtraEl().textContent = extra;
}

// =========== Game loop ===========
function startGame() {
  const cfg = getDifficultyConfig();
  score = 0;
  lives = cfg.lives;
  remaining = cfg.time;
  guesses = [];
  gameActive = true;

  scoreEl().textContent = score;
  livesEl().textContent = lives;
  timeEl().textContent = remaining;
  $("startBtn").textContent = "Cancel";
  roundResultEl().textContent = `Game started (${MODES[currentMode].label}, ${cfg.label}) — click on the map to guess.`;
  logEl().innerHTML = "";

  // reset analytics
  const panel = $("analyticsPanel");
  panel.classList.remove("visible");
  if (statsChart) {
    statsChart.destroy();
    statsChart = null;
  }
  $("summaryText").textContent = "Play a round to see your stats.";

  clearOverlays();
  pickTarget();
  map.setView([20, 0], 2);

  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    remaining--;
    timeEl().textContent = remaining;
    if (remaining <= 0) {
      endGame("Time is up.");
    }
  }, 1000);
}

function cancelGame() {
  if (timerId) clearInterval(timerId);
  gameActive = false;
  $("startBtn").textContent = "Start";
  roundResultEl().textContent = "Game cancelled.";
}

function endGame(msg) {
  gameActive = false;
  if (timerId) clearInterval(timerId);
  const cfg = getDifficultyConfig();
  roundResultEl().textContent = `${msg} Mode: ${MODES[currentMode].label}, Difficulty: ${cfg.label}. Final score: ${score}`;
  $("startBtn").textContent = "Restart";

  updateAnalyticsPanel();
}

// =========== Guess handling ===========
function handleGuess(lat, lng) {
  if (!target) return;

  playSfx("click");

  // Remove previous markers and line
  clearOverlays();

  // Create animated guess div icon
  const guessDiv = L.divIcon({
    className: "",
    html: '<div class="ripple-marker"><div class="dot"></div><div class="ripple-effect"></div></div>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  guessMarker = L.marker([lat, lng], { icon: guessDiv, interactive: false }).addTo(map);

  // Actual marker
  const actualDiv = L.divIcon({
    className: "",
    html: '<div class="ripple-marker" style="transform:translate(-50%,-50%) scale(0.9);"><div class="dot" style="background:crimson"></div><div class="ripple-effect actual"></div></div>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  actualMarker = L.marker([target.lat, target.lng], {
    icon: actualDiv,
    interactive: false,
  }).addTo(map);

  // Animated line
  linkLine = L.polyline(
    [
      [lat, lng],
      [target.lat, target.lng],
    ],
    { color: "#ffffff", weight: 1.4, opacity: 0.85, interactive: false, className: "guess-line" }
  ).addTo(map);

  // Compute distance + points
  const dist = haversine(lat, lng, target.lat, target.lng);
  const cfg = getDifficultyConfig();

  // Leeway: landmarks require higher precision (smaller brackets)
  const factor = currentMode === "landmarks" ? 0.6 : 1.0;
  const [d1, d2, d3] = cfg.brackets.map((d) => d * factor);
  const [p1, p2, p3] = cfg.points;

  let pts = 0;
  if (dist <= d1) pts = p1;
  else if (dist <= d2) pts = p2;
  else if (dist <= d3) pts = p3;

  const labelForStats =
    currentMode === "capitals"
      ? `${target.capital}, ${target.country}`
      : currentMode === "country"
      ? target.country
      : currentMode === "flags"
      ? `Flag of ${target.country}`
      : currentMode === "cities"
      ? `${target.city}, ${target.country}`
      : `${target.name}, ${target.country}`;

  guesses.push({
    mode: currentMode,
    label: labelForStats,
    dist,
    points: pts,
  });

  const panelBox = $("panelBox");

  if (pts > 0) {
    score += pts;
    scoreEl().textContent = score;
    roundResultEl().textContent = `Nice! Distance: ${dist.toFixed(
      1
    )} km — +${pts} pts (${MODES[currentMode].label}, ${cfg.label})`;
    roundResultEl().classList.add("pulse");
    setTimeout(() => roundResultEl().classList.remove("pulse"), 650);

    playSfx("correct");

    const li = document.createElement("li");
    li.textContent = `${labelForStats}: ${dist.toFixed(1)} km — +${pts} pts`;
    logEl().prepend(li);
  } else {
    lives -= 1;
    livesEl().textContent = lives;
    roundResultEl().textContent = `Too far. Distance: ${dist.toFixed(
      1
    )} km — 0 pts. Life -1 (${MODES[currentMode].label}, ${cfg.label})`;

    panelBox.classList.add("shake");
    setTimeout(() => panelBox.classList.remove("shake"), 420);

    playSfx("wrong");

    const li = document.createElement("li");
    li.textContent = `${labelForStats}: ${dist.toFixed(1)} km — wrong`;
    logEl().prepend(li);

    if (lives <= 0) {
      endGame("All lives lost.");
      return;
    }
  }

  // For flags mode: after they guess, reveal the country + capital in target panel
  if (currentMode === "flags") {
    targetSubtitleEl().textContent = target.country;
    targetExtraEl().textContent = `Capital: ${target.capital}`;
    cityNameEl().textContent = `${target.country} — ${target.capital}`;
  }

  // Smooth fly & then new target
  map.flyTo([target.lat, target.lng], 5, { duration: 1.2 });

  setTimeout(() => {
    pickTarget();
    map.setView([20, 0], 2);
  }, 1200);
}

// ============= Analytics panel ============
function updateAnalyticsPanel() {
  const panel = $("analyticsPanel");
  const summaryEl = $("summaryText");
  const canvas = $("statsChart");

  if (!guesses.length) {
    panel.classList.remove("visible");
    summaryEl.textContent = "No guesses recorded.";
    return;
  }

  const total = guesses.length;
  const correct = guesses.filter((g) => g.points > 0).length;
  const avgDist = guesses.reduce((s, g) => s + g.dist, 0) / total;
  const best = Math.min(...guesses.map((g) => g.dist));

  summaryEl.textContent = `Rounds: ${total} · Correct: ${correct} · Avg distance: ${avgDist.toFixed(
    1
  )} km · Best: ${best.toFixed(1)} km`;

  panel.classList.add("visible");

  const labels = guesses.map((g, i) => `${i + 1}. ${g.label}`);
  const distances = guesses.map((g) => Number(g.dist.toFixed(1)));
  const points = guesses.map((g) => g.points);

  const ctx = canvas.getContext("2d");
  if (statsChart) {
    statsChart.destroy();
  }

  statsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Distance (km)",
          data: distances,
          yAxisID: "y",
        },
        {
          label: "Points",
          data: points,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Distance (km)" },
        },
        y1: {
          beginAtZero: true,
          position: "right",
          grid: { drawOnChartArea: false },
          title: { display: true, text: "Points" },
        },
      },
    },
  });
}

// ============= Theme =============
function applyTheme(t) {
  document.body.classList.remove("theme-neon", "theme-pastel", "theme-retro", "theme-dark");
  if (t === "neon") document.body.classList.add("theme-neon");
  else if (t === "pastel") document.body.classList.add("theme-pastel");
  else if (t === "retro") document.body.classList.add("theme-retro");
  else document.body.classList.add("theme-dark");
}

// ============= Init =============
function init() {
  // basemaps
  const esriSat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 19, attribution: "Esri" }
  );
  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "OpenStreetMap",
  });

  map = L.map("map", { layers: [esriSat], zoomControl: true }).setView([20, 0], 2);
  const baseMaps = { Satellite: esriSat, Map: osm };
  L.control.layers(baseMaps, null, { collapsed: true, position: "topleft" }).addTo(map);

  // minimap
  const miniLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  });
  miniMapControl = new L.Control.MiniMap(miniLayer, {
    toggleDisplay: true,
    minimized: false,
    position: "bottomright",
  }).addTo(map);

  // Map click
  map.on("click", (e) => {
    if (!gameActive) return;
    handleGuess(e.latlng.lat, e.latlng.lng);
  });

  // Buttons
  $("startBtn").addEventListener("click", () => {
    if (gameActive) cancelGame();
    else startGame();
  });

  $("nextBtn").addEventListener("click", () => {
    if (!gameActive) return;
    clearOverlays();
    pickTarget();
    roundResultEl().textContent = "Target skipped. New location selected.";
    map.setView([20, 0], 2);
  });

  // Theme selectors
  $("themeSel").addEventListener("change", (e) => {
    applyTheme(e.target.value);
    $("themeSelIntro").value = e.target.value;
  });
  $("themeSelIntro").addEventListener("change", (e) => {
    applyTheme(e.target.value);
    $("themeSel").value = e.target.value;
  });

  // Difficulty selectors
  $("difficultySel").addEventListener("change", (e) => {
    setDifficulty(e.target.value);
  });
  $("difficultySelIntro").addEventListener("change", (e) => {
    setDifficulty(e.target.value);
  });

  // Mode selectors
  $("modeSel").addEventListener("change", (e) => {
    setMode(e.target.value);
    if (gameActive) {
      cancelGame();
      roundResultEl().textContent = "Mode changed. Press Start to begin a new game.";
    } else {
      roundResultEl().textContent = "Mode changed. Press Start to play.";
    }
    clearOverlays();
    pickTarget();
  });

  $("modeSelIntro").addEventListener("change", (e) => {
    setMode(e.target.value);
    $("modeSel").value = e.target.value;
  });

  // Intro start button
  $("introStart").addEventListener("click", () => {
    const intro = $("intro");
    intro.classList.add("hidden");
    startGame();
  });

  // Defaults
  applyTheme("dark");
  setDifficulty("normal");
  setMode("capitals");
  pickTarget();
}

// Start when window loads
window.addEventListener("load", init);
