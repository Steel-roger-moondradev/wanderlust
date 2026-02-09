const Joi = require('joi');
const Schema=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required().min(0),
    country:Joi.string().required(),
    image:Joi.object({
        url:Joi.string().allow("",null),
    }),
    location:Joi.string().required()

});
module.exports=Schema;

const reviewSchema = Joi.object({
    name: Joi.string().required(),
    content: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
}).required();

module.exports = {  reviewSchema,Schema };
