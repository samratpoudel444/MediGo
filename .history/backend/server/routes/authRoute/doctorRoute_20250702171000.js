import express from "express";\ getMyProfile 

const doctorRouter = express.Router();

doctorRouter.route("/getDoctorProfile").get(getDoctorProfile);

export default doctorRouter;
