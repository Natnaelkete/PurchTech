import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }
  const imageUrl = req.file.path;

  try {
    res.status(200).send({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

export default router;
