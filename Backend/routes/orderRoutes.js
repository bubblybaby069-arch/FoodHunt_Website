import express from "express";
import {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* USER */
router.post("/create", isAuth, createOrder);
router.get("/my-orders", isAuth, getOrders);

/* ADMIN */
router.get("/admin/all", isAuth, isAdmin, getAllOrders);
router.put("/admin/:id", isAuth, isAdmin, updateOrderStatus);

export default router;
