// Wait for the DOM (HTML structure) to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', async (event) => {
    
    console.log('ISS Photo Mission script loaded!');

    // --- STEP 2: INITIALIZE CESIUM ---

    // Set your Cesium ION default access token.
    // This is required to load Cesium's default base maps (imagery, terrain).
    // You can generate your own token at https://cesium.com/ion/
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjAxYjgwMy1mMzEwLTRiNjItOGYwNi0xZDY5YjQ0M2EzMDUiLCJpZCI6MTk2MTE4LCJpYXQiOjE3MDkzNTY2NzZ9.8NF5FNkIN0OdX1g0e-xt5hixv5luA-eGacY79a-ZpG4';

    // Initialize the Cesium Viewer in the 'cesiumContainer' div.
    const viewer = new Cesium.Viewer('cesiumContainer', {
        // --- Viewer options to simplify the UI ---

        animation: false, // Hide the animation widget
        baseLayerPicker: false, // Hide the base map picker
        fullscreenButton: false, // Hide the fullscreen button
        geocoder: false, // Hide the geocoder (search bar)
        homeButton: false, // Hide the home button
        infoBox: false, // Hide the info box on click
        sceneModePicker: false, // Hide the 3D/2D/Columbus view picker
        selectionIndicator: false, // Hide the green selection indicator
        timeline: false, // Hide the timeline
        navigationHelpButton: false, // Hide the navigation help button
        
        // --- Graphics options ---

        // We use a high-resolution base map for better visuals
        imageryProvider: new Cesium.IonImageryProvider({ assetId: 3954 }), // Sentinel-2 Blue Marble
        
        // Enable high-definition terrain
        terrainProvider: await Cesium.Terrain.fromWorldTerrain(),
    });

    // Add this line to remove the "Cesium" logo at the bottom
    viewer.cesiumWidget.creditContainer.style.display = 'none';

    console.log('Cesium viewer initialized.');

    // --- END OF STEP 2 ---
});