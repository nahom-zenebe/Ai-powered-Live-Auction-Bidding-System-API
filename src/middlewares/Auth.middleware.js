import jwt from "jsonwebtoken";
import CustomError from "../../../Backend/utils/CustomError.js";

export async function Authmiddleware(req, res, next) {
    try {
        const accessToken = req.cookies["TradecloneAI-Accesstoken"];
        const refreshToken = req.cookies["TradecloneAI-Refreshtoken"];

        if (!accessToken || !refreshToken) {
            throw new CustomError("No access or refresh token found", 401);
        }


        try {
            const decoded = jwt.verify(accessToken, process.env.AccessKey );
            req.user = decoded;     
            return next();          
        } 
        catch (err) {
            
            if (err.name !== "TokenExpiredError") {
                throw new CustomError("Invalid Access Token", 401);
            }
        }


        let refreshDecoded;
        try {
            refreshDecoded = jwt.verify(refreshToken, process.env.RefreshKey);
        }
        catch (err) {
            throw new CustomError("Refresh Token expired, please login again", 403);
        }


        const newAccessToken = jwt.sign(
            { id: refreshDecoded.id, email: refreshDecoded.email },
            process.env.ACCESS_SECRET,
            { expiresIn: "15m" }
        );

       
        res.cookie("TradecloneAI-Accesstoken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 
        });


        req.user = {
            id: refreshDecoded.id,
            email: refreshDecoded.email
        };

        return next();

    } catch (err) {
        next(err);
    }
}
