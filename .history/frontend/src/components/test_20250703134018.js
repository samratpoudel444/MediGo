if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
    //  alert(`Your location is:\nLatitude: ${lat}\nLongitude: ${lng}`);
    },
    (error) => {
      console.error("Error getting location:", error.message);
      //alert("Error getting location: " + error.message);
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}
