import PharmacyTable from "../../db/models/pharmacyModel";

export const approvePharmacy = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const checkIfPharmacyExist = await PharmacyTable.findOne({ _id: id });

    if (checkIfPharmacyExist) {
      await PharmacyTable.deleteOne({ _id: id });
      return res.status(201).json({ message: "Pharmacy Removed from system" });
    }

    return next({ code: 401, message: "Error Removing Pharmacy from system" });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
