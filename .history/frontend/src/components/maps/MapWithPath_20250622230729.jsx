import {
	MapContainer,
	TileLayer,
	Marker,
	Polyline,
	useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

const pharmacies = [
	{ name: "Pharmacy A", lat: 27.719, lng: 85.327 },
	{ name: "Pharmacy B", lat: 27.715, lng: 85.321 },
	{ name: "Pharmacy C", lat: 27.72, lng: 85.329 },
];

const userLocation = { lat: 27.7172, lng: 85.324 };

function FitBounds({ path }) {
	const map = useMap();

	useEffect(() => {
		if (path.length > 1) {
			const bounds = path.map((p) => [p.lat, p.lng]);
			map.fitBounds(bounds);
		}
	}, [path, map]);

	return null;
}

export default function MapWithPath() {
	const [path, setPath] = useState([]);
	const [pharmacy, setPharmacy] = useState(null);

	useEffect(() => {
		const fetchPath = async () => {
			try {
				const mapBounds = [27.712, 27.724, 85.318, 85.332]; // [S, N, W, E]
				const res = await axios.post("http://localhost:3000/api/v1/astar", {
					user: userLocation,
					pharmacies,
					bounds: mapBounds,
				});
				// console.log(res);
				console.log("Received path:", res.data.path);
				console.log("Pharmacy:", res.data.pharmacy);
				setPath(res.data.path);
				setPharmacy(res.data.pharmacy);
			} catch (err) {
				console.error("Error fetching path:", err);
			}
		};

		fetchPath();
	}, []);

	return (
		<MapContainer
			center={[27.7172, 85.324]}
			zoom={15}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={[userLocation.lat, userLocation.lng]} />
			{pharmacy && <Marker position={[pharmacy.lat, pharmacy.lng]} />}
			{path.length > 0 && (
				<>
					<Polyline positions={path.map((p) => [p.lat, p.lng])} color="blue" />
					<FitBounds path={path} />
				</>
			)}
		</MapContainer>
	);
}
