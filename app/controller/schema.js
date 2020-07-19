const Joi = require('@hapi/joi');
const schemas = {
    // just tesing  Joi middleware working
    test: Joi.object().keys({
        string: Joi.string().required()
    }),
    // validation for Creating product and Image
    Product: Joi.object().keys({
        product_name: Joi.string().max(20).required(),
        product_desc: Joi.string().required(),
        Status: Joi.number().valid(1, 0).required(),
    }),
    // validation for Updatinf product and Image
    ProductUpdate: Joi.object().keys({
        product_id: Joi.number().required(),
        new_product_name: Joi.string().max(20).optional(),
        new_product_desc: Joi.string().optional(),
        Status: Joi.number().valid(1, 0).optional()
    }),
    // validation showing product with respective product_id
    ProductId: Joi.object().keys({
        product_id: Joi.number().required(),
    })
}
module.exports = schemas;