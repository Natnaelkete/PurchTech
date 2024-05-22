import express from "express";
const router = express.Router();
// import products from "../data/products.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Get all product
// public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...search });

    const products = await Product.find({ ...search })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, count, pages: Math.ceil(count / pageSize) });
  })
);

// Get top rated product
router.get(
  "/top",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.status(200).json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    }
    res.status(404);
    throw new Error("Resource not found");
  })
);

// Create Product
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    const createdProduct = await products.save();
    res.status(201).json(createdProduct);

    res.json(products);
  })
);

// Update Product
router.put(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;
    const product = await Product.findById(id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

// Delete Product
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });

      res.status(200).json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

// Create a new numReviews
router.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
      await product.save();

      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

export default router;
