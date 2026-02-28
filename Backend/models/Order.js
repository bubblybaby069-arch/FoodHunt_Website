import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      name: String,
      phone: String,
      houseName: String,
      location: String,
      state: String,
      pincode: String,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Delivered", "CONFIRMED"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: { // keep for backward compatibility with COD flow
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
