document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    // Add a blank base layer to Leaflet
    L.tileLayer('data:image/png;base64,...', { // Use a transparent tile layer
        maxZoom: 18,
        attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(map);

    // Load the SVG map
    fetch('map.svg')
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgElement = parser.parseFromString(svgText, 'image/svg+xml').documentElement;
            const svgLayer = L.svgOverlay(svgElement, [[-500, -500], [500, 500]]);
            svgLayer.addTo(map);

            // Add click event listeners to the graves
            const graves = svgElement.querySelectorAll('.grave');
            graves.forEach(grave => {
                grave.addEventListener('click', () => {
                    grave.classList.toggle('watered');
                });
            });
        });
});
