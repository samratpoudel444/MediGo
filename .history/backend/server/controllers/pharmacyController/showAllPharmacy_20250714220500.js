
import PharmacyTable from "../../db/models/pharmacyModel.js";
import { findNearbyPharmacies } from "./utils/geoUtils.js";


const getAllPharmacies = async () => {
  const pharmacies = await PharmacyTable.find();
  if (!pharmacies || pharmacies.length === 0) {
    throw new Error("No pharmacies found");
  }
  return pharmacies;
};


const formatPharmacyResponse = (pharmacies) => {
  return pharmacies.map(
    ({
      pharmacyName,
      latitude,
      longitude,
      address,
      phone,
      hours,
      distance,
    }) => ({
      pharmacyName,
      latitude,
      longitude,
      address,
      phone,
      hours,
      distance: distance ? parseFloat(distance.toFixed(2)) : null,
    })
  );
};


export const showAllPharmacy = async (req, res, next) => {
  try {

    const pharmacies = await getAllPharmacies();

    let result;
    if (req.query.lat && req.query.lng) {
      const location = {
        latitude: parseFloat(req.query.lat),
        longitude: parseFloat(req.query.lng),
      };
      result = findNearbyPharmacies(pharmacies, location);
    } else {
      result = pharmacies;
    }

    const formattedResponse = formatPharmacyResponse(result);

    res.status(200).json({
      success: true,
      count: formattedResponse.length,
      data: formattedResponse,
    });
  } catch (err) {
    next({
      code: err.message === "No pharmacies found" ? 404 : 500,
      message: err.message || "Failed to fetch pharmacies",
    });
  }
};
