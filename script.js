// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', async (event) => {

    console.log('Distance Estimation Mission script loaded!');

    // --- 1. CESIUM VE ARAYÜZ (UI) AYARLARI ---

    // Your personal Cesium ION default access token
    // Lütfen KENDİ Cesium.Ion.defaultAccessToken değerinizi buraya girin!
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTQxM2U2Mi1lMDMyLTRiMmItYjlmYi04ZmFhNzljNWVlNjgiLCJpZCI6MzU4MTUzLCJpYXQiOjE3NjI1MTYxMTl9.h-rK-Qyyhho2pkDtSojKehRFV7HQDCNM-20mmtQCtG4';

    // HTML'den UI elemanlarını seç
    const scoreValueEl = document.getElementById('scoreValue');
    const timeValueEl = document.getElementById('timeValue');
    const targetListEl = document.getElementById('targetList');
    const captureButton = document.getElementById('captureButton');
    const messageAreaEl = document.getElementById('messageArea');

    // Oyun durumu değişkenleri
    let score = 0;
    let gameTime = 120; // 2 dakika = 120 saniye
    let gameTimerInterval = null;
    let viewer = null;
    let startPoint = null;
    let endPoint = null;
    let userClicks = [];
    let measurementLine = null;

    // Hedef noktaları (Basitlik için sadece iki şehir)
    const missionTargets = [
        { name: "London, UK", lon: -0.1278, lat: 51.5074, color: Cesium.Color.RED },
        { name: "New York City, USA", lon: -74.0060, lat: 40.7128, color: Cesium.Color.BLUE }
    ];

    try {
        // --- 2. CESIUM BAŞLATMA ---

        console.log('Initializing Cesium Viewer...');

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
            // Basitleştirilmiş oyun için kamera kontrolünü serbest bırak
            // viewer.trackedEntity = issEntity kaldırıldı.
        });

        viewer.cesiumWidget.creditContainer.style.display = 'none';
        console.log('Cesium viewer initialized successfully!');

        // Harita başlangıç görünümünü ayarlama
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-40.0, 30.0, 15000000.0),
            duration: 2.0 // Hızlı başlangıç
        });
        
        // --- 3. UYDU/ISS KALDIRILDI ---
        // TLE, getSatellitePosition, issEntity ve viewer.trackedEntity kaldırıldı.

        // --- 4. OYUN MANTIĞI VE ETKİLEŞİM ---

        // Hedefleri haritaya ekle (Sadece 2 nokta)
        function addTargets() {
            startPoint = missionTargets[0];
            endPoint = missionTargets[1];
            
            // Başlangıç noktası
            viewer.entities.add({
                id: startPoint.name,
                position: Cesium.Cartesian3.fromDegrees(startPoint.lon, startPoint.lat),
                point: { pixelSize: 15, color: startPoint.color, outlineColor: Cesium.Color.WHITE, outlineWidth: 3 },
                label: { text: "START: " + startPoint.name, font: '14pt sans-serif', fillColor: Cesium.Color.WHITE, style: Cesium.LabelStyle.FILL_AND_OUTLINE, verticalOrigin: Cesium.VerticalOrigin.BOTTOM, pixelOffset: new Cesium.Cartesian2(0, -15) }
            });

            // Bitiş noktası
            viewer.entities.add({
                id: endPoint.name,
                position: Cesium.Cartesian3.fromDegrees(endPoint.lon, endPoint.lat),
                point: { pixelSize: 15, color: endPoint.color, outlineColor: Cesium.Color.WHITE, outlineWidth: 3 },
                label: { text: "END: " + endPoint.name, font: '14pt sans-serif', fillColor: Cesium.Color.WHITE, style: Cesium.LabelStyle.FILL_AND_OUTLINE, verticalOrigin: Cesium.VerticalOrigin.BOTTOM, pixelOffset: new Cesium.Cartesian2(0, -15) }
            });
        }
        
        // Görev listesini UI'da güncelle
        function updateMissionList() {
            targetListEl.innerHTML = `
                <li>1. Başlangıç: ${startPoint.name} (${startPoint.color.toCssColorString()})</li>
                <li>2. Bitiş: ${endPoint.name} (${endPoint.color.toCssColorString()})</li>
                <li style="color: #4CAF50;">Görev: İki noktayı birleştiren en kısa çizgiyi çek!</li>
            `;
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
            timeValueEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (gameTime <= 0) {
                endGame("Time's up! Mission failed.");
            }
        }
        
        // İki nokta arasındaki gerçek mesafeyi hesaplama (Büyük daire)
        function calculateGreatCircleDistance(p1, p2) {
            // Cesium.EllipsoidGeodesic ile en doğru mesafeyi hesapla
            const geodetic1 = Cesium.Cartographic.fromCartesian(p1);
            const geodetic2 = Cesium.Cartographic.fromCartesian(p2);
            
            const geodesic = new Cesium.EllipsoidGeodesic(geodetic1, geodetic2);
            // distance, metre cinsindendir.
            return geodesic.getSurfaceDistance() / 1000; // KM'ye çevir
        }

        // Kullanıcının çizdiği hattı haritaya ekler
        function drawUserLine() {
            // Önceki çizgiyi kaldır
            if (measurementLine) {
                viewer.entities.remove(measurementLine);
            }
            
            // Kullanıcının Başlangıç ve Bitiş noktalarına tıklaması bekleniyor
            if (userClicks.length === 2) {
                
                measurementLine = viewer.entities.add({
                    polyline: {
                        positions: userClicks,
                        width: 5,
                        material: Cesium.Color.YELLOW,
                        arcType: Cesium.ArcType.GEODESIC // Eğri hat (Gerçek mesafeye yakın)
                    }
                });
            }
        }

        // Tıklama olaylarını dinleme
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(click) {
            if (userClicks.length >= 2 || gameTime <= 0) {
                return; // 2 tıklamadan sonra veya oyun bittiyse daha fazla tıklamayı engelle
            }
            
            // Tıklanan konumu al
            const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
            if (cartesian) {
                userClicks.push(cartesian);
                
                // Tıklanan noktaları haritada işaretle
                viewer.entities.add({
                    position: cartesian,
                    point: {
                        pixelSize: 10,
                        color: userClicks.length === 1 ? Cesium.Color.YELLOW : Cesium.Color.ORANGE,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 2
                    }
                });
                
                drawUserLine();
                
                if (userClicks.length === 2) {
                    // İki nokta da tıklandı, mesafeyi hesapla ve puanla
                    calculateAndScore();
                } else {
                     updateMessage("First point clicked! Now click the second point.");
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // Mesafe Hesaplama ve Puanlama
        function calculateAndScore() {
            // Gerçek mesafe (Doğrudan iki hedef arasındaki mesafe)
            const targetPosition1 = Cesium.Cartesian3.fromDegrees(startPoint.lon, startPoint.lat);
            const targetPosition2 = Cesium.Cartesian3.fromDegrees(endPoint.lon, endPoint.lat);
            const actualDistanceKm = calculateGreatCircleDistance(targetPosition1, targetPosition2);

            // Kullanıcının çizdiği hattın mesafesi
            const userDistanceKm = calculateGreatCircleDistance(userClicks[0], userClicks[1]);
            
            // Mutlak farkı hesapla
            const differenceKm = Math.abs(actualDistanceKm - userDistanceKm);
            
            // Puanlama mantığı: Fark ne kadar azsa o kadar yüksek puan
            let pointsEarned = 0;
            if (differenceKm <= 50) {
                pointsEarned = 10000;
            } else if (differenceKm <= 200) {
                pointsEarned = 5000;
            } else if (differenceKm <= 500) {
                pointsEarned = 2000;
            } else if (differenceKm <= 1000) {
                pointsEarned = 500;
            }

            if (pointsEarned > 0) {
                updateScore(pointsEarned);
                updateMessage(`SUCCESS! Difference: ${differenceKm.toFixed(0)} km. +${pointsEarned} pts!`);
            } else {
                updateMessage(`FAIL! Difference: ${differenceKm.toFixed(0)} km. Too far!`, true);
            }
            
            // Gerçek mesafeyi gösteren çizgiyi çiz
            viewer.entities.add({
                polyline: {
                    positions: [targetPosition1, targetPosition2],
                    width: 3,
                    material: Cesium.Color.LIMEGREEN.withAlpha(0.6),
                    arcType: Cesium.ArcType.GEODESIC // Eğri hat
                }
            });
            
            // Oyunu durdur
            endGame(`Estimation Complete! Actual Distance: ${actualDistanceKm.toFixed(0)} km. Your Distance: ${userDistanceKm.toFixed(0)} km.`, false);
        }

        // Oyunu bitir
        function endGame(message, isError = false) {
            clearInterval(gameTimerInterval);
            captureButton.disabled = true;
            captureButton.textContent = "MISSION COMPLETE";
            captureButton.style.backgroundColor = '#888';
            handler.destroy(); // Tıklama dinleyicisini kaldır
            
            updateMessage(`<b>${message}</b><br>Final Score: ${score}`, isError);
            // 'PLAY AGAIN' butonu veya modal burada gösterilebilir.
        }

        // Oyunu başlat
        function startGame() {
            score = 0;
            gameTime = 120;
            userClicks = []; // Yeni oyun için sıfırla
            viewer.entities.removeAll(); // Önceki noktaları ve çizgileri temizle
            
            scoreValueEl.textContent = '0';
            timeValueEl.textContent = '02:00';
            captureButton.disabled = true; // Bu oyunda butona gerek yok
            captureButton.textContent = "CLICK ON MAP";
            captureButton.style.backgroundColor = '#555';
            
            addTargets();
            updateMissionList();
            updateMessage("Click the map twice to estimate the distance between the two targets.");

            // Zamanlayıcıyı başlat
            gameTimerInterval = setInterval(updateTimer, 1000);
            
            // Not: captureButton.onclick artık kullanılmayacak, harita tıklamaları kullanılacak.
        }

        // --- 5. OYUNU BAŞLAT ---
        startGame();

    } catch (error) {
        // If the token is bad, this will catch it.
        console.error('Failed to initialize Cesium or Game:', error);
        messageAreaEl.innerHTML = "<p>FATAL ERROR: Could not load simulation. Check console and ensure your Cesium Ion Token is correct.</p>";
        messageAreaEl.style.color = 'red';
    }

});