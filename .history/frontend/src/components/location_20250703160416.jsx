import React, { useState, useEffect } from "react";
import axios from "axios";

function GeolocationExample() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [clinics, setClinics] = useState([]);
  const [nearestClinic, setNearestClinic] = useState(null);
  const [error, setError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingClinics, setLoadingClinics] = useState(true);

  // Haversine formula
  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user location
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoadingLocation(false);
      },
      (err) => {
        setError("Failed to get location: " + err.message);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, []);

  // Fetch clinics from backend
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get("/api/v1/showAllPharmacies");
        setClinics(response.data);
      } catch (err) {
        setError("Failed to load clinic data.");
      } finally {
        setLoadingClinics(false);
      }
    };

    fetchClinics();
  }, []);

  // Calculate nearest clinic
  useEffect(() => {
    if (
      location.latitude !== null &&
      location.longitude !== null &&
      clinics.length > 0
    ) {
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

      {!error && loadingLocation && <p>Getting your location...</p>}
      {!error && loadingClinics && <p>Loading clinics...</p>}

      {!error && location.latitude && location.longitude && (
        <p>
          <strong>Your location:</strong> <br />
          Latitude: {location.latitude.toFixed(6)} <br />
          Longitude: {location.longitude.toFixed(6)}
        </p>
      )}

      {!error && nearestClinic && (
        <div style={{ marginTop: "20px" }}>
          <h2>Nearest Clinic</h2>
          <p>
            <strong>Name:</strong>{" "}
            {nearestClinic.pharmacyName || nearestClinic.name}
          </p>
          <p>
            <strong>Distance:</strong> {nearestClinic.distance.toFixed(2)} km
          </p>
        </div>
      )}
    </div>
  );
}

export default GeolocationExample;
