import mongoose from "mongoose";
import crypto from "crypto";
const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },

    walletNumber: {
        type: String,
        unique: true,
        required: true,
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
walletSchema.prev("validate",async function(next){
    if(this. walletNumber) next()


    const generate=()=> "WLT-" + crypto.randomBytes(6).toString("hex").toUpperCase();
    let number = generate();
    let exists = await mongoose.model("Wallet").findOne({ walletNumber: number });
    while (exists) {
        number = generate();
        exists = await mongoose.model("Wallet").findOne({ walletNumber: number });
      }
      this.walletNumber=number;
      next()

})
export default mongoose.model("Wallet", walletSchema);
