// KPU Surrey Library coordinates
//    lat: 49.1895,
//    lng: -122.8488





let map, infoWindow;

function initMap() {
	var KPUSurreyLibrary = {lat: 49.1895, lng: -122.8488}; 
  map = new google.maps.Map(document.getElementById("map"), {
    center: KPUSurreyLibrary,
    zoom: 10,
  });
  var marker = new google.maps.Marker({ 
          position: KPUSurreyLibrary, 
          map: map 
        }); 
		
function calculateDistance(mk1, mk2) {
      var R = 6371; // Radius of the Earth in kilometers
      var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
      var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Click to get Current Location and distance to KPU Surrey Library";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          var Usermarker = new google.maps.Marker({ 
          position: pos, 
          map: map 
        }); 
		// Calculate the distance to KPU Surrey Library
    const distance = calculateDistance(marker,Usermarker);
	document.getElementById('distance').innerHTML = "Distance between your location and KPU Surrey Library is " + distance.toFixed(2) + " km.";
		
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

window.initMap = initMap;
