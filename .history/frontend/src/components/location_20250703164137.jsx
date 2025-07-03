import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { toast } from "react-toastify";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom pharmacy icon
const pharmacyIcon = new L.Icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const PharmacyFinder = () => {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [nearestPharmacies, setNearestPharmacies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({
    location: true,
    pharmacies: true,
  });
  const [permissionDenied, setPermissionDenied] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Calculate distance between two coordinates
  const getDistanceInKm = useCallback((lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  // Initialize map
  const initMap = useCallback((lat, lng) => {
    if (mapRef.current) return;

    const map = L.map("pharmacy-map", {
      zoomControl: true,
      doubleClickZoom: false,
      closePopupOnClick: false,
    }).setView([lat, lng], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add user marker
    L.marker([lat, lng], {
      icon: new L.Icon({
        iconUrl:
          "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        iconSize: [32, 32],
        className: "user-marker",
      }),
    })
      .addTo(map)
      .bindPopup("Your Location");
  }, []);

  // Update map with new location
  const updateMap = useCallback((lat, lng) => {
    if (!mapRef.current) return;

    mapRef.current.setView([lat, lng], 13);

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add user marker
    const userMarker = L.marker([lat, lng], {
      icon: new L.Icon({
        iconUrl:
          "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        iconSize: [32, 32],
        className: "user-marker",
      }),
    })
      .addTo(mapRef.current)
      .bindPopup("Your Location");
    markersRef.current.push(userMarker);
  }, []);

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading((prev) => ({ ...prev, location: false }));
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
      setError(null);
      setLoading((prev) => ({ ...prev, location: false }));

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
      setLoading((prev) => ({ ...prev, location: false }));
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
  }, [initMap, updateMap]);

  // Fetch pharmacies from API
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/showAllPharmacies");
        if (response.data && Array.isArray(response.data)) {
          setPharmacies(response.data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Error fetching pharmacies:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load pharmacy data. Please try again later."
        );
      } finally {
        setLoading((prev) => ({ ...prev, pharmacies: false }));
      }
    };

    fetchPharmacies();
  }, []);

  // Calculate nearest pharmacies
  useEffect(() => {
    if (!location || !pharmacies.length) return;

    try {
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
      setNearestPharmacies(distances.slice(0, 3));

      // Add markers to map
      if (mapRef.current) {
        distances.slice(0, 10).forEach((pharmacy) => {
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
    } catch (err) {
      console.error("Error calculating distances:", err);
      setError("Error processing pharmacy locations");
    }
  }, [location, pharmacies, getDistanceInKm]);

  const requestLocationAgain = () => {
    setLoading((prev) => ({ ...prev, location: true }));
    setError(null);
    setPermissionDenied(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading((prev) => ({ ...prev, location: false }));
      },
      (err) => {
        setError("Failed to get location: " + err.message);
        setLoading((prev) => ({ ...prev, location: false }));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const openDirections = (pharmacy) => {
    if (!location) {
      toast.error("Unable to determine your current location");
      return;
    }
    const url = `https://www.openstreetmap.org/directions?engine=osrm_car&route=${location.latitude},${location.longitude};${pharmacy.latitude},${pharmacy.longitude}`;
    window.open(url, "_blank");
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

      {(loading.location || loading.pharmacies) && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Loader2 className="text-blue-500 animate-spin" size={20} />
          <div>
            {loading.location && (
              <p className="text-blue-700">Getting your location...</p>
            )}
            {loading.pharmacies && (
              <p className="text-blue-700">Loading nearby pharmacies...</p>
            )}
          </div>
        </div>
      )}

      <div
        id="pharmacy-map"
        className="h-96 mb-6 rounded-lg border border-gray-200"
      />

      {location && (
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

      {!loading.pharmacies && nearestPharmacies.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nearest Pharmacies ({nearestPharmacies.length} found)
          </h2>
          <div className="grid gap-4">
            {nearestPharmacies.map((pharmacy, index) => (
              <div
                key={pharmacy.id || index}
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
                        <span>
                          {pharmacy.distance?.toFixed(2) || "N/A"} km away
                        </span>
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

      {!loading.pharmacies &&
        !loading.location &&
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
};

export default PharmacyFinder;
