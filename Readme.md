🛰️ Project: ISS Photo Mission
GMT 458 - Assignment 2: GeoGame

This project aims to develop a "GeoGame" for the GMT 458 course, utilizing HTML, CSS, and JavaScript. The game will feature a significant geo-component, a high-score system, and a time-based challenge.

1. 📋 Project Requirements
Functional Requirements
🌍 3D World View: The main screen will feature an interactive 3D globe rendered using the Cesium.js library.

🚀 ISS Orbit: The International Space Station (ISS) will be simulated on the 3D globe, moving in real-time based on actual TLE (Two-Line Element) orbital data.

🎯 Mission Targets: At the start of the game, the user will be given a list of 5 geographical locations to "photograph" (e.g., Pyramids of Giza, Eiffel Tower, Grand Canyon). These targets will be marked on the 3D globe.

📸 Interaction (Photo Capture): The user will press a "Capture" button at the exact moment they believe the ISS is directly over a target.

💯 Scoring: The game will calculate the distance between the ISS's position at the moment of capture and the target's actual coordinates. The closer the distance, the higher the score.

⏳ Time Limit: The game will have a mission time limit (e.g., 3 minutes).

🏆 High Score: At the end of the time limit (or when all 5 targets are captured), the total score will be calculated and displayed.

Technical Requirements
💻 Technology: HTML5, CSS3, JavaScript (ES6+).

📚 Libraries: Cesium.js (for primary geovisualization) and Chart.js (for the end-game score summary).

☁️ Platform: The game will be a web application, accessible via a browser and hosted on GitHub Pages.

2. 🎨 Interface Design (Layout & Sketches)
The game interface will consist of three main parts:

Sketch 1: Start Screen (Modal Popup)
Description: A simple modal that covers the screen when the game first loads.

Components:

Game Title: "ISS PHOTO MISSION"

Briefing: "Your mission is to track the ISS and capture photos of 5 targets from the closest possible distance within 3 minutes."

Button: "START MISSION"

Sketch 2: Main Game Screen
Description: The primary interface where the game is played. The screen will be divided into two main sections.

Components (Left Side - ~80% Width):

[CESIUM 3D GLOBE]: The 3D globe will occupy the majority of the screen.

ISS model and its orbital path (dynamic/moving).

Target locations (marked with red Point icons).

Components (Right Side - ~20% Width - Control Panel):

[SCORE]: Current Total Score (e.g., "SCORE: 12,500")

[TIMER]: Remaining Time (e.g., "TIME: 02:45")

[MISSION LIST]: (List of 5 targets)

Pyramids of Giza (Pending)

Eiffel Tower (Pending)

Amazon Rainforest (Pending)

...

[MAIN BUTTON]: "CAPTURE PHOTO" (Active / Inactive)

[MESSAGE AREA]: (Feedback, e.g., "Great shot! +5000 pts" or "Miss! Off by 150km.")

Sketch 3: End-of-Mission Screen (Modal Popup)
Description: The results screen, displayed when the time runs out or all 5 targets are captured.

Components:

Title: "MISSION COMPLETE!"

Final Score: "Your Total Score: 21,800"

(Bonus) A simple bar chart (using Chart.js) showing the points breakdown for each target.

Button: "PLAY AGAIN"

3. ❓ Answering Assignment Objectives
Q: How will the game progress?

The user clicks the "START MISSION" button.

The 3-minute timer begins, and the 5 targets are loaded into the "Mission List".

The user monitors the movement of the ISS over the 3D globe.

When the user believes the ISS is over a target, they press the "CAPTURE PHOTO" button.

The game calculates the distance between the ISS's current position and the nearest target. (Note: A user can miss and waste a shot on the wrong target).

Points are awarded based on proximity (e.g., < 10km = 5000 pts, < 50km = 1000 pts).

The "photographed" target is marked as "Complete" in the list.

When the timer ends or all 5 targets are completed, the game stops and displays the "Mission Complete" screen.

Q: How many questions (tasks) will there be?

Each game session (mission) will consist of 5 photo targets.

Q: How many lives, if any, does a user have?

There will be no 'life' system. The game's success is based on the total accuracy (score) achieved within the time limit. The user will have one chance to capture (and score points for) each target.

Q: Which JS library are you planning to use?

The project's primary visualization will be handled by Cesium.js (or CesiumJS).

This library will be used for 3D globe rendering, simulating satellite motion from TLE data, and performing geospatial calculations.

This is one of the "advanced geovisualisation packages" mentioned in the assignment brief, and is being used to target the bonus points.

Additionally, Chart.js will be used on the final score screen to visualize the results, further adding to the project's complexity and quality.