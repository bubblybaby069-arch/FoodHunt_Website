import express from "express";
import { addMenu, getMenus, deleteMenu } from "../controllers/menuController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Add menu (admin only)
router.post("/add", isAuth, isAdmin, upload.single("image"), addMenu);

// Get all menus (public)
router.get("/all", getMenus);

// Delete menu (admin only)
router.delete("/:id", isAuth, isAdmin, deleteMenu);

export default router;
