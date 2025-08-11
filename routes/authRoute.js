import e from "express";
import { Login } from "../controller/authController.js";
import { AddWriter, AllWriters } from "../controller/addwriterController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddlware.js";

const router = e.Router();

router.post("/login", Login);
router.post("/addwriter", authMiddleware, roleMiddleware, AddWriter);
router.get("/writer", authMiddleware, roleMiddleware, AllWriters);

export default router;
