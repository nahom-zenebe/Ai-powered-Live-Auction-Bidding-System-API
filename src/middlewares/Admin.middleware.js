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
