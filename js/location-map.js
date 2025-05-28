function initializeLeafletMap() {
    // Coordonnées des bureaux
    const locations = {
        paris: {
            coords: [48.8706, 2.3186],
            name: "Bureau Paris",
            address: "13 rue du Faubourg Saint-Honoré<br>75008 Paris"
        },
        brest: {
            coords: [48.4000, -4.4833],
            name: "Bureau Brest",
            address: "55 quai de la douane<br>29200 Brest"
        },
        reunion: {
            coords: [-20.8823, 55.4504],
            name: "Bureau Saint-Denis",
            address: "1 rue de Paris<br>97400 Saint-Denis, La Réunion"
        }
    };

    // Initialiser la carte centrée sur la France
    const map = L.map('leaflet-map').setView([46.603354, 1.888334], 5);

    // Ajouter le fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 18
    }).addTo(map);

    // Style personnalisé pour les marqueurs
    const createCustomIcon = (color) => {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [15, 15],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });
    };

    // Ajouter les marqueurs
    const markers = {
        paris: L.marker(locations.paris.coords, {
            icon: createCustomIcon('#023047')
        }).addTo(map),
        brest: L.marker(locations.brest.coords, {
            icon: createCustomIcon('#219ebc')
        }).addTo(map),
        reunion: L.marker(locations.reunion.coords, {
            icon: createCustomIcon('#d4af37')
        }).addTo(map)
    };

    // Ajouter les popups
    Object.keys(locations).forEach(key => {
        const loc = locations[key];
        markers[key].bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <h4 style="margin: 0 0 10px 0; color: #023047;">${loc.name}</h4>
                <p style="margin: 0; font-size: 14px;">${loc.address}</p>
            </div>
        `);
    });

    // Créer un groupe de marqueurs pour ajuster la vue
    const group = new L.featureGroup(Object.values(markers));
    
    // Ajuster la vue pour voir tous les marqueurs avec un padding
    setTimeout(() => {
        map.fitBounds(group.getBounds().pad(0.1));
    }, 300);

    // Interaction avec la liste des bureaux
    const locationItems = document.querySelectorAll('.location-item');
    
    locationItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            if (locations[location] && markers[location]) {
                // Centrer la carte sur le bureau sélectionné
                map.setView(locations[location].coords, 12, {
                    animate: true,
                    duration: 1
                });
                // Ouvrir la popup
                markers[location].openPopup();
                
                // Mettre en évidence l'élément sélectionné
                locationItems.forEach(el => el.classList.remove('active'));
                this.classList.add('active');
            }
        });
        
        // Effet hover
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--light-bg)';
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });

    // Ajouter une ligne entre la France métropolitaine et La Réunion
    const polyline = L.polyline([
        locations.brest.coords,
        [35, 20], // Point intermédiaire pour courber la ligne
        locations.reunion.coords
    ], {
        color: '#d4af37',
        weight: 2,
        opacity: 1,
        dashArray: '10, 10',
        className: 'animated-line'
    }).addTo(map);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeLeafletMap, 100);
});