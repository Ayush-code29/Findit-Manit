import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },

    itemType: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },

    ownerId: {
      type: String,
      required: true,
    },

    claimerId: {
      type: String,
      required: true,
    },

    claimerName: {
      type: String,
      required: true,
    },

    claimerPhone: {
      type: String,
      required: true,
    },

    ownershipProof: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isHandled: {
      type: Boolean,
      default: false,
    },

    isReadByClaimer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Claim = mongoose.model(
  "Claim",
  claimSchema
);

export default Claim;