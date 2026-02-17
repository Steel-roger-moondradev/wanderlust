const Joi = require('joi');
const Schema=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required().min(0),
    country:Joi.string().required(),
    image:Joi.object({
        url:Joi.string().allow("",null),
        filename:Joi.string(),
    }),
    location:Joi.string().required(),
    category:Joi.string().required(),

});

const reviewSchema = Joi.object({
    content: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
}).required();

const signupSchema=Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
}).required();

module.exports = {  reviewSchema,Schema,signupSchema};
