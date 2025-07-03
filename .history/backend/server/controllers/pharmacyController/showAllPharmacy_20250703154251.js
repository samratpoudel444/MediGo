import PharmacyTable from "../../db/models/pharmacyModel.js";

export const showAllPharmacy = async (req, res, next) => {
  try {
    const data = await PharmacyTable.find();

    const values = data.map(({ name, latitude, longitude }) => ({
      name,
      latitude,
      longitude,
    }));

   console.log(values);
  } catch (err) {
    next(err);
  }
};
