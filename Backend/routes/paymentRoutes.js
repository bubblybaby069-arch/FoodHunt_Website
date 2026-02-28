import express from "express";
import { createCheckoutSession, confirmPayment } from "../controllers/paymentController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Stripe checkout session
router.post("/create-checkout-session", isAuth, createCheckoutSession);

// ✅ FIXED LINE
router.post("/confirm-payment", isAuth, confirmPayment);

export default router;
