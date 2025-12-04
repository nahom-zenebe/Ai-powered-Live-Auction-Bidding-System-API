import CustomError from "../utils/CustomError.js";

export async function SellerMiddleware(req, res, next) {
  try {
    const user = req.user; 

    if (!user) {
      throw new CustomError("User not authenticated", 401);
    }

    if (user.role !== "Seller") {
      throw new CustomError("Access denied: Seller only", 403);
    }

    next();
  } catch (err) {
    next(err);
  }
}