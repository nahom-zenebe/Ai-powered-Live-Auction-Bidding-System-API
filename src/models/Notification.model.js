import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["OUTBID", "WON","FavoriteAuction", "AUCTION_END","NEW_AUCTION"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    read: {
      type: Boolean,
      default: false,
    },


    auction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      default: null
    },

    
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);




const Notificaiton= mongoose.model("Notification", NotificationSchema);

export default Notificaiton;
