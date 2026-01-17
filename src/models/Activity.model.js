import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

   
    action: {
      type: String,
      required: true,
      index: true,
    },

    
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      index: true,
    },
    context: {
        ipAddress: {
          type: String,
        },
  
        userAgent: {
          type: String,
        },
       
    },
 
    message: {
      type: String,
      trim: true,
    },

  
    read: {
      type: Boolean,
      default: false,
      index: true,
    },

    
    metadata: {
      bidAmount: Number,
      previousBid: Number,
      winnerId: mongoose.Schema.Types.ObjectId,
      reason: String,
      extra: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
