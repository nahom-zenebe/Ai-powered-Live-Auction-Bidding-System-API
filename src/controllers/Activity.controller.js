import Activity from '../models/Activity.model.js'
import CustomError from "../utils/CustomError.js";


export async function  getallActivity(req,res,next){

    try{
        const {skip=0,limit=20}=req.query;

        skip=parseInt(skip,20)
        limit=parseInt(limit,20)

        if (isNaN(skip) || isNaN(limit)) {
            return next(new CustomError("skip and limit must be numbers", 400));
          }


          const findActivity=await Activity.find().skip(skip).limit(limit)

          res.status(200).json(findActivity)
        

    }
    catch(err){
        next(err)
    }
}

export async function getSingleActivity(req, res, next) {
    try {
      const { ActivityId } = req.params;
  
      if (!ActivityId) {
        throw new CustomError("ActivityId is required", 400);
      }
  
      const singleActivity = await Activity.findById(ActivityId);
  
      if (!singleActivity) {
        throw new CustomError("Activity not found", 404);
      }
  
      res.status(200).json(singleActivity);
  
    } catch (err) {
      next(err);
    }
  }
  

  export async function getSingleUserActivity(req, res, next) {
    try {
      const { UserId } = req.params;
  
      if (!UserId) {
        throw new CustomError("UserId is required", 400);
      }
  
      const singleActivity = await Activity.findById(UserId);
  
      if (!singleActivity) {
        throw new CustomError("Activity not found", 404);
      }
  
      res.status(200).json(singleActivity);
  
    } catch (err) {
      next(err);
    }
  }
  