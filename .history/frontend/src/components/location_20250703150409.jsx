import React, { useState, useEffect } from "react";

function GeolocationExample() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return (
    <div>
      <h1>React Geolocation Example</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : !error ? (
        <p>Getting location...</p>
      ) : null}
    </div>
  );
}

export default GeolocationExample;
