// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', (event) => {
    
    console.log('ISS Photo Mission script loaded!');

    // --- FINAL ATTEMPT: BACK TO BASICS ---

    // Your personal Cesium ION default access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZmQ0OTJiYS0wODAyLTQzOGQtYjcyNi0yNDY5NWNmZWQ1YzIiLCJpZCI6MzU4MTUzLCJpYXQiOjE3NjI1MTM0MzN9.91ERlysYeALoMQZB8o-y4-7FwP9lplsWjUHDwkBNdrM';

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

    } catch (error) {
        // If the token is bad, this will catch it.
        console.error('Failed to initialize Cesium:', error);
    }
    
    // --- END OF FINAL ATTEMPT ---
});