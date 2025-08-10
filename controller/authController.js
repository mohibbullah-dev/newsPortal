import jwt from "jsonwebtoken";
import { User } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { ACCEESS_TOKEN_EXPIRED, ACCEESS_TOKEN_SECRET } from "../constant.js";

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) res.status(404).json({ message: "please provide your email" });
  if (!password)
    return res.status(404).json({ message: "please provide your password" });

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) res.status(404).json({ message: "user not found" });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const obj = {
        id: user.id,
        name: user.name,
        category: user.category,
        role: user.role,
      };

      const token = await jwt.sign(obj, ACCEESS_TOKEN_SECRET, {
        expiresIn: ACCEESS_TOKEN_EXPIRED,
      });

      return res
        .status(200)
        .json({ message: "login successfulle done", token });
    } else {
      return res.status(404).json({ message: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { Login };
