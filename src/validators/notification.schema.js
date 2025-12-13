import Joi from 'joi'

const TYPES=["OUTBID", "WON", "AUCTION_END","NEW_AUCTION"]

export const notificationSchema = Joi.object({
    user_id: objectId.required(),
  
    type: Joi.string()
      .valid(...TYPES)
      .required(),
  
    message: Joi.string()
      .trim()
      .min(1)
      .required(),
  
    read: Joi.boolean().default(false),
  
    auction_id: objectId
      .allow(null)
      .default(null),
  
    metadata: Joi.object()
      .default({})
      .unknown(true)
  })
  .options({
    allowUnknown: false
  });
  