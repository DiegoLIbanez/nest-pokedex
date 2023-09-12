import * as Joi from 'joi';

export const JoiValidationShema = Joi.object({
    MONGODB: Joi.string().required(),
    PORT: Joi.number().default(3000),
    
})