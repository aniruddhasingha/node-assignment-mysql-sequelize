const schemas = require('../controller/schema')
const controller = require('../controller/product')
const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')

// Develop an API, that can add a product with a product image
router.post('/addProductWithProductImage',
    controller.addProductImage, validate(schemas.Product),
    controller.addProductWithProductImage);

// Develop an API that can update a product and respective product image
router.post('/updateProductAndRespectiveProductImage', controller.addProductImage,
    validate(schemas.ProductUpdate),
    controller.updateProductWithid);
// Develop an API that can show the latest created 2nd and 3rd product
router.get('/showLatestCreated2ndAnd3rdProduct',
    controller.latestCreated2ndAnd3rd);

// Develop an API that can show product with product image
router.post('/ShowProductWithProductImage',
    validate(schemas.ProductId),
    controller.showProductDetails)

module.exports = router;