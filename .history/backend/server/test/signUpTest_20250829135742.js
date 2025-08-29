
import UserTable from "../../db/models/userModels.js";
import DoctorTable from "../../db/models/doctorModel.js";
import bcrypt from "bcrypt";
import { verifyData } from "../utils/userValidation.js";
import { signUpUser } from "../controllers/userAuthController/signUpUser.js";

UserTable;

// Mock dependencies
jest.mock("../../db/models/userModels.js");
jest.mock("../../db/models/doctorModel.js");
jest.mock("bcrypt");
jest.mock("../utils/userValidation.js");

describe("signUpUser", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should create a new patient user successfully", async () => {
    verifyData.validate.mockResolvedValue({
      email: "test@example.com",
      password: "password123",
    });
    UserTable.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    UserTable.create.mockResolvedValue({ _id: "userId" });

    await signUpUser(req, res, next);

    expect(UserTable.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(UserTable.create).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "hashedPassword",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created sucessfully",
    });
  });

  it("should return 409 if email already exists", async () => {
    verifyData.validate.mockResolvedValue({
      email: "test@example.com",
      password: "password123",
    });
    UserTable.findOne.mockResolvedValue({ email: "test@example.com" });

    await signUpUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      code: 409,
      message: "Provided email with user already exists",
    });
  });

  it("should create a new doctor user successfully", async () => {
    req.body.role = "Doctor";
    req.body.specialistType = "Cardiologist";
    req.body.licenseNo = "LIC123";
    req.body.degreeType = "MD";
    req.body.isApproved = true;

    verifyData.validate.mockResolvedValue({
      email: "doctor@example.com",
      password: "password123",
    });
    UserTable.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    UserTable.create.mockResolvedValue({ _id: "doctorId" });
    DoctorTable.create.mockResolvedValue({});

    await signUpUser(req, res, next);

    expect(DoctorTable.create).toHaveBeenCalledWith({
      userId: "doctorId",
      specialistType: "Cardiologist",
      licenseNo: "LIC123",
      degreeType: "MD",
      isApproved: true,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Doctor account created sucessfully",
    });
  });

  it("should handle validation error", async () => {
    const error = { name: "ValidationError", errors: { email: "Invalid" } };
    verifyData.validate.mockRejectedValue(error);

    await signUpUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      code: 400,
      message: { email: "Invalid" },
    });
  });

  it("should handle internal server error", async () => {
    const error = new Error("Server Error");
    verifyData.validate.mockRejectedValue(error);

    await signUpUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      code: 500,
      message: "Internal server error",
    });
  });
});
