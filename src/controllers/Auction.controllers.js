import Auction from "../models/Auction.model.js";
import CustomError from "../utils/CustomError.js";
import Bid from '../models/Bid.model.js'
import User from '../models/user.model.js';
import { startAuctionCountdown, addAuctionToCountdown } from "../utils/auctionCountdown.js";
import {notifyAuctionActivation} from '../utils/NotificationAuction.js'
import { getIo } from "../sockets/io.js";
import axios from 'axios'
import RecordActivity from '../service/Auction_metrics.js'

// ===============================
// CREATE AUCTION
// ===============================
export async function CreateAuction(req, res, next) {
  try {
    const {
      title,
      description,
      start_time,
      end_time,
      images,
      seller_id,
      bids,
      start_price,
      current_bid,
      category_id,
      status,
      current_winner
    } = req.body;

    const io=getIo()
    const auctionNamespace = io.of("/auction");
  
    if (!title || !description || !start_time || !end_time || !category_id) {
      throw new CustomError("Required fields cannot be empty", 400);
    }

    // Create Auction
    const newAuction = new Auction({
      title,
      description,
      start_time,
      end_time,
      images,
      seller_id,
      bids,
      start_price,
      current_bid,
      category_id,
      status,
      current_winner,
    });

    await newAuction.save();

    
     addAuctionToCountdown(newAuction)

    auctionNamespace.emit("send-auction",newAuction)

    await  notifyAuctionActivation(newAuction);


    RecordActivity({})

    res.status(201).json({
      success: true,
      data: newAuction,
    });

  } catch (error) {
    next(error);
  }
}

// ===============================
// GET ALL AUCTIONS (Pagination)
// ===============================
export async function getAllAuction(req, res, next) {
  try {
   

    let { skip = 0, limit = 20 } = req.query;



    skip = parseInt(skip, 20);
    limit = parseInt(limit, 20);

    if (isNaN(skip) || isNaN(limit)) {
      return next(new CustomError("skip and limit must be numbers", 400));
    }

    const auctions = await Auction.find().skip(skip).limit(limit);



    res.status(200).json({
      success: true,
      count: auctions.length,
      data: auctions,
    });

  } catch (err) {
    next(err);
  }
}

export async function activateAuction(req,res){
  const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }
    const auction = await Auction.findById(AuctionId);

    auction.status="active";

    await auction.save();

    await  notifyAuctionActivation(auction);


    res.status(200).json(auction)
 
 
}
// ===============================
// GET SINGLE AUCTION
// ===============================
export async function getSingleAuction(req, res, next) {
  try {
    const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    const singleAuction = await Auction.findById(AuctionId);

    if (!singleAuction) {
      throw new CustomError("Auction not found", 404);
    }

    res.status(200).json({
      success: true,
      data: singleAuction,
    });

  } catch (err) {
    next(err);
  }
}

export async function getAuctionByStatus(req,res,next){
  try{
    const {status}=req.query;
    if(!status){
      throw("no status is found",400)
    }

    const auctions = await Auction.find({ status });

    if(! auctions){
      throw("no Auction is found",400)
    }
    res.status(200).json(auctions)

  }
  catch(error){
    next(error)
  }
}


export async function  VerifyAuction(req,res,next){
  try{
    const {userId,AuctionId}=req.params;

    if(!userId||!AuctionId){
      throw new CustomError("no userId is found",404);
    }
    const user=await User.findById(userId)
    const auction=await Auction.findById(AuctionId)

    if(!user||!auction){
      throw new CustomError("no user is found",404);
    }
    if(user.isVerified=false){
      throw new CustomError("please verify to realse your auction",404);
    }
    if(user.isVerified=true){
      auction.is_verified=true

      res.status(200).json("Auction Authenticated Successfully");


    }

  }
  catch(error){
    next(error)

  }
}





// ===============================
// UPDATE AUCTION
// ===============================
export async function UpdateAuction(req, res, next) {
  try {
    const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    const updatedAuction = await Auction.findByIdAndUpdate(
      AuctionId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAuction) {
      throw new CustomError("Auction not found", 404);
    }

    res.status(200).json({
      success: true,
      data: updatedAuction,
    });

  } catch (err) {
    next(err);
  }
}

