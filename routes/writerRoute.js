import e, { Router } from "express";
import { authMiddleware } from "../middleware/authMiddlware.js";
import { me } from "../controller/newsCreateController.js";

const router = e.Router();

router.get("/me/:userId", authMiddleware, me);

export default router;
