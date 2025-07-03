import PharmacyTable from "../../db/models/pharmacyModel.js";

export const showAllPharmacy = async (req, res, next) => {
  try {
    const data = await PharmacyTable.find();

    const values = data.map(({ pharmacyName, latitude, longitude }) => ({
      pharmacyName,
      latitude,
      longitude,
    }));

   console.log(values);
  } catch (err) {
    next(err);
  }
};
