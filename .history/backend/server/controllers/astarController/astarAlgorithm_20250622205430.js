// Haversine distance
const haversine = (a, b) => {
	const R = 6371e3;
	const toRad = (d) => (d * Math.PI) / 180;
	const dLat = toRad(b.lat - a.lat);
	const dLng = toRad(b.lng - a.lng);
	const h =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

// Basic grid A* algorithm
function astar(grid, start, end) {
	const open = [start];
	start.visited = true;

	while (open.length > 0) {
		open.sort((a, b) => a.f - b.f);
		const current = open.shift();

		if (current === end) {
			const path = [];
			let curr = current;
			while (curr.parent) {
				path.push(curr);
				curr = curr.parent;
			}
			path.push(start);
			return path.reverse();
		}

		current.closed = true;

		const dirs = [
			[0, 1],
			[1, 0],
			[-1, 0],
			[0, -1],
		];
		for (let [dx, dy] of dirs) {
			const nx = current.x + dx;
			const ny = current.y + dy;
			if (!grid[ny] || !grid[ny][nx]) continue;

			const neighbor = grid[ny][nx];
			if (neighbor.closed) continue;

			const tentativeG = current.g + 1;

			if (!neighbor.visited || tentativeG < neighbor.g) {
				neighbor.visited = true;
				neighbor.parent = current;
				neighbor.g = tentativeG;
				neighbor.h = haversine(neighbor, end);
				neighbor.f = neighbor.g + neighbor.h;
				if (!open.includes(neighbor)) open.push(neighbor);
			}
		}
	}

	return [];
}

// Convert GPS to nearest grid cell
function findClosest(lat, lng, grid) {
	let closest = null,
		min = Infinity;
	for (let row of grid) {
		for (let node of row) {
			const d = haversine({ lat, lng }, node);
			if (d < min) {
				min = d;
				closest = node;
			}
		}
	}
	return closest;
}

// Create grid
function makeGrid(bounds, cols, rows) {
	const [south, north, west, east] = bounds;
	const grid = [];
	const latStep = (north - south) / rows;
	const lngStep = (east - west) / cols;

	for (let y = 0; y < rows; y++) {
		const row = [];
		for (let x = 0; x < cols; x++) {
			row.push({
				x,
				y,
				lat: south + y * latStep,
				lng: west + x * lngStep,
				f: 0,
				g: 0,
				h: 0,
				visited: false,
				closed: false,
				parent: null,
				cost: 1,
			});
		}
		grid.push(row);
	}
	return grid;
}

export const astarAlgorithm = (req, res) => {
	try {
		const { user, pharmacies, bounds } = req.body;

		const grid = makeGrid(bounds, 30, 30);
		const start = findClosest(user.lat, user.lng, grid);

		let bestPath = null;
		let nearest = null;
		let minDist = Infinity;

		for (const p of pharmacies) {
			for (let row of grid) {
				for (let node of row) {
					node.f = node.g = node.h = 0;
					node.visited = node.closed = false;
					node.parent = null;
				}
			}

			const end = findClosest(p.lat, p.lng, grid);
			const path = astar(grid, start, end);

			if (path.length > 0) {
				const dist = path.reduce(
					(sum, cur, i, arr) =>
						i === 0 ? 0 : sum + haversine(arr[i - 1], cur),
					0
				);

				if (dist < minDist) {
					minDist = dist;
					bestPath = path;
					nearest = p;
				}
			}
		}

		res.json({
			path: bestPath.map((n) => ({ lat: n.lat, lng: n.lng })),
			pharmacy: nearest,
		});
	} catch (error) {
		console.log("Error in code");
        clg
	}
};
