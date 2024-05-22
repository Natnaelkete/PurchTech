import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js";

// register
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// Get All Users
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const count = await User.countDocuments();

    const users = await User.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res
      .status(200)
      .json({ users, page, count, pages: Math.ceil(count / pageSize) });
  })
);

// Auth User
router.post(
  "/auth",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);

      res.json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// Logout
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  })
);

// Get User Profile
router.get(
  "/profile",
  protect, // Apply protection middleware here
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Update User Profile
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log({ profile: req.user._id });

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updateUser = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Get User By Id
router.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Update User
router.put(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { id, name, email, isAdmin } = req.body;
    const user = await User.findById(id);

    if (user) {
      (user.name = name || user.name),
        (user.email = email || user.email),
        (user.isAdmin = Boolean(isAdmin));

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(400).json("User no found");
    }
  })
);

// Delete User
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't deleted admin");
      }
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default router;
