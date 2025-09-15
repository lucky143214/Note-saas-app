import express from "express";
import { upgradeTenant } from "../controllers/tenantController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Upgrade endpoint only accessible by Admin
router.post("/:slug/upgrade", authMiddleware, requireRole("admin"), upgradeTenant);

export default router;
