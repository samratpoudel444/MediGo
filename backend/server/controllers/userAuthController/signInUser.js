import UserTable from "../../db/models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInUsers = async (req, res, next) => {
  const loginCredintials = req.body;
  try {
    const user = await UserTable.findOne({
      email: loginCredintials.email,
      role: loginCredintials.role,
    });

    if (!user) {
      return next({ code: 401, message: "Provided email doesnot exists" });
    }

    const hashedPassword = user.password;
    const plainPassword = loginCredintials.password;

    const isPasswordCorrect = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );

    if (!isPasswordCorrect) {
      return next({ code: 401, message: "Provided password is Incorrect" });
    }

    const secretKey = process.env.JWT_SECRET;
    const payload = {
      id: user._id,
      email: user.email,
      role: loginCredintials.role,
    };
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    return res
      .cookie("token", accessToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(201)
      .json({ message: "User LoggedIn Successfully", token: accessToken });
  } catch (err) {
    console.log(err);
    return next({ code: 500, message: "Internal server error" });
  }
};
