import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "DEPOSIT",
        "WITHDRAW",
        "BID_LOCK",
        "BID_RELEASE",
        "BID_PAYMENT",
        "REFUND",
        "TRANSFER_IN",
        "TRANSFER_OUT"
      ],
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    previousBalance: Number,
    newBalance: Number,

    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },

    bidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },

    reference: {
      type: String, // unique id for external payments or tracking
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "SUCCESS",
    },

    description: String,
  },
  {
    timestamps: true,
  }
);



export default mongoose.model("Transaction", transactionSchema);
