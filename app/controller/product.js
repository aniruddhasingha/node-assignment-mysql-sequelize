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


/**
 * PRIVATE FUNCTION
 */
/**
 * 
 * @param {string} path 
 */
const removeImage = async (path) => {
    console.log("check")
    console.log(path)
    if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {
            if (err) {
                console.log(err)
            }

            //file removed
        })
    }

}

/**
 * Get details of latest Created 2nd And 3rd product
 */

const showlatestCreated2ndAnd3rd = async () => Product.findAll({
    include: [
        {
            model: Image,
            as: "Image",

        }],
    offset: 1, limit: 2,
    order: [['id', 'DESC']]
})

/**
 * Get Product detials with product id
 * @param {Number} product_id 
 */

const getProduct = async (product_id) => Product.findAll({
    // attributes: ['id', 'product_name', 'product_desc', 'fk_image_id', 'Status', 'created_on', 'updated_on', ],
    include: [
        {
            model: Image,
            as: "Image",

        }],
    where: { id: product_id }
});

/**
 * Update a product with product_id
 * @param {number} product_id
 * @param {String} product_name,
 *@param {String}  product_desc, 
 * @param {number}fk_image_id,
 *  @param {number}Status
 */
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
/**
 * create Product in Product Table
 * @param {Object} data 
 */
const createProduct = (data) => {
    return Product.create(data, {
        returning: true,
        plain: true
    }).then(res => res.dataValues)
        .catch(err => err)
}

/**
 * upload and image in public/upload/productImage
 * @param {string} image_name 
 * @param {string} image_ext 
 */
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

/**
 * PUBLIC FUNCTION
 */


/**
 * Add ProductImage In Uploads Folder
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */

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

/**
 * Add Product Along with Product Image
 * @param {Object} req 
 * @param {Object} res 
 */

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
//         await removeImage(`./public/uploads/productImage/${req.file.filename}`);
        utils.handleError(res, { message: `internal server error` })
    }
}


/**
 * Update a product and respective product image
 * @param {Object} req
 * @param {Object} res
 */

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
//         await removeImage(`./public/uploads/productImage/${req.file.filename}`);
        utils.handleError(res, { message: `error while updating Product and Image` }, error)
    }
}

/**
 *  Show the latest created 2nd and 3rd product
 * @param {Object} req 
 * @param {Object} res 
 */
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

/**
 * Show product details with product_id
 * @param {Object} req 
 * @param {Object} res 
 */

exports.showProductDetails = async (req, res) => {
    try {
        const { product_id } = req.body
        const finalData = await getProduct(product_id)
        if (finalData) {
            return utils.handleSuccess(
                res,
                finalData,
                `Product Details Recieved`);
        }
    }
    catch (error) {
        utils.handleError(res, { message: `error while showing product` }, error)
    }
}


