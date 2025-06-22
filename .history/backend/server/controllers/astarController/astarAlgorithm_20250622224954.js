// Haversine distance
// utils.js
// import roadGraph from './roadGraph.json' assert { type: 'json' };
import { readFileSync } from 'fs';

const roadGraphPath = path.resolve('C:/Users/luint/OneDrive/Desktop/MediGo/backend/roadGraph.json');
const roadGraph = JSON.parse(readFileSync(roadGraphPath, 'utf-8'));

function haversine(a, b) {
	const R = 6371e3;
	const toRad = (d) => (d * Math.PI) / 180;
	const dLat = toRad(b.lat - a.lat);
	const dLng = toRad(b.lng - a.lng);
	const h =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Basic grid A* algorithm
// function astar(grid, start, end) {
// 	const open = [start];
// 	start.visited = true;

// 	while (open.length > 0) {
// 		open.sort((a, b) => a.f - b.f);
// 		const current = open.shift();

// 		if (current === end) {
// 			const path = [];
// 			let curr = current;
// 			while (curr.parent) {
// 				path.push(curr);
// 				curr = curr.parent;
// 			}
// 			path.push(start);
// 			return path.reverse();
// 		}

// 		current.closed = true;

// 		const dirs = [
// 			[0, 1],
// 			[1, 0],
// 			[-1, 0],
// 			[0, -1],
// 		];
// 		for (let [dx, dy] of dirs) {
// 			const nx = current.x + dx;
// 			const ny = current.y + dy;
// 			if (!grid[ny] || !grid[ny][nx]) continue;

// 			const neighbor = grid[ny][nx];
// 			if (neighbor.closed) continue;

// 			const tentativeG = current.g + 1;

// 			if (!neighbor.visited || tentativeG < neighbor.g) {
// 				neighbor.visited = true;
// 				neighbor.parent = current;
// 				neighbor.g = tentativeG;
// 				neighbor.h = haversine(neighbor, end);
// 				neighbor.f = neighbor.g + neighbor.h;
// 				if (!open.includes(neighbor)) open.push(neighbor);
// 			}
// 		}
// 	}

// 	return [];
// }

// Convert GPS to nearest grid cell
function findNearestNode(lat, lng, graph) {
	let min = Infinity,
		nearest = null;
	for (const id in graph.nodes) {
		const node = graph.nodes[id];
		const d = haversine({ lat, lng }, node);
		if (d < min) {
			min = d;
			nearest = id;
		}
	}
	return nearest;
}

function aStar(graph, startId, endId) {
	const openSet = new Set([startId]);
	const cameFrom = {};
	const gScore = {},
		fScore = {};

	for (const id in graph.nodes) {
		gScore[id] = Infinity;
		fScore[id] = Infinity;
	}
	gScore[startId] = 0;
	fScore[startId] = haversine(graph.nodes[startId], graph.nodes[endId]);

	while (openSet.size > 0) {
		const current = [...openSet].reduce((a, b) =>
			fScore[a] < fScore[b] ? a : b
		);

		if (current === endId) {
			const path = [];
			let curr = current;
			while (curr) {
				path.unshift(graph.nodes[curr]);
				curr = cameFrom[curr];
			}
			return path;
		}

		openSet.delete(current);

		for (const neighbor of graph.nodes[current].neighbors) {
			const tentativeG = gScore[current] + neighbor.cost;

			if (tentativeG < gScore[neighbor.id]) {
				cameFrom[neighbor.id] = current;
				gScore[neighbor.id] = tentativeG;
				fScore[neighbor.id] =
					tentativeG + haversine(graph.nodes[neighbor.id], graph.nodes[endId]);
				openSet.add(neighbor.id);
			}
		}
	}

	return [];
}

// Create grid
// function makeGrid(bounds, cols, rows) {
// 	const [south, north, west, east] = bounds;
// 	const grid = [];
// 	const latStep = (north - south) / rows;
// 	const lngStep = (east - west) / cols;

// 	for (let y = 0; y < rows; y++) {
// 		const row = [];
// 		for (let x = 0; x < cols; x++) {
// 			row.push({
// 				x,
// 				y,
// 				lat: south + y * latStep,
// 				lng: west + x * lngStep,
// 				f: 0,
// 				g: 0,
// 				h: 0,
// 				visited: false,
// 				closed: false,
// 				parent: null,
// 				cost: 1,
// 			});
// 		}
// 		grid.push(row);
// 	}
// 	return grid;
// }

export const astarAlgorithm = (req, res) => {
	try {
		const { user, pharmacies } = req.body;
		const startId = findNearestNode(user.lat, user.lng, roadGraph);

		let bestPath = null;
		let nearestPharmacy = null;
		let minDistance = Infinity;

		for (const p of pharmacies) {
			const endId = findNearestNode(p.lat, p.lng, roadGraph);
			const path = aStar(roadGraph, startId, endId);

			if (path.length > 0) {
				const dist = path.reduce(
					(sum, node, i, arr) =>
						i === 0 ? 0 : sum + haversine(arr[i - 1], node),
					0
				);

				if (dist < minDistance) {
					minDistance = dist;
					bestPath = path;
					nearestPharmacy = p;
				}
			}
		}

		res.json({
			path: bestPath.map((n) => ({ lat: n.lat, lng: n.lng })),
			pharmacy: nearestPharmacy,
		});
	} catch (error) {
		console.log(error.message);
	}
};
