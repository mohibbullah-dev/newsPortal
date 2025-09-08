import e, { Router } from "express";
import { Login, ProfileUpdate } from "../controller/authController.js";
import {
  AddWriter,
  AllWriters,
  deleteWriter,
  editWriter,
  statusUpdated,
  updateWriter,
} from "../controller/addwriterController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddlware.js";

const router = e.Router();

router.post("/login", Login);
router.post("/addwriter", authMiddleware, roleMiddleware, AddWriter);
router.post(
  "/update-Writer/:writer_id",
  authMiddleware,
  roleMiddleware,
  updateWriter
);

router.delete(
  "/delete-writer/:writer_id",
  authMiddleware,
  roleMiddleware,
  deleteWriter
);

router.post(
  "/status-update/:writer_id",
  authMiddleware,
  roleMiddleware,
  statusUpdated
);
router.get("/writer", authMiddleware, roleMiddleware, AllWriters);
router.get(
  "/edit-writer/:writer_id",
  authMiddleware,
  roleMiddleware,
  editWriter
);

router.put("/profileUpade/:profile_id", authMiddleware, ProfileUpdate);

export default router;
