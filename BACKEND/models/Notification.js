import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      receiverId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      claimId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Claim",
      },

      read: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Notification",
  notificationSchema
);