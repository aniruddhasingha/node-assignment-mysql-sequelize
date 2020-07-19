const utils = require('../middlewares/utils')
const multer = require('multer');
const uuid = require('uuid')
var path = require('path')
const imageUplaodPath = "public/uploads/productImage/"
const Image = require('../models/Image')
const Product = require('../models/Product');
const { response } = require('express');
const { json } = require('body-parser');
const Joi = require('@hapi/joi');
const { required } = require('@hapi/joi');
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


const showlatestCreated2ndAnd3rd = async () => Product.findAll({
    include: [
        {
            model: Image,
            as: "Image",

        }],
    offset: 1, limit: 2,
    order: [['id', 'DESC']]
})

const getProduct = async (product_id) => Product.findAll({
    // attributes: ['id', 'product_name', 'product_desc', 'fk_image_id', 'Status', 'created_on', 'updated_on', ],
    include: [
        {
            model: Image,
            as: "Image",

        }],
    where: { id: product_id }
});
const updateImage = async (image_name, image_ext, imageId) => Image.update({
    image_name: image_name,
    image_ext: image_ext
}, {
    where: {
        id: imageId
    }
})
const updateProduct = async ({
    product_id, product_name, product_desc, fk_image_id, Status,
}) => Product.update({
    // product_id,
    product_name,
    product_desc,
    fk_image_id,
    Status
}, {
    where: {
        id: product_id,
    }
}
)

const createProduct = (data) => {
    return Product.create(data, {
        returning: true,
        plain: true
    }).then(res => res.dataValues)
        .catch(err => err)
}

const uploadProductImage = (image_name, image_ext) => {
    return Image.create({
        image_name: image_name,
        image_ext: image_ext
    }, {
        returning: true,
        plain: true
    }).then(res => {
        return res.dataValues
    }).catch(err => err)
}




exports.addProductImage = async (req, res, next) => {
    upload(req, res, async function (err) {
        if (!err) {
            let image_name = req.file.filename;
            let extArray = req.file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            let image_ext = extension;
            req.uploadedFileDetails = {
                image_name,
                image_ext
            }
            next()
        } else {
            utils.handleError(res, err)
        }
    })
}

exports.addProductWithProductImage = async (req, res) => {
    try {
        const { product_name, product_desc, Status } = req.body;
        const { image_name, image_ext } = req.uploadedFileDetails
        const newImageObject = await uploadProductImage(image_name, image_ext)
        const imageId = newImageObject.id;
        const fk_image_id = imageId
        const data = {
            product_name,
            product_desc,
            fk_image_id,
            Status
        }
        const newProduct = await createProduct(data)
        const newProductId = newProduct.id
        const finalData = await getProduct(newProductId)
        utils.handleSuccess(
            res,
            [finalData],
            `Product Created Successfully`);
    }
    catch (error) {
        utils.handleError(res, { message: `internal server error` })
    }
}




exports.updateProductWithid = async (req, res) => {
    try {
        const { product_id, new_product_name, new_product_desc, Status } = req.body;
        const { image_name, image_ext } = req.uploadedFileDetails

        const newImageObject = await uploadProductImage(image_name, image_ext)
        const imageId = newImageObject.id;
        if (newImageObject) {
            const data = {
                product_id: product_id,
                product_name: new_product_name,
                product_desc: new_product_desc,
                fk_image_id: imageId,
                Status: Status
            }
            const onUpdateProuct = await updateProduct(data)
            if (onUpdateProuct) {
                const udpatedData = await getProduct(product_id)
                return utils.handleSuccess(
                    res,
                    udpatedData,
                    `Product Image updated Successfully`);
            }
        }
    }
    catch (error) {
        utils.handleError(res, { message: `error while updating Product and Image` }, error)
    }
}

exports.latestCreated2ndAnd3rd = async (req, res) => {
    try {
        const udpatedData = await showlatestCreated2ndAnd3rd()
        utils.handleSuccess(
            res,
            udpatedData,
            `Successfully showing latest Created 2nd And 3rd Product`);
    }
    catch (error) {
        utils.handleError(res, { message: `error while showing latest Created 2nd And 3rd Product` }, error)
    }
}





