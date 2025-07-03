import express from "express";
getNy
const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
