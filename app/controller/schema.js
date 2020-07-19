const Joi = require('@hapi/joi');
const schemas = {
    test: Joi.object().keys({
        string: Joi.string().required()
    }),
    Product: Joi.object().keys({
        product_name: Joi.string().max(20).required(),
        product_desc: Joi.string().required(),
        Status: Joi.number().valid(1, 0).required(),
    }),
    ProductUpdate: Joi.object().keys({
        product_id: Joi.number().required(),
        new_product_name: Joi.string().max(20).optional(),
        new_product_desc: Joi.string().optional(),
        Status: Joi.number().valid(1, 0).optional()
    }),
    ProductId: Joi.object().keys({
        product_id: Joi.number().required(),
    })
}
module.exports = schemas;