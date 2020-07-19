
const utils = require('../middlewares/utils')
const multer = require('multer');
const uuid = require('uuid')
var path = require('path')
const imageUplaodPath = "public/uploads/productImage/"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageUplaodPath)
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 10
    }
}).single('Image');
exports.test = async (req, res) => {
    try {
        const string = req.body
        utils.handleSuccess(res, string, 'working')
    }
    catch (error) {
        utils.handleError(res, error)
    }
}

exports.testImageUpload = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (!err) {
                let extArray = req.file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                const updateArr = {
                    ver_img: req.file.filename,
                }
                const img = utils.buildUserProfileImage(req.file.filename)

                utils.handleSuccess(res, img, 'Image Uploded succesfully')
            }
        })
    }
    catch (error) {
        utils.handleError(res, error)
    }
}

exports.testMultipart = async (req, res) => {
    const formData = req.body;
}