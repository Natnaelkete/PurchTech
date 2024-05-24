import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import chapaRoutes from "./routes/chapaRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173", // Development origin
  "https://purchtechs.vercel.app", // Production origin
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow non-browser requests (like curl)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/acceptPayment", chapaRoutes);
app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});