// ===============================
// DELETE AUCTION
// ===============================
export async function DeleteAuction(req, res, next) {
  try {
    const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    const deletedAuction = await Auction.findByIdAndDelete(AuctionId);

    if (!deletedAuction) {
      throw new CustomError("Auction not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
      data: deletedAuction,
    });

  } catch (err) {
    next(err);
  }
}

//recommendation based on user prefrence

export async function RecommendationAuction(req,res,next){
  try{
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError("userId is required", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const auctions = await Auction.find({ auction_status: "active" });

   const Recommendauctions=[];

    for(const auction of  auctions){
      let score=0;

      //category matching
      if(user.user_preference.includes(auction.category_id)){
        score+=1
      }

      if(auction.start_price>=user.price_min &&auction.start_price<=user.price_max){
        score+=1
      }

      if(score>0){
        Recommendauctions.push([
          auction,
          score
        ])
      }

    }

        //sort them
   Recommendauctions.sort((a,b)=>b.score-a.score)

   res.status(200).json({
    success: true,
    data: recommendedAuctions
  });


  }
  catch(error){
    next(error)
  }

}

export async function RatingAuction(req,res,next){
  try{
  const {rating}=req.body;
  const {AuctionId,userId}=req.params;
  

  if(!AuctionId||!rating||!userId){
    throw new CustomError("no AuctionId or Rating",404);
  }
  
  
  const auction=await Auction.findById(AuctionId)

  if(!auction){
    throw new CustomError("no Auction is available",404);
  }
   
  if(auction.rating.has(userId)){
    auction.rating.delete(userId);
  }
  auction.rating.set(userId,rating)
  

  auction.save();


  res.status(200).json("rating successful")

  }
  catch(error){
    next(error)

  }
}



export async function isAuctionFavorites(req,res,next){

  const {userId}=req.body;

  if(!userId){
    throw new CustomError("there is no userId found",404)
  }

  const AuctionFavorites=await Auction.findOne(userId)

  
  if(!AuctionFavorites){
    throw new CustomError("there is no user doccument found",404)
  }
  for(let userid in AuctionFavorites.isFavorites){

    if (userid in AuctionFavorites.isFavorites){

      AuctionFavorites.isFavorites.shift(userid)
    }
    AuctionFavorites.isFavorites.unshift(userid)


  }

  res.status(200).json("succeddfully make auction favoriates")

}







export async function AidataBidpredication(req,res,next){
  const {AuctionId,UserId}=req.params;
  
  //get list of user bid_id
  const biduser=await Bid.find({auction_id:AuctionId})
  const bid_id=biduser?._id

  const findbid=await Bid.find({ user_id:UserId})

  if(!biduser){
    res.status(404).json("no biduser is found")
  }

  if(!AuctionId){
    res.status(404).json("no auctionId is found")
  }

  const Auctiondata=await Auction.findOne({
    AuctionId,
    status:'active'
  })

  if(!Auctiondata){
    res.status(404).json("no auction is found")
  }
  const auction_id=Auctiondata._id
  const num_competitors=Auctiondata.bids.length||0

  const current_time=Date.now()
  const end_time=new Date(Auction.end_time)
  const time_to_close_sec=end_time-current_time
  const current_highest_bid=Auctiondata.current_bid;

  const largestuserbid=await Bid.find({user_id:UserId}).sort({ bid_amount:-1}).limit(1)
  const bid_amount= largestuserbid.bid_amount;
  const bidder_aggressiveness=Auction.bidder_aggressiveness
  let is_last_minute;

  const bidder_win_rate=findbid.bidder_win_rate;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if(diffMinutes===1){
    is_last_minute=1
  }
  else{
    is_last_minute=0
  }


  const features=[
    bid_amount,
    current_highest_bid,
    num_competitors,
    bidder_win_rate,
    bidder_aggressiveness,
  ]


  const aiResponse=await axios.post('http://localhost:8000/predict',{
    features: features
  })
  res.status(200).json({
    prediction: aiResponse.data.target === 1 ? "Win" : "Loss",
    probability: aiResponse.data.probability, 
    details: {
      bid_amount,
      time_to_close_sec,
      is_last_minute
    }
  });



}

export async function AIcontentbasedRecommendation(req,res,next){
   
  const listofuserId=await User.find()

  const listofAuctionId=await Auction.find()


  


 

  if(!user_id){
    res.status(404).json("userid is not found")
  }
  
//todo
//perfroming the content based recommmnedation
  res.status(200).json(user_id)


}