import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String, require: true },
        qty: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String },
      country: { type: String, require: true },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: { type: Number, require: true, default: 0.0 },
    taxPrice: { type: Number, require: true, default: 0.0 },
    shippingPrice: { type: Number, require: true, default: 0.0 },
    totalPrice: { type: Number, require: true, default: 0.0 },
    isPaid: { type: Boolean, require: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, require: true, default: false },
    deliveredAt: { type: Date },
    totalAmount: {
      type: Number,
      min: 0,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
