import express from "express";

const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
