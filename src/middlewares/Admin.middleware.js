import CustomError from "../utils/CustomError.js";

export async function AdminMiddleware(req, res, next) {
  try {
    const user = req.user; 

    if (!user) {
      throw new CustomError("User not authenticated", 401);
    }

    if (user.role !== "Admin") {
      throw new CustomError("Access denied: Admins only", 403);
    }

    next();
  } catch (err) {
    next(err);
  }
}



export async function SellerMiddleware(req,res,next){
  try{

    const user=req.user;

    if (!user) {
      throw new CustomError("User not authenticated", 401);
    }


    if (user.role !== "Seller") {
      throw new CustomError("Access denied: Seller only", 403);
    }

    next()

  }
  catch(error){
    next(error)
  }
}


export async function BuyerMiddleware(req,res,next){
  try{

    const user=req.user;

    if (!user) {
      throw new CustomError("User not authenticated", 401);
    }


    if (user.role !== "Buyer") {
      throw new CustomError("Access denied: Buyer only", 403);
    }

    next()

  }
  catch(error){
    next(error)
  }
}