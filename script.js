
// script.js - game logic: uses capitals.json in same folder
let CAPITALS = [];
let map, miniMapControl;
let target = null;
let score=0, lives=3, remaining=60, timerId=null, gameActive=false;
const timeEl = () => document.getElementById('time');
const scoreEl = () => document.getElementById('score');
const livesEl = () => document.getElementById('lives');
const cityNameEl = () => document.getElementById('cityName');
const logEl = () => document.getElementById('log');
const roundResultEl = () => document.getElementById('roundResult');

// custom SVG markers as data URIs
const blueSVG = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><circle cx="14" cy="11" r="7" fill="#1a73e8"/><path d="M14 18 L14 28" stroke="#1a73e8" stroke-width="2" stroke-linecap="round"/></svg>');
const redSVG = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><circle cx="14" cy="11" r="7" fill="#ff4b4b"/><path d="M14 18 L14 28" stroke="#ff4b4b" stroke-width="2" stroke-linecap="round"/></svg>');

const blueIcon = L.icon({ iconUrl: 'data:image/svg+xml;utf8,'+blueSVG, iconSize:[28,28], className:'pulse' });
const redIcon = L.icon({ iconUrl: 'data:image/svg+xml;utf8,'+redSVG, iconSize:[28,28], className:'pulse' });

function haversine(lat1,lon1,lat2,lon2){ const toRad=a=>a*Math.PI/180; const R=6371; const dLat=toRad(lat2-lat1); const dLon=toRad(lon2-lon1); const a=Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2; return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); }

async function init(){
  // fetch capitals
  const res = await fetch('capitals.json'); CAPITALS = await res.json();
  // create map with Esri satellite + OSM basemap toggle
  const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom:19, attribution:'Esri' });
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'OpenStreetMap' });
  map = L.map('map', { layers:[esriSat], zoomControl:true }).setView([20,0], 2);

  const baseMaps = { 'Satellite': esriSat, 'Map': osm };
  L.control.layers(baseMaps,null,{collapsed:true, position:'topleft'}).addTo(map);

  // minimap - small OSM view in corner synced
  const miniLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19});
  miniMapControl = new L.Control.MiniMap(miniLayer, { toggleDisplay: true, minimized:false, position:'bottomright' }).addTo(map);

  // click to place guess
  map.on('click', async function(e){
    if(!gameActive) return;
    try{
      const {lat, lng} = e.latlng;
      // remove existing layers of guess/actual if present
      if(window._guess) map.removeLayer(window._guess);
      if(window._actual) map.removeLayer(window._actual);
      if(window._line) map.removeLayer(window._line);

      window._guess = L.marker([lat,lng], {icon: blueIcon}).addTo(map).bindPopup('Tahmininiz').openPopup();
      window._actual = L.marker([target.lat,target.lng], {icon: redIcon}).addTo(map).bindPopup('Gerçek').openPopup();
      window._line = L.polyline([[lat,lng],[target.lat,target.lng]], {color:'#fff', weight:1.2, opacity:0.6}).addTo(map);

      const dist = haversine(lat,lng,target.lat,target.lng);
      let pts = 0;
      if(dist <= 50) pts=100;
      else if(dist<=200) pts=50;
      else if(dist<=500) pts=20;
      else pts=0;

      if(pts>0){
        score += pts; scoreEl().textContent = score;
        roundResultEl().textContent = `Doğru! Uzaklık: ${dist.toFixed(1)} km — +${pts} puan`;
        const li = document.createElement('li'); li.textContent = `${target.capital}, ${target.country}: ${dist.toFixed(1)} km — +${pts}`;
        logEl().prepend(li);
      } else {
        lives -=1; livesEl().textContent = lives;
        roundResultEl().textContent = `Yanlış. Uzaklık: ${dist.toFixed(1)} km — 0 puan. Can -1`;
        const li = document.createElement('li'); li.textContent = `${target.capital}, ${target.country}: ${dist.toFixed(1)} km — yanlış`;
        logEl().prepend(li);
        if(lives<=0){ endGame('Tüm canlar tükendi.'); return; }
      }
      // small zoom animation to show actual
      map.flyTo([target.lat,target.lng], 6, {duration:1.2});
      // next target after short delay
      setTimeout(()=>{ pickTarget(); map.setView([20,0],2); }, 1000);
    }catch(err){ console.error(err); }
  });

  // UI events
  document.getElementById('startBtn').addEventListener('click', ()=>{ if(gameActive) cancelGame(); else startGame(); });
  document.getElementById('nextBtn').addEventListener('click', ()=>{ if(!gameActive) return; pickTarget(); roundResultEl().textContent='Yeni hedef seçildi.'; });
  document.getElementById('themeSel').addEventListener('change', (e)=>{ applyTheme(e.target.value); });

  applyTheme('dark');
  pickTarget();
}

function pickTarget(){
  const idx = Math.floor(Math.random()*CAPITALS.length);
  target = CAPITALS[idx];
  cityNameEl().textContent = target.capital + ' — ' + target.country;
}

function startGame(){
  score=0; lives=3; remaining=60; gameActive=true;
  scoreEl().textContent=score; livesEl().textContent=lives; timeEl().textContent=remaining;
  document.getElementById('startBtn').textContent='İptal';
  document.getElementById('log').innerHTML='';
  timerId = setInterval(()=>{
    remaining--; timeEl().textContent=remaining;
    if(remaining<=0){ endGame('Süre doldu.'); }
  },1000);
}

function cancelGame(){ clearInterval(timerId); gameActive=false; document.getElementById('startBtn').textContent='Başlat'; roundResultEl().textContent='Oyun iptal edildi.'; }

function endGame(msg){ gameActive=false; clearInterval(timerId); roundResultEl().textContent=msg + ' Skor: '+score; document.getElementById('startBtn').textContent='Yeniden Başlat'; }

function applyTheme(t){
  document.body.classList.remove('theme-neon','theme-pastel','theme-retro');
  if(t==='neon') document.body.classList.add('theme-neon');
  if(t==='pastel') document.body.classList.add('theme-pastel');
  if(t==='retro') document.body.classList.add('theme-retro');
}
window.addEventListener('load', init);
