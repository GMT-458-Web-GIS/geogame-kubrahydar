// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', async (event) => {
    
    console.log('ISS Photo Mission script loaded!');

    // --- STEP 2.5: REFACTORING CESIUM INITIALIZATION ---
    // This is the correct async pattern.

    // Your personal Cesium ION default access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZmQ0OTJiYS0wODAyLTQzOGQtYjcyNi0yNDY5NWNmZWQ1YzIiLCJpZCI6MzU4MTUzLCJpYXQiOjE3NjI1MTM0MzN9.91ERlysYeALoMQZB8o-y4-7FwP9lplsWjUHDwkBNdrM';

    try {
        // 1. First, 'await' (wait) for the imagery and terrain to be ready
        console.log('Loading imagery (Asset 3)...');
        // Asset ID 3 is "Blue Marble Next Generation" (standard, should work)
        const imageryProvider = await Cesium.IonImageryProvider.fromAssetId(3); 
        
        console.log('Loading terrain...');
        const terrainProvider = await Cesium.Terrain.fromWorldTerrain();

        console.log('Imagery and Terrain loaded successfully. Initializing viewer...');

        // 2. NOW, create the viewer and pass in the already-loaded providers
        const viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider: imageryProvider,
            terrainProvider: terrainProvider,

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
        // If anything goes wrong (bad token, bad asset ID), log it here!
        // This will prevent the "black screen of death".
        console.error('Failed to initialize Cesium:', error);
    }
    
    // --- END OF REFACTOR ---
});