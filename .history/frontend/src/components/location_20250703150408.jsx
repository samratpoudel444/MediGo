import React, { useState, useEffect } from "react";

function GeolocationExample() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: false, // faster, less accurate
        timeout: 5000,             // max wait time in ms
        maximumAge: 0              // do not use cached location
      }
    );
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>React Geolocation Example</h1>

      {loading && <p>🔄 Getting your location...</p>}

      {error && (
        <p style={{ color: "red" }}>❌ Error: {error}</p>
      )}

      {location.latitude && location.longitude && !loading && !error && (
        <div>
          <p>✅ Location found:</p>
          <p>📍 Latitude: {location.latitude}</p>
          <p>📍 Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default GeolocationExample;
