import Joi from 'joi'


const ROLES=["Admin", "Seller", "Buyer"]

export const registerSchema=Joi.object({
    name:Joi.string().min(3).max(50).required(),
    email:Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
    role:Joi.string().valid(...ROLES).required(),
    
})


export const loginSchema=Joi.object({
    email:Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
})