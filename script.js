// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', async (event) => {
    
    console.log('ISS Photo Mission script loaded!');

    // --- 1. CESIUM VE ARAYÜZ (UI) AYARLARI ---

    // Your personal Cesium ION default access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTQxM2U2Mi1lMDMyLTRiMmItYjlmYi04ZmFhNzljNWVlNjgiLCJpZCI6MzU4MTUzLCJpYXQiOjE3NjI1MTYxMTl9.h-rK-Qyyhho2pkDtSojKehRFV7HQDCNM-20mmtQCtG4';

    // HTML'den UI elemanlarını seç
    const scoreValueEl = document.getElementById('scoreValue');
    const timeValueEl = document.getElementById('timeValue');
    const targetListEl = document.getElementById('targetList');
    const captureButton = document.getElementById('captureButton');
    const messageAreaEl = document.getElementById('messageArea');

    // Oyun durumu değişkenleri
    let score = 0;
    let gameTime = 180; // 3 dakika = 180 saniye
    let gameTimerInterval = null;
    let issEntity = null;
    let viewer = null; // viewer'ı global olarak erişilebilir yap

    // Readme'ye göre 5 görev hedefi
    // (index.html'deki 2 hedefi silip bunları ekleyeceğiz)
    const missionTargets = [
        { 
            id: 1, 
            name: "Pyramids of Giza", 
            lon: 31.1342, 
            lat: 29.9792, 
            captured: false,
            position: Cesium.Cartesian3.fromDegrees(31.1342, 29.9792) // Hesaplama için pozisyonu önbelleğe al
        },
        { 
            id: 2, 
            name: "Eiffel Tower", 
            lon: 2.2945, 
            lat: 48.8584, 
            captured: false,
            position: Cesium.Cartesian3.fromDegrees(2.2945, 48.8584)
        },
        { 
            id: 3, 
            name: "Grand Canyon", 
            lon: -112.1129, 
            lat: 36.1069, 
            captured: false,
            position: Cesium.Cartesian3.fromDegrees(-112.1129, 36.1069)
        },
        { 
            id: 4, 
            name: "Amazon Rainforest (Center)", 
            lon: -62.2159, 
            lat: -3.4653, 
            captured: false,
            position: Cesium.Cartesian3.fromDegrees(-62.2159, -3.4653)
        },
        { 
            id: 5, 
            name: "Sydney Opera House", 
            lon: 151.2153, 
            lat: -33.8568, 
            captured: false,
            position: Cesium.Cartesian3.fromDegrees(151.2153, -33.8568)
        }
    ];


    try {
        // --- 2. CESIUM BAŞLATMA (SİZİN KODUNUZ) ---
        
        console.log('Initializing Cesium Viewer (default settings)...');

        viewer = new Cesium.Viewer('cesiumContainer', {
            terrain: Cesium.Terrain.fromWorldTerrain(),
            animation: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: false,
            sceneModePicker: false,
            selectionIndicator: false,
            timeline: false,
            navigationHelpButton: false,
        });

        viewer.cesiumWidget.creditContainer.style.display = 'none';
        console.log('Cesium viewer initialized successfully!');


        // --- 3. ISS UYDUSU (SİZİN KODUNUZ) ---
        
        const tleLine1 = '1 25544U 98067A   25312.50000000  .00016717  00000-0  29178-3 0  9995';
        const tleLine2 = '2 25544  51.6421  42.8710 0004481  52.1265 308.0519 15.49500000508316';

        function getSatellitePosition(tle1, tle2, startTime, durationMinutes, stepSeconds) {
            const satrec = satellite.twoline2satrec(tle1, tle2);
            const positions = new Cesium.SampledPositionProperty();
            const totalSeconds = durationMinutes * 60;
            for (let i = 0; i <= totalSeconds; i += stepSeconds) {
                const time = Cesium.JulianDate.addSeconds(startTime, i, new Cesium.JulianDate());
                const gmst = satellite.gstime(time.toDate());
                const posVel = satellite.propagate(satrec, time.toDate());
                const positionEci = posVel.position;
                if (positionEci) {
                    const positionEcf = satellite.eciToEcf(positionEci, gmst);
                    const cartesianPosition = new Cesium.Cartesian3(
                        positionEcf.x * 1000, 
                        positionEcf.y * 1000, 
                        positionEcf.z * 1000
                    );
                    positions.addSample(time, cartesianPosition);
                }
            }
            return positions;
        }

        const startTime = Cesium.JulianDate.now();
        const satellitePositions = getSatellitePosition(tleLine1, tleLine2, startTime, 92, 60);

        issEntity = viewer.entities.add({
            id: 'ISS',
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: startTime,
                    stop: Cesium.JulianDate.addMinutes(startTime, 92, new Cesium.JulianDate())
                })
            ]),
            position: satellitePositions,
            point: {
                pixelSize: 8,
                color: Cesium.Color.YELLOW
            },
            path: {
                material: new Cesium.PolylineDashMaterialProperty({
                    color: Cesium.Color.WHITE.withAlpha(0.5),
                }),
                width: 2,
                leadTime: 0,
                trailTime: 46 * 60
            }
        });

        viewer.trackedEntity = issEntity;
        console.log('ISS entity added and camera is tracking.');
        
        // --- 4. OYUN MANTIĞI ---

        // Hedefleri haritaya ekle
        missionTargets.forEach(target => {
            viewer.entities.add({
                id: target.name,
                position: target.position,
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2
                },
                label: {
                    text: target.name,
                    font: '12pt sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -12)
                }
            });
        });

        // Görev listesini UI'da güncelle
        function updateMissionList() {
            targetListEl.innerHTML = ''; // Listeyi temizle
            missionTargets.forEach(target => {
                const li = document.createElement('li');
                if (target.captured) {
                    li.textContent = `${target.name} (Captured ✔️)`;
                    li.style.color = '#4CAF50'; // Yeşil
                    li.style.textDecoration = 'line-through';
                } else {
                    li.textContent = `${target.name} (Pending)`;
                    li.style.color = '#ddd'; // Normal
                }
                targetListEl.appendChild(li);
            });
        }

        // Puanı güncelle
        function updateScore(points) {
            score += points;
            scoreValueEl.textContent = score;
        }

        // Mesaj alanını güncelle
        function updateMessage(text, isError = false) {
            messageAreaEl.innerHTML = `<p>${text}</p>`;
            messageAreaEl.style.color = isError ? '#FF5555' : '#4CAF50';
        }

        // Zamanlayıcıyı güncelle
        function updateTimer() {
            gameTime--;
            const minutes = Math.floor(gameTime / 60);
            const seconds = gameTime % 60;
            // Saniyeyi 05 gibi göstermek için padStart
            timeValueEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (gameTime <= 0) {
                endGame("Time's up!");
            }
        }

        // Fotoğraf yakalama fonksiyonu
        function capturePhoto() {
            // ISS'nin o anki pozisyonunu al
            const currentTime = viewer.clock.currentTime;
            const issCurrentPosition = issEntity.position.getValue(currentTime);

            if (!issCurrentPosition) {
                updateMessage("ISS position not available yet.", true);
                return;
            }

            let closestTarget = null;
            let minDistance = Infinity;

            // Henüz yakalanmamış en yakın hedefi bul
            missionTargets.forEach(target => {
                if (!target.captured) {
                    const distance = Cesium.Cartesian3.distance(issCurrentPosition, target.position);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestTarget = target;
                    }
                }
            });

            if (closestTarget) {
                const distanceInKm = minDistance / 1000; // Metreyi KM'ye çevir

                // Readme'ye göre puanlama
                let pointsEarned = 0;
                if (distanceInKm <= 50) {
                    pointsEarned = 5000;
                } else if (distanceInKm <= 200) {
                    pointsEarned = 1000;
                } else if (distanceInKm <= 500) {
                    pointsEarned = 250;
                }

                if (pointsEarned > 0) {
                    closestTarget.captured = true; // Hedefi yakalandı olarak işaretle
                    updateScore(pointsEarned);
                    updateMessage(`Great shot on ${closestTarget.name}! +${pointsEarned} pts (Distance: ${distanceInKm.toFixed(0)} km)`);
                    
                    // Haritadaki hedef noktasının rengini değiştir
                    const entity = viewer.entities.getById(closestTarget.name);
                    entity.point.color = Cesium.Color.LIMEGREEN;

                } else {
                    updateMessage(`Miss! Closest target (${closestTarget.name}) was ${distanceInKm.toFixed(0)} km away. No points.`, true);
                }

                updateMissionList(); // Listeyi güncelle

                // Tüm hedefler yakalandı mı kontrol et
                const allCaptured = missionTargets.every(t => t.captured);
                if (allCaptured) {
                    endGame("All targets captured!");
                }

            } else {
                updateMessage("All targets have already been captured!", true);
            }
        }

        // Oyunu bitir
        function endGame(message) {
            clearInterval(gameTimerInterval); // Zamanlayıcıyı durdur
            captureButton.disabled = true; // Butonu devre dışı bırak
            captureButton.textContent = "MISSION COMPLETE";
            captureButton.style.backgroundColor = '#888';

            updateMessage(`<b>${message}</b><br>Final Score: ${score}`, false);
            
            // Readme'de belirtilen "End-of-Mission Screen" (modal)
            // ve Chart.js burada tetiklenebilir.
        }

        // Oyunu başlat
        function startGame() {
            score = 0;
            gameTime = 180;
            scoreValueEl.textContent = '0';
            timeValueEl.textContent = '03:00';
            captureButton.disabled = false;
            captureButton.textContent = "CAPTURE PHOTO";
            captureButton.style.backgroundColor = '#4CAF50';
            updateMessage("Good luck, Commander!");

            // Zamanlayıcıyı başlat
            gameTimerInterval = setInterval(updateTimer, 1000);

            // Görev listesini ilk kez doldur
            updateMissionList();

            // "Capture" butonu için event listener ekle
            // (Eski listenerları silmek için remove/add yapısı daha güvenli olabilir
            // ama burada bir kez tanımlıyoruz)
            captureButton.onclick = capturePhoto;
        }

        // --- 5. OYUNU BAŞLAT ---
        // Readme'de "Start Mission" butonu olan bir modal'dan bahsediliyor.
        // O modal olmadığından, şimdilik oyunu doğrudan başlatıyoruz.
        startGame();


    } catch (error) {
        // If the token is bad, this will catch it.
        console.error('Failed to initialize Cesium or Game:', error);
        messageAreaEl.innerHTML = "<p>FATAL ERROR: Could not load simulation. Check console.</p>";
        messageAreaEl.style.color = 'red';
    }
    
});