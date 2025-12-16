import Joi from 'joi'

const currency= ["USD", "ETB", "EUR", "GBP"]
const status=["ACTIVE", "SUSPENDED"]

export const walletSchema = Joi.object({
    user_id:objectId.required(),
    walletNumber:Joi.required(),
    currency:Joi.valid(...currency).required(),
    status:Joi.valid(...status).required(),


})