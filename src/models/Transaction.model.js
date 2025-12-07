import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    transaction_type: {
      type: String,
      enum: ["DEPOSIT", "BID", "REFUND"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    transaction_type:{
      type:String,
      enum:["REFUND","AUCTION_WIN_PAYMENT","BID_PAYMENT"],
      default:"BID_PAYMENT"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

TransactionSchema.index({user_id:1})

const Transaction= mongoose.model("Transaction", TransactionSchema);

export default Transaction