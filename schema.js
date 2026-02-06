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