import Joi from 'joi'


export const createcategorySchema=Joi.object({
    name:Joi.string().min(3).max(50).required(),
    description:Joi.string().min(5).required()
})