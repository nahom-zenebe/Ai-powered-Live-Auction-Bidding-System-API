import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Generate Access Token (short-lived)
export function AccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

// Generate Refresh Token (long-lived)
export function RefreshToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}