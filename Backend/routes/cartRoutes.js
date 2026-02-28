// routes/cartRoutes.js
import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuth, getCart);
router.post("/add", isAuth, addToCart);
router.put("/update", isAuth, updateQuantity);
router.delete("/remove/:menuItemId", isAuth, removeFromCart);
router.delete("/clear", isAuth, clearCart);

export default router;
