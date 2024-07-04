import express from "express";
const router = express.Router();
// import products from "../data/products.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/Order.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.use(express.json());

// Create new order
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();

      res.status(201).json(createOrder);
    }
  })
);

// Get All orders
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments();

    const orders = await Order.find({})
      .populate("user", "id name")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res
      .status(200)
      .json({ orders, page, count, pages: Math.ceil(count / pageSize) });
  })
);

// Get My Orders
router.get(
  "/mine",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  })
);

// Get order by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// Update order to payed
router.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// Update order to delivered
router.put(
  "/:id/deliver",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

export default router;
