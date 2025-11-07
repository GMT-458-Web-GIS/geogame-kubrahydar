// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', async (event) => {
    
    console.log('ISS Photo Mission script loaded!');

    // --- FINAL ATTEMPT: BACK TO BASICS ---

    // Your personal Cesium ION default access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIZ1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZmQ0OTJiYS0wODAyLTQzOGQtYjcyNi0yNDY5NWNmZWQ1YzIiLCJpZCI6MzU4MTUzLCJpYXQiOjE3NjI1MTM0MzN9.91ERlysYeALoMQZB8o-y4-7FwP9lplsWjUHDwkBNdrM';

    try {
        // Initialize the viewer WITHOUT specifying providers.
        // The Viewer constructor will handle loading its own defaults
        // (default imagery and world terrain) using the token above.
        // This is the simplest, most robust method.
        
        console.log('Initializing Cesium Viewer (default settings)...');

        const viewer = new Cesium.Viewer('cesiumContainer', {
            // We only need to tell it which terrain to use by default
            // This IS synchronous (non-async)
            terrain: Cesium.Terrain.fromWorldTerrain(),

            // --- Viewer options to simplify the UI ---
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

        // Add this line to remove the "Cesium" logo at the bottom
        viewer.cesiumWidget.creditContainer.style.display = 'none';

        console.log('Cesium viewer initialized successfully!');

        // --- STEP 3: ADD THE ISS SATELLITE ---
        
        // We need satellite.js library to parse TLE data.
        // This was added to index.html
        
        // This is the (Two-Line Element) data for the ISS
        // Data is from CelesTrak, updated regularly.
        const tleLine1 = '1 25544U 98067A   25312.50000000  .00016717  00000-0  29178-3 0  9995';
        const tleLine2 = '2 25544  51.6421  42.8710 0004481  52.1265 308.0519 15.49500000508316';

        // We need a helper function to calculate the satellite's position from TLE
        // This function computes the position every 'step' seconds for 'duration' minutes
        function getSatellitePosition(tle1, tle2, startTime, durationMinutes, stepSeconds) {
            // satellite.js is loaded from index.html
            const satrec = satellite.twoline2satrec(tle1, tle2);
            const positions = new Cesium.SampledPositionProperty();

            const totalSeconds = durationMinutes * 60;
            for (let i = 0; i <= totalSeconds; i += stepSeconds) {
                const time = Cesium.JulianDate.addSeconds(startTime, i, new Cesium.JulianDate());
                
                // Get position and velocity from satellite.js
                // Note: satellite.js returns coords in kilometers, Cesium wants meters
                const gmst = satellite.gstime(time.toDate());
                const posVel = satellite.propagate(satrec, time.toDate());
                const positionEci = posVel.position;

                if (positionEci) {
                    const positionEcf = satellite.eciToEcf(positionEci, gmst);
                    
                    // Convert km to meters
                    const cartesianPosition = new Cesium.Cartesian3(
                        positionEcf.x * 1000, 
                        positionEcf.y * 1000, 
                        positionEcf.z * 1000
                    );
                    
                    // Add this position sample to our property
                    positions.addSample(time, cartesianPosition);
                }
            }
            return positions;
        }

        // Get the current time
        const startTime = Cesium.JulianDate.now();

        // Calculate orbit for the next 92 minutes (one full orbit)
        const satellitePositions = getSatellitePosition(tleLine1, tleLine2, startTime, 92, 60);

        // Create the ISS entity
        const issEntity = viewer.entities.add({
            id: 'ISS',
            // Set availability to match our calculated orbit time
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: startTime,
                    stop: Cesium.JulianDate.addMinutes(startTime, 92, new Cesium.JulianDate())
                })
            ]),
            
            // Use the calculated positions
            position: satellitePositions,
            
            // Show a simple point (dot)
            point: {
                pixelSize: 8,
                color: Cesium.Color.YELLOW
            },
            
            // Show its orbital path
            path: {
                material: new Cesium.PolylineDashMaterialProperty({
                    color: Cesium.Color.WHITE.withAlpha(0.5),
                }),
                width: 2,
                leadTime: 0, // Show path behind
                trailTime: 46 * 60 // Show path for half an orbit
            }
        });

        // Make the camera follow the ISS
        viewer.trackedEntity = issEntity;
        
        console.log('ISS entity added and camera is tracking.');
        
        // --- END OF STEP 3 ---

    } catch (error) {
        // If the token is bad, this will catch it.
        console.error('Failed to initialize Cesium:', error);
    }
    
});