import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  AlertCircle,
  Loader2,
} from "lucide-react";

function GeolocationExample() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [clinics, setClinics] = useState([]);
  const [nearestClinics, setNearestClinics] = useState([]);
  const [error, setError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Mock data (same as before)
  const mockClinics = [
    /* ... */
  ];

  // Haversine formula (same as before)
  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    /* ... */
  };

  // Geolocation useEffect (same as before)
  useEffect(() => {
    /* ... */
  }, []);

  // Fetch clinics (same as before)
  useEffect(() => {
    /* ... */
  }, []);

  // Calculate nearest clinics (same as before)
  useEffect(() => {
    /* ... */
  }, [location, clinics]);

  // Fixed: Now includes origin (your location) in Google Maps URL
  const openInMaps = (clinic) => {
    if (!location.latitude || !location.longitude) {
      alert("Your location is not available. Please enable location access.");
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${clinic.latitude},${clinic.longitude}&travelmode=driving`;
    window.open(url, "_blank");
  };

  // Rest of the component (same as before)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* ... existing JSX ... */}

      {/* Example clinic card with directions button */}
      {nearestClinics.map((clinic) => (
        <div key={clinic.id} className="p-4 border rounded-lg mb-3">
          <h3>{clinic.pharmacyName}</h3>
          <p>{clinic.address}</p>
          <p>{clinic.distance.toFixed(2)} km away</p>
          <button
            onClick={() => openInMaps(clinic)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Navigation size={16} />
            Get Directions (Driving)
          </button>
        </div>
      ))}
    </div>
  );
}

export default GeolocationExample;
