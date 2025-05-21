import jwt from "jsonwebtoken";

export const authMiddleware = async (req, resp, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({ code: 401, message: "Token not found" });
    }
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next({ code: 400, message: "No token data found" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};

export const isAdmin = async (req, resp, next) => {
  try {
    const role = req.user.role;
    if (role !== "Admin") {
      return next({ code: 401, message: "Unauthorized To perform task" });
    }
    next();
  } catch (err) {
    console.log(err);
    return next({ code: err.code || 500, message: "Internal Server error" });
  }
};

export const isPatient = async (req, resp, next) => {
  try {
    const role = req.user.role;
    if (role !== "Patient") {
      return next({ code: 401, message: "Unauthorized To perform task" });
    }
    next();
  } catch (err) {
    console.log(err);
    return next({ code: err.code || 500, message: "Internal Server error" });
  }
};

export const isDoctor = async (req, resp, next) => {
  try {
    const role = req.user.role;
    if (role !== "Doctor") {
      return next({ code: 401, message: "Unauthorized To perform task" });
    }
    next();
  } catch (err) {
    console.log(err);
    return next({ code: err.code || 500, message: "Internal Server error" });
  }
};
