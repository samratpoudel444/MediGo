//Demerau Levenstien formula

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};


const toRad = (value) => (value * Math.PI) / 180;


export const findNearbyPharmacies = (pharmacies, location, radius = 10) => {
  return pharmacies
    .map((pharmacy) => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        pharmacy.latitude,
        pharmacy.longitude
      );
      return { ...pharmacy._doc, distance };
    })
    .filter((pharmacy) => pharmacy.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
};
