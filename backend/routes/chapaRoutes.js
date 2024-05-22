import express from "express";
import axios from "axios";
import asyncHandler from "../middleware/asyncHandler.js";
import Chapa from "../models/Chapa.js";
import crypto from "crypto";

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    } = req.body;

    const headers = {
      Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`, // Ensure this key is set in your .env file
      "Content-Type": "application/json",
    };

    const body = {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      // return_url: "https://www.google.com/",
    };

    try {
      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        body,
        { headers }
      );
      const responseData = response.data;

      // Store Payment Details in MongoDB
      const paymentData = new Chapa({
        amount,
        currency,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
      });

      const savedData = await paymentData.save();

      // Send the response after saving to the database
      res.json({ success: responseData, dbsuccess: savedData });
    } catch (error) {
      console.error("Error:", error.message); // Log the error for debugging purposes
      res.status(500).json({ error: error.message });
    }
  })
);

// Using Express
router.post("/webhook", function (req, res) {
  //validate event
  const hash = crypto
    .createHmac("sha256", process.env.TEST_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-chapa-signature"]) {
    // Request is valid
    const event = req.body; // Retrieve event data from request body

    console.log(event);
  } else {
    res.send("error");
  }
});

export default router;
