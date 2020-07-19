const schemas = require('../controller/schema')
const controller = require('../controller/product')
const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')

router.post('/addProductWithProductImage',
    validate(schemas.Product, 'body'),
    controller.addProductWithProductImage);
router.post('/addProductImage',
    controller.addProductImage, validate(schemas.Product),
    controller.addProductWithProductImage);
router.post('/updateProduct', controller.addProductImage,
    validate(schemas.ProductUpdate, 'body'),
    controller.updateProductWithid);
router.get('/latestCreated2ndAnd3rd',
    controller.latestCreated2ndAnd3rd);

module.exports = router;