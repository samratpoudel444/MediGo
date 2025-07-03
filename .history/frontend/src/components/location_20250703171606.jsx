import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import axiosInstance from "./utils/AxiosInstance";
import { MapPin, Navigation, Clock, Phone, AlertCircle, Loader2 } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

// Direct imports for Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons
const pharmacyIcon = new L.Icon({
  iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "pharmacy-marker",
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "user-marker",
});

const PharmacyFinder = () => {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState({ location: true, pharmacies: true });
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [searchRadius, setSearchRadius] = useState(10);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const mapContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Memoize filtered pharmacies to prevent unnecessary recalculations
  const filteredPharmacies = useMemo(() => {
    if (!location) return pharmacies;
    return pharmacies.filter(pharmacy => pharmacy.distance <= searchRadius);
  }, [pharmacies, location, searchRadius]);

  // Initialize map
  const initMap = useCallback((lat, lng) => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        doubleClickZoom: true,
        closePopupOnClick: false,
      }).setView([lat, lng], 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add user marker
      L.marker([lat, lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("Your Location");
    } catch (err) {
      console.error("Map initialization error:", err);
      setError("Failed to initialize map");
    }
  }, []);

  // Debounced update map function
  const updateMap = useCallback((userLat, userLng, pharmaciesData) => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Center map on user location
    mapRef.current.setView([userLat, userLng], 13);

    // Add user marker
    const userMarker = L.marker([userLat, userLng], { icon: userIcon })
      .addTo(mapRef.current)
      .bindPopup("Your Location");
    markersRef.current.push(userMarker);

    // Add pharmacy markers
    pharmaciesData.forEach((pharmacy) => {
      const marker = L.marker([pharmacy.latitude, pharmacy.longitude], {
        icon: pharmacyIcon,
      }).addTo(mapRef.current).bindPopup(`
          <b>${pharmacy.pharmacyName}</b><br>
          ${pharmacy.address}<br>
          Distance: ${pharmacy.distance?.toFixed(2) || "N/A"} km
        `);
      markersRef.current.push(marker);
    });
  }, []);

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading((prev) => ({ ...prev, location: false }));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setLoading((prev) => ({ ...prev, location: false }));
      setError(null);
      initMap(latitude, longitude);
    };

    const errorHandler = (err) => {
      let errorMessage = "Failed to get location: ";
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please enable location services.";
          setPermissionDenied(true);
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable.";
          break;
        case err.TIMEOUT:
          errorMessage = "Location request timed out.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
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
  }, [initMap]);

  // Fetch pharmacies
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading((prev) => ({ ...prev, pharmacies: true }));

        let url = "/api/v1/showAllPharmacies";
        if (location) {
          url += `?lat=${location.latitude}&lng=${location.longitude}`;
        }

        const response = await axiosInstance.get(url);
        setPharmacies(response.data.data || []);
      } catch (err) {
        console.error("Error fetching pharmacies:", err);
        setError(err.response?.data?.message || "Failed to load pharmacies");
      } finally {
        setLoading((prev) => ({ ...prev, pharmacies: false }));
      }
    };

    fetchPharmacies();
  }, [location]);

  // Update map when filtered pharmacies change
  useEffect(() => {
    if (location && !isDragging) {
      updateMap(location.latitude, location.longitude, filteredPharmacies);
    }
  }, [filteredPharmacies, location, updateMap, isDragging]);

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

  // Handle radius change with debounce
  const handleRadiusChange = (e) => {
    const radius = parseInt(e.target.value);
    setSearchRadius(radius);
  };

  // Enhanced Radius Slider Component
  const RadiusSlider = () => {
    const radiusMarks = [1, 5, 10, 20, 30, 50];

    return (
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
            Search Radius: <span className="font-bold">{searchRadius} km</span>
          </label>
          <div className="text-xs text-gray-500">
            {filteredPharmacies.length} pharmacies found
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            id="radius"
            min="1"
            max="50"
            value={searchRadius}
            onChange={handleRadiusChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => {
              setIsDragging(false);
              if (location) {
                updateMap(location.latitude, location.longitude, filteredPharmacies);
              }
            }}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => {
              setIsDragging(false);
              if (location) {
                updateMap(location.latitude, location.longitude, filteredPharmacies);
              }
            }}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all ${
              isDragging ? "ring-2 ring-blue-500" : ""
            }`}
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                ((searchRadius - 1) / 49) * 100
              }%, #e5e7eb ${((searchRadius - 1) / 49) * 100}%, #e5e7eb 100%)`,
            }}
          />

          <div className="flex justify-between mt-2">
            {radiusMarks.map((mark) => (
              <button
                key={mark}
                onClick={() => {
                  setSearchRadius(mark);
                  if (location) {
                    updateMap(location.latitude, location.longitude, 
                      pharmacies.filter(pharmacy => pharmacy.distance <= mark)
                    );
                  }
                }}
                className={`text-xs ${
                  searchRadius >= mark ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                {mark}km
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white mt-24">
        {/* ... rest of the JSX remains the same ... */}
        {location && <RadiusSlider />}
        {/* ... rest of the JSX remains the same ... */}
      </div>
    </div>
  );
};

export default PharmacyFinder;