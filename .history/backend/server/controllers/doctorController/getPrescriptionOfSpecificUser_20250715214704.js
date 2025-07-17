import prescriptionTable from "../../db/models/prescriptionModel.js";



export const getPrescriptionById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    const prescription = await prescriptionTable.findOne({
      userId: id,
    });
    if (!prescription) {
      return next({ code: 404, message: "prescription not found" });
    }

    return res.status(200).json({ message: prescription });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
