import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one wallet per user
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    lockedBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "ETB", "EUR", "GBP"],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },

    Transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    }
  },
  {
    timestamps: true,
  }
);

walletSchema.index({ userId: 1 });

export default mongoose.model("Wallet", walletSchema);
