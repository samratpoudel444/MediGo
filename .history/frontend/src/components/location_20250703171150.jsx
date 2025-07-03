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


// Direct imports for Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Navbar from "./Navbar";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons
const pharmacyIcon = new L.Icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "pharmacy-marker",
});

const userIcon = new L.Icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "user-marker",
});

const PharmacyFinder = () => {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState({ location: true, pharmacies: true });
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [searchRadius, setSearchRadius] = useState(10);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const mapContainerRef = useRef(null);

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
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

  // Update map with markers
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
          errorMessage =
            "Location access denied. Please enable location services.";
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
        const pharmaciesData = response.data.data || [];
        setPharmacies(pharmaciesData);

        if (location) {
          const nearby = pharmaciesData.filter(
            (pharmacy) => pharmacy.distance <= searchRadius
          );
          setFilteredPharmacies(nearby);
          updateMap(location.latitude, location.longitude, nearby);
        } else {
          setFilteredPharmacies(pharmaciesData);
        }
      } catch (err) {
        console.error("Error fetching pharmacies:", err);
        setError(err.response?.data?.message || "Failed to load pharmacies");
      } finally {
        setLoading((prev) => ({ ...prev, pharmacies: false }));
      }
    };

    fetchPharmacies();
  }, [location, searchRadius, updateMap]);

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

  // Enhanced Radius Slider Component
  const RadiusSlider = () => {
    const radiusMarks = [1, 5, 10, 20, 30, 50];
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e) => {
      const radius = parseInt(e.target.value);
      setSearchRadius(radius);
      if (location) {
        setFilteredPharmacies(
          pharmacies.filter((pharmacy) => pharmacy.distance <= radius)
        );
      }
    };

    return (
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="radius"
            className="block text-sm font-medium text-gray-700"
          >
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
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
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
                    setFilteredPharmacies(
                      pharmacies.filter((pharmacy) => pharmacy.distance <= mark)
                    );
                  }
                }}
                className={`text-xs ${
                  searchRadius >= mark
                    ? "text-blue-600 font-bold"
                    : "text-gray-500"
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
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin className="text-blue-600" />
            Nearest Pharmacy Finder
          </h1>
          <p className="text-gray-600">
            Find pharmacies near your current location
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
          // <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          
            <div>
              {loading.location && <p className="text-blue-700"></p>}
              {loading.pharmacies && <p className="text-blue-700"></p>}
            </div>
          </div>
        )}

        <div
          ref={mapContainerRef}
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

        {location && <RadiusSlider />}

        {!loading.pharmacies && filteredPharmacies.length > 0 && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {location ? "Nearby Pharmacies" : "All Pharmacies"} (
              {filteredPharmacies.length})
            </h2>
            <div className="grid gap-4">
              {filteredPharmacies.map((pharmacy, index) => (
                <div
                  key={pharmacy._id || index}
                  className={`p-4 md:p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
                    index === 0 && location
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                        {pharmacy.pharmacyName}
                        {index === 0 && location && (
                          <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            NEAREST
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mb-2">{pharmacy.address}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                        {location && (
                          <div className="flex items-center gap-1">
                            <Navigation size={16} />
                            <span>{pharmacy.distance?.toFixed(2)} km away</span>
                          </div>
                        )}
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
                    {location && (
                      <button
                        onClick={() => openDirections(pharmacy)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 self-start"
                      >
                        <Navigation size={16} />
                        Directions
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading.pharmacies && filteredPharmacies.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">
              {location
                ? `No pharmacies found within ${searchRadius} km. Try increasing the search radius.`
                : "No pharmacies found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyFinder;
