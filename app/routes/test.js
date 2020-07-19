const express = require('express')
const multer = require('multer')
const upload = multer()
const router = express.Router()
const controller = require('../controller/test')
const validate = require('../middlewares/validate')
const schemas = require('../controller/schema')
router.post('/test', validate(schemas.test, 'body'), controller.test)
router.post('/testImageUpload', controller.testImageUpload)
router.post('/testing', upload.none(), controller.testMultipart);

module.exports = router;