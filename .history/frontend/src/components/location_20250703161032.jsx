import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Phone, AlertCircle, Loader2 } from "lucide-react";

function GeolocationExample() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [clinics, setClinics] = useState([]);
  const [nearestClinics, setNearestClinics] = useState([]);
  const [error, setError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Mock data for demonstration since we can't access the real API
  const mockClinics = [
    {
      id: 1,
      pharmacyName: "City Health Pharmacy",
      latitude: 27.7172,
      longitude: 85.3240,
      address: "New Road, Kathmandu",
      phone: "+977-1-4225566",
      hours: "8:00 AM - 10:00 PM"
    },
    {
      id: 2,
      pharmacyName: "Kathmandu Medical Store",
      latitude: 27.7089,
      longitude: 85.3206,
      address: "Durbar Marg, Kathmandu",
      phone: "+977-1-4411234",
      hours: "9:00 AM - 9:00 PM"
    },
    {
      id: 3,
      pharmacyName: "Patan Pharmacy",
      latitude: 27.6588,
      longitude: 85.3247,
      address: "Patan Dhoka, Lalitpur",
      phone: "+977-1-5521789",
      hours: "7:00 AM - 11:00 PM"
    },
    {
      id: 4,
      pharmacyName: "Bhaktapur Medical Center",
      latitude: 27.6710,
      longitude: 85.4298,
      address: "Durbar Square, Bhaktapur",
      phone: "+977-1-6610987",
      hours: "8:30 AM - 8:30 PM"
    },
    {
      id: 5,
      pharmacyName: "Thamel Health Store",
      latitude: 27.7151,
      longitude: 85.3112,
      address: "Thamel, Kathmandu",
      phone: "+977-1-4700123",
      hours: "24/7"
    }
  ];

  // Haversine formula for calculating distance
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

  // Get user location with better error handling
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser");
      setLoadingLocation(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoadingLocation(false);
        setError(null);
      },
      (err) => {
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
      },
      options
    );
  }, []);

  // Fetch clinics (using mock data for demonstration)
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real implementation, uncomment this:
        // const response = await axios.get("/api/v1/showAllPharmacies");
        // setClinics(response.data);
        
        // Using mock data for demonstration
        setClinics(mockClinics);
      } catch (err) {
        setError("Failed to load clinic data. Please try again later.");
      } finally {
        setLoadingClinics(false);
      }
    };

    fetchClinics();
  }, []);

  // Calculate nearest clinics (show top 3)
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
      setNearestClinics(distances.slice(0, 3)); // Show top 3 nearest
    }
  }, [location, clinics]);

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

  const openInMaps = (clinic) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${clinic.latitude},${clinic.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="text-blue-600" />
          Nearest Pharmacy Finder
        </h1>
        <p className="text-gray-600">Find the closest pharmacies and medical stores near your location</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
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

      {!error && (loadingLocation || loadingClinics) && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Loader2 className="text-blue-500 animate-spin" size={20} />
          <div>
            {loadingLocation && <p className="text-blue-700">Getting your location...</p>}
            {loadingClinics && <p className="text-blue-700">Loading nearby pharmacies...</p>}
          </div>
        </div>
      )}

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

      {!error && nearestClinics.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nearest Pharmacies ({nearestClinics.length} found)
          </h2>
          <div className="grid gap-4">
            {nearestClinics.map((clinic, index) => (
              <div
                key={clinic.id}
                className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
                  index === 0 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {clinic.pharmacyName || clinic.name}
                      {index === 0 && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          NEAREST
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 mb-2">{clinic.address}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Navigation size={16} />
                        <span>{clinic.distance.toFixed(2)} km away</span>
                      </div>
                      {clinic.hours && (
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{clinic.hours}</span>
                        </div>
                      )}
                      {clinic.phone && (
                        <div className="flex items-center gap-1">
                          <Phone size={16} />
                          <span>{clinic.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => openInMaps(clinic)}
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

      {!error && !loadingLocation && !loadingClinics && nearestClinics.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No pharmacies found nearby. Please try again later.</p>
        </div>
      )}
    </div>
  );
}

export default GeolocationExample;