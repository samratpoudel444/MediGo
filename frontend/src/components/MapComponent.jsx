import { FaMapMarkerAlt } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: <FaMapMarkerAlt />,
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function GeocoderControl({ setPosition, onSelect }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();

    const control = L.Control.geocoder({
      position: "topright",
      collapsed: false,
      placeholder: "Search location...",
      geocoder,
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        const { center, name } = e.geocode;
        map.setView(center, 14);
        setPosition([center.lat, center.lng]);
        onSelect?.({ lat: center.lat, lng: center.lng });
      })
      .addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, setPosition, onSelect]);

  return null;
}

function LocationClickMarker({ position, setPosition, onSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onSelect?.({ lat, lng });
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
      </Popup>
    </Marker>
  ) : null;
}

export default function MapWithMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  return (
    <MapContainer
      center={[27.7172, 85.324]} // Kathmandu default
      zoom={13}
      className="h-96 w-full rounded-lg z-0"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeocoderControl setPosition={setPosition} onSelect={onSelect} />
      <LocationClickMarker
        position={position}
        setPosition={setPosition}
        onSelect={onSelect}
      />
    </MapContainer>
  );
}
