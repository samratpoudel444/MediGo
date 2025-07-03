import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "./utils/AxiosInstance";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  AlertCircle,
  Loader2,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icons
const pharmacyIcon = L.icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userIcon = L.icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "user-marker",
});

function PharmacyFinder() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [pharmacies, setPharmacies] = useState([]);
  const [nearestPharmacies, setNearestPharmacies] = useState([]);
  const [error, setError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingPharmacies, setLoadingPharmacies] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

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

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoadingLocation(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, 
    };

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setLoadingLocation(false);
      setError(null);


      if (!mapRef.current) {
        initMap(latitude, longitude);
      } else {
        updateMap(latitude, longitude);
      }
    };

    const errorHandler = (err) => {
      let errorMessage = "Failed to get location: ";
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = "Location access denied by user";
          setPermissionDenied(true);
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable";
          break;
        case err.TIMEOUT:
          errorMessage = "Location request timed out";
          break;
        default:
          errorMessage = "An unknown error occurred";
          break;
      }
      setError(errorMessage);
      setLoadingLocation(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);


  const initMap = (lat, lng) => {
    const map = L.map("pharmacy-map").setView([lat, lng], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add user marker
    L.marker([lat, lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("Your Location");
  };

  // Update map view when location changes
  const updateMap = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 13);

      // Clear existing markers except user marker
      markersRef.current.forEach((marker) => {
        mapRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add user marker
      const userMarker = L.marker([lat, lng], { icon: userIcon })
        .addTo(mapRef.current)
        .bindPopup("Your Location");
      markersRef.current.push(userMarker);
    }
  };

  // Fetch pharmacies from API
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoadingPharmacies(true);
        const response = await axiosInstance.get("/api/v1/showAllPharmacies");
        console.log(""response)
        setPharmacies(response.data);
        setLoadingPharmacies(false);
      } catch (err) {
        setError("Failed to load pharmacy data. Please try again later.");
        setLoadingPharmacies(false);
      }
    };

    fetchPharmacies();
  }, []);

  // Calculate nearest pharmacies and update map markers
  useEffect(() => {
    if (
      location.latitude !== null &&
      location.longitude !== null &&
      pharmacies.length > 0
    ) {
      // Calculate distances
      const distances = pharmacies.map((pharmacy) => {
        const distance = getDistanceInKm(
          location.latitude,
          location.longitude,
          pharmacy.latitude,
          pharmacy.longitude
        );
        return { ...pharmacy, distance };
      });

      // Sort by distance
      distances.sort((a, b) => a.distance - b.distance);
      setNearestPharmacies(distances.slice(0, 3)); // Show top 3 nearest

      // Add markers to map
      if (mapRef.current) {
        distances.slice(0, 10).forEach((pharmacy) => {
          // Show top 10 on map
          const marker = L.marker([pharmacy.latitude, pharmacy.longitude], {
            icon: pharmacyIcon,
          })
            .addTo(mapRef.current)
            .bindPopup(
              `<b>${pharmacy.pharmacyName}</b><br>${pharmacy.address}`
            );
          markersRef.current.push(marker);
        });
      }
    }
  }, [location, pharmacies]);

  const requestLocationAgain = () => {
    setLoadingLocation(true);
    setError(null);
    setPermissionDenied(false);

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
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const openDirections = (pharmacy) => {
    if (location.latitude && location.longitude) {
      const url = `https://www.openstreetmap.org/directions?engine=osrm_car&route=${location.latitude},${location.longitude};${pharmacy.latitude},${pharmacy.longitude}`;
      window.open(url, "_blank");
    } else {
      toast.error("Unable to determine your current location");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="text-blue-600" />
          Nearest Pharmacy Finder
        </h1>
        <p className="text-gray-600">
          Find the closest pharmacies and medical stores near your location
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle
            className="text-red-500 mt-0.5 flex-shrink-0"
            size={20}
          />
          <div>
            <p className="text-red-700 font-medium">Error</p>
            <p className="text-red-600">{error}</p>
            {permissionDenied && (
              <button
                onClick={requestLocationAgain}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      {!error && (loadingLocation || loadingPharmacies) && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Loader2 className="text-blue-500 animate-spin" size={20} />
          <div>
            {loadingLocation && (
              <p className="text-blue-700">Getting your location...</p>
            )}
            {loadingPharmacies && (
              <p className="text-blue-700">Loading nearby pharmacies...</p>
            )}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        id="pharmacy-map"
        className="h-96 mb-6 rounded-lg border border-gray-200"
      >
        {/* Leaflet map will be rendered here */}
      </div>

      {!error && location.latitude && location.longitude && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Navigation className="text-green-600" size={20} />
            Your Location
          </h2>
          <div className="text-green-700">
            <p>Latitude: {location.latitude.toFixed(6)}</p>
            <p>Longitude: {location.longitude.toFixed(6)}</p>
          </div>
        </div>
      )}

      {!error && nearestPharmacies.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nearest Pharmacies ({nearestPharmacies.length} found)
          </h2>
          <div className="grid gap-4">
            {nearestPharmacies.map((pharmacy, index) => (
              <div
                key={pharmacy.id}
                className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
                  index === 0
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {pharmacy.pharmacyName}
                      {index === 0 && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          NEAREST
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 mb-2">{pharmacy.address}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Navigation size={16} />
                        <span>{pharmacy.distance.toFixed(2)} km away</span>
                      </div>
                      {pharmacy.hours && (
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{pharmacy.hours}</span>
                        </div>
                      )}
                      {pharmacy.phone && (
                        <div className="flex items-center gap-1">
                          <Phone size={16} />
                          <span>{pharmacy.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => openDirections(pharmacy)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Navigation size={16} />
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!error &&
        !loadingLocation &&
        !loadingPharmacies &&
        nearestPharmacies.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">
              No pharmacies found nearby. Please try again later.
            </p>
          </div>
        )}
    </div>
  );
}

export default PharmacyFinder;
