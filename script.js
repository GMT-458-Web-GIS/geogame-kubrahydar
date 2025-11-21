// script.js - Capitals Game with difficulty + analytics + map effects

// All UI text is English. Capitals list embedded so the app works locally (no fetch/CORS).
const CAPITALS = [
  { country: "Turkey", capital: "Ankara", lat: 39.925533, lng: 32.866287, flag: "🇹🇷" },
  { country: "France", capital: "Paris", lat: 48.856613, lng: 2.352222, flag: "🇫🇷" },
  { country: "United Kingdom", capital: "London", lat: 51.507222, lng: -0.1275, flag: "🇬🇧" },
  { country: "Germany", capital: "Berlin", lat: 52.520008, lng: 13.404954, flag: "🇩🇪" },
  { country: "Italy", capital: "Rome", lat: 41.902782, lng: 12.496366, flag: "🇮🇹" },
  { country: "Spain", capital: "Madrid", lat: 40.416775, lng: -3.703790, flag: "🇪🇸" },
  { country: "Portugal", capital: "Lisbon", lat: 38.722252, lng: -9.139337, flag: "🇵🇹" },
  { country: "Greece", capital: "Athens", lat: 37.983810, lng: 23.727539, flag: "🇬🇷" },
  { country: "Russia", capital: "Moscow", lat: 55.755825, lng: 37.617298, flag: "🇷🇺" },
  { country: "United States", capital: "Washington, D.C.", lat: 38.9072, lng: -77.0369, flag: "🇺🇸" },
  { country: "Canada", capital: "Ottawa", lat: 45.4215, lng: -75.6972, flag: "🇨🇦" },
  { country: "Mexico", capital: "Mexico City", lat: 19.432608, lng: -99.133209, flag: "🇲🇽" },
  { country: "Brazil", capital: "Brasília", lat: -15.793889, lng: -47.882778, flag: "🇧🇷" },
  { country: "Argentina", capital: "Buenos Aires", lat: -34.603722, lng: -58.381592, flag: "🇦🇷" },
  { country: "South Africa", capital: "Pretoria", lat: -25.747868, lng: 28.229271, flag: "🇿🇦" },
  { country: "Egypt", capital: "Cairo", lat: 30.044420, lng: 31.235712, flag: "🇪🇬" },
  { country: "Kenya", capital: "Nairobi", lat: -1.292066, lng: 36.821945, flag: "🇰🇪" },
  { country: "India", capital: "New Delhi", lat: 28.613939, lng: 77.209021, flag: "🇮🇳" },
  { country: "China", capital: "Beijing", lat: 39.904202, lng: 116.407394, flag: "🇨🇳" },
  { country: "Japan", capital: "Tokyo", lat: 35.689487, lng: 139.691706, flag: "🇯🇵" },
  { country: "Australia", capital: "Canberra", lat: -35.280937, lng: 149.130009, flag: "🇦🇺" },
  { country: "New Zealand", capital: "Wellington", lat: -41.286461, lng: 174.776230, flag: "🇳🇿" },
  { country: "Sweden", capital: "Stockholm", lat: 59.329323, lng: 18.068581, flag: "🇸🇪" },
  { country: "Norway", capital: "Oslo", lat: 59.913868, lng: 10.752245, flag: "🇳🇴" },
  { country: "Finland", capital: "Helsinki", lat: 60.169857, lng: 24.938379, flag: "🇫🇮" },
  { country: "Poland", capital: "Warsaw", lat: 52.229676, lng: 21.012229, flag: "🇵🇱" },
  { country: "Netherlands", capital: "Amsterdam", lat: 52.3676, lng: 4.9041, flag: "🇳🇱" },
  { country: "Belgium", capital: "Brussels", lat: 50.850346, lng: 4.351721, flag: "🇧🇪" },
  { country: "Switzerland", capital: "Bern", lat: 46.94809, lng: 7.44744, flag: "🇨🇭" },
  { country: "Austria", capital: "Vienna", lat: 48.208176, lng: 16.373819, flag: "🇦🇹" }
];

// Difficulty configuration
const DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 90,
    lives: 7,
    brackets: [100, 300, 800],
    points: [120, 70, 30]
  },
  normal: {
    label: 'Normal',
    time: 60,
    lives: 5,
    brackets: [50, 200, 500],
    points: [100, 50, 20]
  },
  hard: {
    label: 'Hard',
    time: 45,
    lives: 3,
    brackets: [30, 120, 350],
    points: [130, 70, 30]
  }
};

// State
let map, miniMapControl, target = null;
let score = 0, lives = 5, remaining = 60, timerId = null, gameActive = false;
let difficulty = 'normal';

// Analytics state
let guesses = []; // {capital,country,dist,points}
let statsChart = null;

