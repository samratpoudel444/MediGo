import React, { useState, useEffect } from "react";
import axios from "axios";

function GeolocationExample() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [clinics, setClinics] = useState([]);
  const [nearestClinic, setNearestClinic] = useState(null);
  const [error, setError] = useState(null);

  // Haversine formula
  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's current location
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  // Fetch clinics using Axios
  useEffect(() => {
    async function fetchClinics() {
      try {
        const response = await axios.get(
          "https://your-backend.com/api/clinics"
        );
        setClinics(response.data);
      } catch (err) {
        setError("Failed to load clinic data.");
      }
    }

    fetchClinics();
  }, []);

  // Calculate nearest clinic
  useEffect(() => {
    if (location.latitude && clinics.length > 0) {
      const distances = clinics.map((clinic) => {
        const distance = getDistanceInKm(
          location.latitude,
          location.longitude,
          clinic.latitude,
          clinic.longitude
        );
        return { ...clinic, distance };
      });

      distances.sort((a, b) => a.distance - b.distance);
      setNearestClinic(distances[0]);
    }
  }, [location, clinics]);

  return (
    <div>
      <h1>React Geolocation + Nearest Clinic</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {location.latitude && location.longitude && (
        <p>
          Your location: <br />
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      )}

      {nearestClinic ? (
        <div style={{ marginTop: "20px" }}>
          <h2>Nearest Clinic</h2>
          <p>🏥 Name: {nearestClinic.name}</p>
          <p>📍 Distance: {nearestClinic.distance.toFixed(2)} km</p>
        </div>
      ) : (
        location.latitude && !error && <p>Finding nearest clinic...</p>
      )}
    </div>
  );
}

export default GeolocationExample;
