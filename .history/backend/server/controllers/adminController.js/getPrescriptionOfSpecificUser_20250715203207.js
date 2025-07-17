import prescriptionTable from "../../db/models/prescriptionModel";



export const getPrescriptionById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const patients = await prescriptionTable.findOne({
      userId: id,
    });
    if (!patients) {
      return next({ code: 404, message: "Patient not found" });
    }

    return res.status(200).json({ message: patients });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