// Shortcuts
const timeEl = () => document.getElementById('time');
const scoreEl = () => document.getElementById('score');
const livesEl = () => document.getElementById('lives');
const cityNameEl = () => document.getElementById('cityName');
const logEl = () => document.getElementById('log');
const roundResultEl = () => document.getElementById('roundResult');
const targetCountryEl = () => document.getElementById('targetCountry');
const targetCapitalEl = () => document.getElementById('targetCapital');
const flagEmojiEl = () => document.getElementById('flagEmoji');
const difficultyLabelEl = () => document.getElementById('difficultyLabel');

// Utility: haversine distance in km
function haversine(lat1,lon1,lat2,lon2){
  const toRad = a => a * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDifficultyConfig(){
  return DIFFICULTIES[difficulty] || DIFFICULTIES.normal;
}

function setDifficulty(newVal){
  if(!DIFFICULTIES[newVal]) newVal = 'normal';
  difficulty = newVal;
  const cfg = getDifficultyConfig();
  if(difficultyLabelEl()) difficultyLabelEl().textContent = cfg.label;

  const selBottom = document.getElementById('difficultySel');
  const selIntro = document.getElementById('difficultySelIntro');
  if(selBottom && selBottom.value !== newVal) selBottom.value = newVal;
  if(selIntro && selIntro.value !== newVal) selIntro.value = newVal;
}

// Initialize map and UI
function init(){
  // basemaps
  const esriSat = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom:19, attribution:'Esri' }
  );
  const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom:19, attribution:'OpenStreetMap' }
  );

  map = L.map('map', { layers:[esriSat], zoomControl:true }).setView([20,0], 2);
  const baseMaps = { 'Satellite': esriSat, 'Map': osm };
  L.control.layers(baseMaps, null, { collapsed:true, position:'topleft' }).addTo(map);

  // minimap - small OSM view in corner synced
  const miniLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19});
  miniMapControl = new L.Control.MiniMap(miniLayer, { toggleDisplay: true, minimized:false, position:'bottomright' }).addTo(map);

  // click to place guess
  map.on('click', function(e){
    if(!gameActive) return;
    handleGuess(e.latlng.lat, e.latlng.lng);
  });

  // UI events
  document.getElementById('startBtn').addEventListener('click', ()=>{
    if(gameActive) cancelGame();
    else startGame();
  });

  document.getElementById('nextBtn').addEventListener('click', ()=>{
    if(!gameActive) return;
    pickTarget();
    roundResultEl().textContent = 'New target selected.';
  });

  document.getElementById('themeSel').addEventListener('change', (e)=>{
    applyTheme(e.target.value);
    document.getElementById('themeSelIntro').value = e.target.value;
  });

  document.getElementById('themeSelIntro').addEventListener('change', (e)=>{
    applyTheme(e.target.value);
    document.getElementById('themeSel').value = e.target.value;
  });

  // Difficulty selectors
  document.getElementById('difficultySel').addEventListener('change', (e)=>{
    setDifficulty(e.target.value);
  });

  document.getElementById('difficultySelIntro').addEventListener('change', (e)=>{
    setDifficulty(e.target.value);
  });

  // Intro screen start
  document.getElementById('introStart').addEventListener('click', ()=>{
    const intro = document.getElementById('intro');
    intro.classList.add('hidden');
    startGame();
  });

  applyTheme('dark');
  setDifficulty('normal');
  pickTarget();
}

// Pick a random target capital
function pickTarget(){
  const idx = Math.floor(Math.random() * CAPITALS.length);
  target = CAPITALS[idx];
  cityNameEl().textContent = target.capital + ' — ' + target.country;
  targetCountryEl().textContent = target.country;
  targetCapitalEl().textContent = target.capital;
  flagEmojiEl().textContent = target.flag || '🌍';
}

