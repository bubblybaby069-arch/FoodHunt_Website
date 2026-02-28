// routes/categoryRoutes.js
import express from "express";
import multer from "multer";
import { isAuth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { addCategory, getCategories, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

// Multer memory storage (files stored in memory, not disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/add", isAuth, isAdmin, upload.single("image"), addCategory);
router.get("/all", getCategories);
router.delete("/:id", isAuth, isAdmin, deleteCategory);

export default router;
