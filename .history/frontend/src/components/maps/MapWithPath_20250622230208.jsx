import {
	MapContainer,
	TileLayer,
	Marker,
	Polyline,
	useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";

const redIcon = new L.Icon({
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	shadowSize: [41, 41],
});

const pharmacies = [
	{ name: "Pharmacy A", lat: 27.719, lng: 85.327 },
	{ name: "Pharmacy B", lat: 27.715, lng: 85.321 },
	{ name: "Pharmacy C", lat: 27.72, lng: 85.329 },
];

const userLocation = { lat: 27.7172, lng: 85.324 };

export default function MapWithPath() {
	const [path, setPath] = useState([]);
	const [pharmacy, setPharmacy] = useState(null);

	useEffect(() => {
		const fetchPath = async () => {
			const res = await axios.post("http://localhost:3000/api/v1/astar", {
				user: userLocation,
				pharmacies,
				bounds: [27.712, 27.724, 85.318, 85.332],
			});
			setPath(res.data.path);
			setPharmacy(res.data.pharmacy);
		};

		fetchPath();
	}, []);

	return (
		<MapContainer center={[27.7172, 85.324]} zoom={15} style={{ height: "100vh" }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={[userLocation.lat, userLocation.lng]} />
			{pharmacy && <Marker position={[pharmacy.lat, pharmacy.lng]} icon={redIcon} />}
			{path.length > 0 && (
				<>
					<Polyline positions={path.map((p) => [p.lat, p.lng])} color="blue" />
					{path.map((point, i) => (
						<Marker key={i} position={[point.lat, point.lng]} icon={redIcon} />
					))}
				</>
			)}
		</MapContainer>
	);
}
