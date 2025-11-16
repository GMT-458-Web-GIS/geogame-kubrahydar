// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', async (event) => {

    console.log('Historical Match-Up script loaded!');

    // --- 1. CESIUM VE ARAYÜZ (UI) AYARLARI ---

    // Sizin Cesium ION default access token'ınız (Önceki kodunuzdan alındı)
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTQxM2U2Mi1lMDMyLTRiMmItYjlmYi04ZmFhNzljNWVlNjgiLCJpZCI6MzU4MTUzLCJpYXQiOjE3NjI1MTYxMTl9.h-rK-Qyyhho2pkDtSojKehRFV7HQDCNM-20mmtQCtG4';

    // HTML'den UI elemanlarını seç
    const scoreValueEl = document.getElementById('scoreValue');
    const timeValueEl = document.getElementById('timeValue');
    const targetListEl = document.getElementById('targetList');
    const captureButton = document.getElementById('captureButton');
    const messageAreaEl = document.getElementById('messageArea');

    // Oyun durumu değişkenleri
    let score = 0;
    let gameTime = 180; // 3 dakika
    let gameTimerInterval = null;
    let viewer = null;
    let handler = null; // Tıklama dinleyicisi
    let currentQuestionIndex = -1; // -1 olarak başlar, ilk soru 0 olur
    let processingClick = false; // Ardışık tıklamaları engellemek için

    // OYUNUN YENİ HEDEFLERİ (SORULAR)
    const missionTargets = [
        { 
            id: 1, 
            question: "Site of the 1889 World's Fair (Eiffel Tower)", 
            lon: 2.2945, 
            lat: 48.8584, 
            position: Cesium.Cartesian3.fromDegrees(2.2945, 48.8584),
            found: false 
        },
        { 
            id: 2, 
            question: "Ancient wonder near the Nile (Pyramids)", 
            lon: 31.1342, 
            lat: 29.9792, 
            position: Cesium.Cartesian3.fromDegrees(31.1342, 29.9792),
            found: false 
        },
        { 
            id: 3, 
            question: "Site of the 1986 nuclear disaster (Chernobyl)", 
            lon: 30.0980, 
            lat: 51.3891, 
            position: Cesium.Cartesian3.fromDegrees(30.0980, 51.3891),
            found: false 
        },
        { 
            id: 4, 
            question: "The 'Lost City of the Incas' (Machu Picchu)", 
            lon: -72.5450, 
            lat: -13.1631, 
            position: Cesium.Cartesian3.fromDegrees(-72.5450, -13.1631),
            found: false 
        },
        { 
            id: 5, 
            question: "Where the Titanic sank (North Atlantic)", 
            lon: -49.9469, 
            lat: 41.7269, 
            position: Cesium.Cartesian3.fromDegrees(-49.9469, 41.7269),
            found: false 
        }
    ];

    try {
        // --- 2. CESIUM BAŞLATMA ---

        viewer = new Cesium.Viewer('cesiumContainer', {
            terrain: Cesium.Terrain.fromWorldTerrain(), // 3D Arazi
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

        // Başlangıç kamera konumu
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-30.0, 35.0, 15000000.0),
            duration: 1.0
        });

        // --- 3. OYUN MANTIĞI: TARİHİ EŞLEŞTİRME ---

        // Görev listesini (UI) güncelle
        function updateMissionList() {
            targetListEl.innerHTML = '';
            missionTargets.forEach((target, index) => {
                const li = document.createElement('li');
                if (target.found) {
                    li.textContent = `${target.question} (Found ✔️)`;
                    li.style.color = '#4CAF50';
                    li.style.textDecoration = 'line-through';
                } else if (index === currentQuestionIndex) {
                    li.textContent = `${target.question} (Active 🎯)`;
                    li.style.color = '#FFFF00'; // Sarı - Aktif görev
                } else {
                    li.textContent = `${target.question} (Pending)`;
                    li.style.color = '#ddd';
                }
                targetListEl.appendChild(li);
            });
        }

        // Puanı güncelle
        function updateScore(points) {
            score = Math.max(0, score + points); // Puan 0'ın altına düşmesin
            scoreValueEl.textContent = score;
        }

        // Mesaj alanını güncelle
        function updateMessage(text, isError = false) {
            messageAreaEl.innerHTML = `<p>${text}</p>`;
            messageAreaEl.style.color = isError ? '#FF5555' : '#4CAF50';
        }

        // Zamanlayıcıyı güncelle
        function updateTimer() {
            const minutes = Math.floor(gameTime / 60);
            const seconds = gameTime % 60;
            timeValueEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (gameTime > 0) {
                gameTime--;
            } else if (gameTime <= 0) {
                endGame("Time's up!");
            }
        }

        // Haritaya tıklama olayını yönet
        function handleMapClick(click) {
            // Oyun bittiyse veya bir önceki tıklama işleniyorsa dur
            if (gameTime <= 0 || processingClick) return;

            const currentTarget = missionTargets[currentQuestionIndex];
            // Mevcut hedef zaten bulunduysa (ve yeni soru bekleniyorsa) tıklamayı yoksay
            if (!currentTarget || currentTarget.found) return;

            processingClick = true; // Yeni tıklamaları engelle

            const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
            if (!cartesian) {
                processingClick = false;
                return; // Harita dışına tıklandıysa
            }

            // Tıklanan nokta ile doğru cevap arasındaki mesafeyi hesapla
            const correctPosition = currentTarget.position;
            const distance = Cesium.Cartesian3.distance(cartesian, correctPosition);
            const distanceInKm = distance / 1000;

            // Puanlama: 250km'lik bir yarıçapı kabul edelim
            const proximityThresholdKm = 250;

            if (distanceInKm <= proximityThresholdKm) {
                // BAŞARILI
                currentTarget.found = true;
                updateScore(5000);
                updateMessage(`Success! You found "${currentTarget.question}". +5000 pts!`);
                
                // Haritada doğru yeri yeşil olarak işaretle
                addMarker(correctPosition, currentTarget.question, Cesium.Color.LIMEGREEN);
                
                // Bir sonraki soruya geç
                setTimeout(loadNextQuestion, 2000); // 2 saniye bekle
            } else {
                // BAŞARISIZ (HATA)
                updateScore(-500); // Puan cezası
                gameTime -= 10; // Zaman cezası
                if (gameTime < 0) gameTime = 0; // Zamanın eksiye düşmesini engelle

                updateMessage(`Miss! That was ${distanceInKm.toFixed(0)} km away. Try again. (-500 pts, -10 sec)`, true);
                
                // Tıkladığı yanlış yeri kırmızı ile işaretle
                addMarker(cartesian, "Miss", Cesium.Color.RED.withAlpha(0.7));
                
                processingClick = false; // Tekrar denemesine izin ver
            }

            updateMissionList(); // Listeyi güncelle
        }

        // Haritaya işaretçi ekler
        function addMarker(position, name, color) {
            viewer.entities.add({
                position: position,
                point: {
                    pixelSize: 12,
                    color: color,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2
                },
                label: {
                    text: name,
                    font: '10pt sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -12)
                }
            });
        }
        
        // Bir sonraki soruyu veya hedefi yükle
        function loadNextQuestion() {
            currentQuestionIndex++;
            processingClick = false; // Tıklamayı tekrar aç

            if (currentQuestionIndex >= missionTargets.length) {
                endGame("All targets found! Mission Complete!");
                return;
            }

            const currentTarget = missionTargets[currentQuestionIndex];
            updateMessage(`Find the location: <b>${currentTarget.question}</b>`);
            updateMissionList();

            // İpucu: Kamerayı o bölgeye doğru yavaşça hareket ettirebiliriz
            // (Ama tam göstermeden)
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(currentTarget.lon, currentTarget.lat - 15, 9000000.0), // Liderlik et
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-65.0),
                },
                duration: 1.5
            });
        }

        // Oyunu bitir
        function endGame(message) {
            clearInterval(gameTimerInterval); // Zamanlayıcıyı durdur
            if (handler) {
                handler.destroy(); // Tıklama dinleyicisini kaldır
                handler = null;
            }
            gameTime = 0;
            updateTimer(); // Zamanı 00:00 olarak ayarla

            updateMessage(`<b>${message}</b><br>Final Score: ${score}`, false);
            
            // Butonu "PLAY AGAIN" (Yeniden Oyna) yap
            captureButton.textContent = "PLAY AGAIN";
            captureButton.style.backgroundColor = '#4CAF50';
            captureButton.disabled = false;
            // Tıklandığında sayfayı yeniden yükle (en basit "yeniden başlatma" yolu)
            captureButton.onclick = () => window.location.reload();
        }

        // Oyunu başlat
        function startGame() {
            score = 0;
            gameTime = 180; // 3 dakika
            currentQuestionIndex = -1;
            processingClick = false;
            viewer.entities.removeAll(); // Eski işaretçileri temizle
            
            // Tüm hedefleri 'bulunmadı' olarak sıfırla
            missionTargets.forEach(t => t.found = false);

            scoreValueEl.textContent = '0';