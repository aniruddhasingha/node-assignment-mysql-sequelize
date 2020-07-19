const schemas = require('../controller/schema')
const controller = require('../controller/product')
const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')
router.post('/addProductWithProductImage',
    controller.addProductImage, validate(schemas.Product),
    controller.addProductWithProductImage);
router.post('/updateProductAndRespectiveProductImage', controller.addProductImage,
    validate(schemas.ProductUpdate, 'body'),
    controller.updateProductWithid);
router.get('/showLatestCreated2ndAnd3rdProduct',
    controller.latestCreated2ndAnd3rd);
router.post('/ShowProductWithProductImage',
    validate(schemas.ProductId, 'body'),
    controller.showProductDetails)

module.exports = router;