// handle guess at lat,lng
function handleGuess(lat, lng){
  // remove previous overlays
  if(window._guess) map.removeLayer(window._guess);
  if(window._actual) map.removeLayer(window._actual);
  if(window._line) map.removeLayer(window._line);

  // create ripple-style div icon for guess
  const guessDiv = L.divIcon({
    className: '',
    html: '<div class="ripple-marker"><div class="dot"></div><div class="ripple-effect"></div></div>',
    iconSize: [28,28],
    iconAnchor: [14,14]
  });
  window._guess = L.marker([lat,lng], { icon: guessDiv, interactive:false }).addTo(map);

  // actual marker (small static dot + slower ripple)
  const actualDiv = L.divIcon({
    className: '',
    html: '<div class="ripple-marker" style="transform:translate(-50%,-50%) scale(0.9);"><div class="dot" style="background:crimson"></div><div class="ripple-effect actual"></div></div>',
    iconSize: [28,28],
    iconAnchor: [14,14]
  });
  window._actual = L.marker([target.lat, target.lng], { icon: actualDiv, interactive:false }).addTo(map);

  // animated line between guess and actual
  window._line = L.polyline(
    [[lat,lng],[target.lat,target.lng]],
    { color:'#ffffff', weight:1.2, opacity:0.8, interactive:false, className:'guess-line' }
  ).addTo(map);

  // compute distance and scoring according to difficulty
  const dist = haversine(lat,lng,target.lat,target.lng);
  const cfg = getDifficultyConfig();
  const [d1,d2,d3] = cfg.brackets;
  const [p1,p2,p3] = cfg.points;

  let pts = 0;
  if(dist <= d1) pts = p1;
  else if(dist <= d2) pts = p2;
  else if(dist <= d3) pts = p3;
  else pts = 0;

  // store analytics data
  guesses.push({
    capital: target.capital,
    country: target.country,
    dist: dist,
    points: pts
  });

  if(pts > 0){
    score += pts;
    scoreEl().textContent = score;
    roundResultEl().textContent =
      `Nice! Distance: ${dist.toFixed(1)} km — +${pts} pts (${cfg.label} mode)`;
    const li = document.createElement('li');
    li.textContent = `${target.capital}, ${target.country}: ${dist.toFixed(1)} km — +${pts} pts`;
    logEl().prepend(li);
  } else {
    lives -= 1;
    livesEl().textContent = lives;
    roundResultEl().textContent =
      `Too far. Distance: ${dist.toFixed(1)} km — 0 pts. Life -1 (${cfg.label} mode)`;
    const li = document.createElement('li');
    li.textContent = `${target.capital}, ${target.country}: ${dist.toFixed(1)} km — wrong`;
    logEl().prepend(li);
    if(lives <= 0){
      endGame('All lives lost.');
      return;
    }
  }

  // smooth view to actual
  map.flyTo([target.lat,target.lng], 6, { duration: 1.2 });

  // prepare next target shortly
  setTimeout(()=>{
    pickTarget();
    map.setView([20,0], 2);
  }, 1100);
}

// Game controls
function startGame(){
  const cfg = getDifficultyConfig();
  score = 0;
  lives = cfg.lives;
  remaining = cfg.time;
  guesses = [];

  gameActive = true;
  scoreEl().textContent = score;
  livesEl().textContent = lives;
  timeEl().textContent = remaining;
  document.getElementById('startBtn').textContent = 'Cancel';
  logEl().innerHTML = '';
  roundResultEl().textContent = `Game started (${cfg.label}) — make your first guess!`;

  // reset analytics panel
  const panel = document.getElementById('analyticsPanel');
  panel.classList.remove('visible');
  if(statsChart){
    statsChart.destroy();
    statsChart = null;
  }
  document.getElementById('summaryText').textContent =
    'Play a round to see your stats.';

  timerId = setInterval(()=>{
    remaining--;
    timeEl().textContent = remaining;
    if(remaining <= 0){
      endGame('Time is up.');
    }
  }, 1000);
}

function cancelGame(){
  clearInterval(timerId);
  gameActive = false;
  document.getElementById('startBtn').textContent = 'Start';
  roundResultEl().textContent = 'Game cancelled.';
}

function endGame(msg){
  gameActive = false;
  clearInterval(timerId);
  const cfg = getDifficultyConfig();
  roundResultEl().textContent =
    `${msg} Mode: ${cfg.label}. Final score: ${score}`;
  document.getElementById('startBtn').textContent = 'Restart';

  updateAnalyticsPanel();
}

// Analytics panel: Chart.js
function updateAnalyticsPanel(){
  const panel = document.getElementById('analyticsPanel');
  const summaryEl = document.getElementById('summaryText');
  const canvas = document.getElementById('statsChart');

  if(!guesses.length){
    panel.classList.remove('visible');
    summaryEl.textContent = 'No guesses recorded.';
    return;
  }

  const total = guesses.length;
  const correct = guesses.filter(g => g.points > 0).length;
  const avgDist = guesses.reduce((s,g)=> s + g.dist, 0) / total;
  const best = Math.min(...guesses.map(g => g.dist));

  summaryEl.textContent =
    `Rounds: ${total} · Correct: ${correct} · Avg distance: ${avgDist.toFixed(1)} km · Best: ${best.toFixed(1)} km`;

  panel.classList.add('visible');

  const labels = guesses.map((g,i)=> `${i+1}. ${g.capital}`);
  const distances = guesses.map(g => Number(g.dist.toFixed(1)));
  const points = guesses.map(g => g.points);

  const ctx = canvas.getContext('2d');
  if(statsChart){
    statsChart.destroy();
  }

  statsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Distance (km)',
          data: distances,
          yAxisID: 'y',
        },
        {
          label: 'Points',
          data: points,
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Distance (km)' }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          title: { display: true, text: 'Points' }
        }
      }
    }
  });
}

// Apply theme by toggling body class
function applyTheme(t){
  document.body.classList.remove('theme-neon','theme-pastel','theme-retro','theme-dark');
  if(t === 'neon') document.body.classList.add('theme-neon');
  else if(t === 'pastel') document.body.classList.add('theme-pastel');
  else if(t === 'retro') document.body.classList.add('theme-retro');
  else document.body.classList.add('theme-dark');
}

// Start
window.addEventListener('load', init);
