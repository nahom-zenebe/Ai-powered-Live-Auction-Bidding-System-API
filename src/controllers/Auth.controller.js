import { AccessToken, RefreshToken } from "../utils/TokenGen.js";
import User from '../models/user.model.js'
import CustomError from "../utils/CustomError.js";
import bcrypt from "bcrypt";
import Auction from '../models/Auction.model.js'
import Bid from '../models/Bid.model.js'


export async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new CustomError("All fields are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role,
    });

    await newUser.save();

    const accessToken = AccessToken({ id: newUser._id, role: newUser.role });
    const refreshToken = RefreshToken({ id: newUser._id, role: newUser.role });

    res.cookie("Auctionplatform-Accesstoken", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("Auctionplatform-Refreshtoken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        subscriptions: newUser.subscriptions,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}


export async function VerifyUser(req,res,next){
  try{

    const{ Address,Phone,age, GovermentId}=req.body
    const {userId}=req.params

    if(!Address||!Phone||!age||!GovermentId){
      throw new CustomError("all field are required")
    }

    const findUser=await User.findByIdAndUpdate(userId,{Address,Phone,age, GovermentId},{new:true})

    if (!findUser) {
      throw new CustomError("User not found", 404);
    }
    findUser.isVerified=true

    await findUser.save()

    res.status(200).json(findUser)


  }
  catch(error){
next(error)
  }
}
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Missing fields", 400);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new CustomError("Incorrect email or password", 400);
    }

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      throw new CustomError("Incorrect email or password", 400);
    }

    const accessToken = AccessToken({
      id: existingUser._id,
      role: existingUser.role,
    });
    const refreshToken = RefreshToken({
      id: existingUser._id,
      role: existingUser.role,
    });

    res.cookie("Auctionplatform-Accesstoken", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("Auctionplatform-Refreshtoken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}


export async function CountNumberofUser(req,res,next){
  try{
    const numberOfUsers = await User.aggregate([
      {
        $group: {
          _id: "$role",          
          count: { $sum: 1 }    
        }
      }
    ]);

    if(! numberOfUsers){
      throw new CustomError("no user is founded",404)
    }

    res.status(200).json(
      numberOfUsers);


  }
  catch(error){
    next(error)

  }
}



//============== seller dashboard================


export async function statsInfo(req,res,next){
  try{
    const {userId}=req.body;
    const finalamount=0;
   //get number of auction user created 
    const numberofAuction=await Auction.aggregate([
      {$match:{seller_id:userId}},
      {$count: 1}
    ])
   //get how much money does it make
    const auctionended=await Auction.find({
      seller_id:userId,
      status:"ended"
    })

    for (var amount in auctionended){
      finalamount+=amount.current_bid
    }

    //check status of each

    const statusauction=await Auction.find([
      {$match:{seller_id:userId}},
      {$group:{
        _id:"$status",
        $count:{$sum:1}
      }}
    ]) 



    res.status(200).json(numberofAuction,finalamount,statusauction)

  }
  catch(error){
    next(error)
  }
}



export async function setuppreference(req,res,next){

  try{
    const {preference}=req.body;
    const {userId}=req.params

    if(!userId){
      throw new CustomError("there is no userid",404)
    }

    if(!preference||Array.isArray(preference)||preference.length===0){
      throw new CustomError("there is no preference data ",404)
    }

    const user=await User.findOne(userId)

    if(!user){
      throw new CustomError("there is no user data ",404)
    }


    preference.forEach(pref=>{
      user.user_preference=user.user_preference.filter(p=> p!==pref);

      user.user_preference.unshift(pref)
    })
    
    await User.save();
    
    res.status(200).json("preferenced saved successfully")

  }
  catch(err){
   next(err)
  }

}