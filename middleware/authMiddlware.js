import jwt from "jsonwebtoken";
import { ACCEESS_TOKEN_SECRET } from "../constant.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    if (token) {
      try {
        const userInfo = await jwt.verify(token, ACCEESS_TOKEN_SECRET);
        if (userInfo) {
          req.userInfo = userInfo;
          next();
        }
      } catch (error) {
        return res.status(401).json({ message: "unAuthorized" });
      }
    } else {
      return res.status(401).json({ message: "unAuthorized" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized" });
  }
};

const roleMiddleware = async (req, res, next) => {
  const { userInfo } = req;

  if (userInfo.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "unable to access this api" });
  }
};

export { authMiddleware, roleMiddleware };
