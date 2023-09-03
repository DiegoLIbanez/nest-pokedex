import * as Joi from 'joi';

export const JoiValidationShema = Joi.object({
    MONGO_URI: Joi.string().required(),
    PORT: Joi.number().default(3000),
    
})