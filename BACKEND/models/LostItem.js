import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    location: {
      type: String,
    },

    image: {
      type: String,
    },

    status: {
      type: String,
      enum: ["available", "claimed"],
      default: "available",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "LostItem",
  lostItemSchema
);