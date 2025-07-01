import PharmacyTable from "../../db/models/pharmacyModel.js";

export const approvePharmacy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkIfPharmacyExist = await PharmacyTable.findOne({ _id: id });

    if (checkIfPharmacyExist) {
      await PharmacyTable.updateOne({ isApproved: false });
      return res.status(201).json({ message: "Approved in system" });
    }

    return next({ code: 401, message: "Error Occured approving pharmacy" });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
