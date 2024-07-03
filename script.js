// KPU Surrey Library coordinates
//    49.13212607649099, -122.87140688171662


function adjustFontSize() {
  const baseSize = 16;
  const currentWidth = window.innerWidth;
  const newSize = baseSize * (currentWidth / 1200);
  document.documentElement.style.fontSize = `${newSize}px`;
}

window.addEventListener('resize', adjustFontSize);
adjustFontSize();

let map;
let marker;
let userMarker;

    function initMap() {
        // Initial map options
        const mapOptions = {
          center: { lat: 49.13212607649099, lng: -122.87140688171662 },
          zoom: 15,
        };

        // Create the map
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Create a marker for KPU Surrey Library
        marker = new google.maps.Marker({
          position: { lat: 49.13212607649099, lng: -122.87140688171662 },
          map: map,
          title: "KPU Surrey Library"
        });

        // Watch the user's position
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              if (userMarker) {
                userMarker.setPosition(pos);
              } else {
                userMarker = new google.maps.Marker({
                  position: pos,
                  map: map,
                  title: "Your Location"
                });
              }

              // Center the map on the user's position
              map.setCenter(pos);

              // Calculate the distance to KPU Surrey Library
              const distance = calculateDistance(marker.getPosition(), userMarker.getPosition());
              document.getElementById('distance').innerHTML = 
                `Distance between your location and KPU Surrey Library is ${distance.toFixed(2)} km.`;
            },
            () => {
              handleLocationError(true, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, map.getCenter());
        }
      }

      function calculateDistance(pos1, pos2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = deg2rad(pos2.lat() - pos1.lat());
        const dLng = deg2rad(pos2.lng() - pos1.lng());
        const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(pos1.lat())) * Math.cos(deg2rad(pos2.lat())) * 
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      function handleLocationError(browserHasGeolocation, pos) {
        const infoWindow = new google.maps.InfoWindow({
          content: browserHasGeolocation 
            ? 'Error: The Geolocation service failed.' 
            : 'Error: Your browser doesn\'t support geolocation.',
          position: pos
        });
        infoWindow.open(map);
      }
