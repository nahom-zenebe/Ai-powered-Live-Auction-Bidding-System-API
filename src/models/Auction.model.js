import mongoose from "mongoose";




const AuctionSchema = new mongoose.Schema({
    title:{
        type:String,
        reuired:true,
        trim:true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description:{
        type:String,
        required:true,
        minlength: [3, "Title must be at least 3 characters long"],
        
    },
    start_time:{
        type:Date,
        default:Date.now(),
        required:true
    },
    images: [
        {
          url: { type: String },
          public_id: { type: String }, 
        },
      ],
    end_time:{
        type:Date,
        required:true
    },
    seller_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bids: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bid"
    },
  
    min_bid:{
        type:Number,
        default:0

    },
    current_bid:{
        type:Number
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    status: {
        type: String,
        enum: ["upcoming", "active", "ended", "cancelled"],
        default: "upcoming",
        index: true,
      },
      current_winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      is_verified:{
        type:Boolean,
        default:false
      },
    //   ai_metadata: {
    //     predicted_final_price: { type: Number, default: null },
    //     risk_score: { type: Number, default: 0 }, // e.g. fraud risk
    //     auto_tags: [String],
    //   },

},{
    timestamps: true, 
})

AuctionSchema.pre("save",function(next){
    if(this.start_time>=this.s)
    next()
})
AuctionSchema.index({ category: 1 });
AuctionSchema.index({ seller_id: 1 });
AuctionSchema.index({ start_time: 1 });
AuctionSchema.index({ end_time: 1 });



const Auction=model.schema("Auction",AuctionSchema)


export default Auction