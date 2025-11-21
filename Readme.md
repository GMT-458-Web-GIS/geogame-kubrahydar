
# 🌍 GeoGuess World

**An advanced, multi-mode, interactive geography game inspired by GeoGuessr — featuring animations, sound effects, analytics, and a modern UI.**

<p align="center">
  <img src="https://raw.githubusercontent.com/GMT-458-Web-GIS/geogame-kubrahydar/main/demo.gif" width="85%" />
</p>

---

## 🚀 Live Demo

🔗 [https://gmt-458-web-gis.github.io/geogame-kubrahydar/](https://gmt-458-web-gis.github.io/geogame-kubrahydar/)

---

# 🎮 Game Modes

### 🏛️ **Capitals Mode**

Guess the exact location of world capitals.

### 🗺️ **Country Mode**

A country name appears — click its correct location on the world map.

### 🚩 **Flag Mode**

Identify the country based on its flag.

### 🌆 **Random City Mode**

Guess globally significant non-capital cities.

### 🏔️ **Landmark Mode**

Find world-famous monuments (Eiffel Tower, Colosseum, Taj Mahal, Burj Khalifa, Pyramids of Giza, and more).

---

# ✨ Features

## 🎨 High-End Premium UI

<p align="center">
  <img src="https://raw.githubusercontent.com/GMT-458-Web-GIS/geogame-kubrahydar/main/intro.png" width="80%" />
</p>

* Glassmorphism interface
* Smooth fade/slide transitions
* Modern typography
* Theme selector (Dark, Light, Neon, etc.)
* Fully responsive layout

---

## 🎥 Next-Gen Animations

<p align="center">
  <img src="https://raw.githubusercontent.com/GMT-458-Web-GIS/geogame-kubrahydar/main/game.png" width="80%" />
</p>

* Ripple click effects
* Animated dashed “guess → correct location” line
* Fly-to transitions
* Pulse animation on correct guess
* Shake animation on wrong guess

---

## 📊 Analytics Dashboard

<p align="center">
  <img src="https://raw.githubusercontent.com/GMT-458-Web-GIS/geogame-kubrahydar/main/statistics.png" width="45%" />
</p>

Track your performance:

* Total rounds
* Accuracy rate
* Average distance
* Best performance
* Full bar charts (distance + points) using Chart.js

---

## 📱 Mobile-Optimized Experience

<p align="center">
  <img src="https://raw.githubusercontent.com/GMT-458-Web-GIS/geogame-kubrahydar/main/mobile.jpg" width="40%" />
</p>

* Fully responsive layout
* Mobile-friendly info panel
* Larger tap targets
* Optimized animations for mobile performance

---

# 🧠 Scoring System

Your score depends on:

* Distance accuracy (Haversine formula)
* Difficulty level
* Game mode
* Precision multipliers (especially in landmark mode)

Difficulty presets:

```
Easy:   130 / 80 / 30  
Normal: 110 / 60 / 25  
Hard:   140 / 80 / 30
```

---

# 🗺️ Datasets

* 70+ world capitals
* Country list
* Major world cities
* Global landmarks
* Flags dataset
* Modular, expandable JSON system

---

# 🧩 Tech Stack

| Technology          | Purpose                |
| ------------------- | ---------------------- |
| Leaflet.js          | Interactive map engine |
| MiniMap plugin      | Small inset world map  |
| Chart.js            | Analytics & charts     |
| Vanilla JavaScript  | Game engine & logic    |
| CSS (Glassmorphism) | UI & animations        |
| HTML                | Structure              |

---

# 📁 Project Structure

```
index.html        → Game layout  
styles.css        → UI, animations, themes  
script.js         → Logic, datasets, scoring  
demo.gif          → Gameplay demo  
intro.png         → Intro screen screenshot  
game.png          → In-game screenshot  
statistics.png    → Stats panel screenshot  
mobile.jpg        → Mobile UI screenshot  
```

---

# ⚙️ Run Locally

```sh
git clone https://github.com/GMT-458-Web-GIS/geogame-kubrahydar.git
cd geogame-kubrahydar
```

Then simply open:

```
index.html
```

No backend. No build step. Runs instantly.

---

# 🔮 Future Improvements

* Daily challenge mode
* Fog-of-war hardcore mode
* Leaderboard (Supabase)
* More landmarks
* Country trivia mode

---

# ❤️ Author

Created by **Hatice Kübra Haydar**
Designed for explorers, students, educators, and geography lovers.

---
