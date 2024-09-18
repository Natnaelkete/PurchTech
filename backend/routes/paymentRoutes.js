import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createCheckoutSession,
  checkoutSuccess,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/checkout-success", protect, checkoutSuccess);

export default router;
