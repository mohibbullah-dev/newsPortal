import e from "express";
import { Login } from "../controller/authController.js";

const router = e.Router();

router.post("/login", Login);

export default router;
