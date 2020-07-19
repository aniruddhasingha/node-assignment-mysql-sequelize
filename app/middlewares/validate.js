const Joi = require('@hapi/joi');
const utils = require('./utils');
const schemas = require('../controller/schema');
/**
 * 
 * @param {validation schema} schema 
 */
const validate = (schema) => {
    return (req, res, next) => {
        // destructuring request from body and query
        const validationObject = {
            ...req.body,
            ...req.query,
        };
        // checking validation

        const { error } = Joi.validate(validationObject, schema);

        const valid = error == null;
        if (valid) {
            return next();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',')
            utils.handleError(res, message)
        }
    }
}
module.exports = validate;