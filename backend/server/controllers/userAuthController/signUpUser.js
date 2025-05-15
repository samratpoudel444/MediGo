import express from "express";
import { verifyData } from "../utils/userValidation.js";
import UserTable from "../../db/models/userModels.js";

export const signUpUser = async (req, res, next) => {
	try {
		if (!req.body.role) {
			req.body.role = "patient";
		}

		const validateUser = await verifyData.validate(req.body, {
			abortEarly: false,
		});

		const checkIfUserExist = await UserTable.findOne({
			email: validateUser.email,
		});
		if (checkIfUserExist) {
			return next({
				code: 409,
				message: "Provided email with user already exists",
			});
		}

		const newUser = await UserTable.create(validateUser);

		return res.status(201).json({ message: "User created sucessfully" });
	} catch (err) {
		console.log(err);
		if (err.name === "ValidationError") {
			return next({ code: 400, message: err.errors });
		}

		return next({ code: 500, message: "Internal server error" });
	}
};
