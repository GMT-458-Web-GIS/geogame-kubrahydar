// --- 1. DOM Elementlerini Seçme ---
// HTML'deki span elementlerini seçiyoruz
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const questionEl = document.getElementById('question');

// --- 2. Leaflet Haritasını Başlatma ---
// Haritayı 'map' id'li div'e yüklüyoruz.
// [20, 0] koordinatlarına, 3 zoom seviyesiyle dünyayı ortalayarak başlıyoruz.
const map = L.map('map').setView([20, 0], 3);

// Haritaya eklenen marker/daireleri temizlemek için bir katman grubu
const feedbackLayer = L.layerGroup().addTo(map);

// Harita katmanı (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

// --- 3. Oyun Değişkenleri ---
let capitalsData = []; // capitals.json'dan gelen veriyi tutacak
let currentQuestion = null; // O an sorulan başkentin objesi
let score = 0;
let timeLeft = 60; // Geri sayım (saniye)
let gameTimer = null; // setInterval'ı tutmak için

// Başarı toleransı (metre cinsinden). 400km = 400,000 metre
// Kullanıcı bu yarıçap içine tıklarsa doğru kabul edilecek.
const TOLERANCE_METERS = 400000;

// --- 4. Veriyi Yükleme ve Oyunu Başlatma ---
// DOM yüklendiğinde veriyi çek ve oyunu başlat
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('capitals.json');
        capitalsData = await response.json();
        
        // Veri yüklendikten sonra oyunu başlat
        startGame();
    } catch (error) {
        console.error('Başkent verisi yüklenemedi:', error);
        questionEl.textContent = 'Hata: Oyun verisi yüklenemedi!';
    }
});

// --- 5. Ana Oyun Fonksiyonları ---

function startGame() {
    score = 0;
    timeLeft = 60; // Süreyi başa al
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;

    // Varsa eski zamanlayıcıyı temizle ve yenisini başlat
    clearInterval(gameTimer);
    gameTimer = setInterval(updateTimer, 1000); // Her saniye updateTimer'ı çalıştır

    // Harita tıklamalarını etkinleştir
    map.on('click', handleMapClick);

    // İlk soruyu sor
    nextQuestion();
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameTimer); // Zamanlayıcıyı durdur
    map.off('click', handleMapClick); // Harita tıklamalarını devre dışı bırak
    questionEl.textContent = `Oyun Bitti! Final Skorun: ${score}`;
    // (Opsiyonel) Bir "Yeniden Başlat" butonu gösterebilirsiniz
}

function nextQuestion() {
    // Önceki sorudan kalan marker/daireleri temizle
    feedbackLayer.clearLayers();

    // Veri listesinden rastgele bir başkent seç
    const randomIndex = Math.floor(Math.random() * capitalsData.length);
    currentQuestion = capitalsData[randomIndex];

    // Soruyu ekrana yazdır (Örn: "Paris (Fransa)")
    questionEl.textContent = `${currentQuestion.capital} (${currentQuestion.country})`;
}

// --- 6. Harita Tıklama Olayı (En Önemli Kısım) ---

function handleMapClick(e) {
    if (!currentQuestion) return; // Henüz soru yüklenmediyse bir şey yapma

    // Tıklanan yerin koordinatları
    const clickedLatLng = e.latlng;
    
    // Doğru cevabın koordinatları
    const correctLatLng = L.latLng(currentQuestion.lat, currentQuestion.lng);

    // İki nokta arasındaki mesafeyi hesapla (metre cinsinden)
    const distance = clickedLatLng.distanceTo(correctLatLng);

    if (distance <= TOLERANCE_METERS) {
        // --- DOĞRU CEVAP ---
        score += 10;
        
        // Doğru yeri yeşil bir daire ile göster
        L.circle(correctLatLng, {
            radius: TOLERANCE_METERS,
            color: 'green',
            fillColor: '#0f0',
            fillOpacity: 0.3
        }).addTo(feedbackLayer);

    } else {
        // --- YANLIŞ CEVAP ---
        score -= 5; // Puan düşür (opsiyonel)

        // Kullanıcının tıkladığı yeri kırmızı bir marker ile göster
        L.marker(clickedLatLng, { title: "Senin Tahminin" }).addTo(feedbackLayer);
        
        // Doğru yeri yeşil bir marker ile göster
        L.marker(correctLatLng, { title: "Doğru Cevap" }).addTo(feedbackLayer);
    }

    // Skoru güncelle
    scoreEl.textContent = score;

    // Cevap verdikten sonra haritayı kısa süreliğine kilitle
    map.off('click', handleMapClick);

    // 1.5 saniye sonra bir sonraki soruya geç
    setTimeout(() => {
        nextQuestion();
        map.on('click', handleMapClick); // Haritayı tekrar tıklanabilir yap
    }, 1500);
}