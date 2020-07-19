// const fakeProfile = process.env.BASE_URL + '/m3.png'

/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = file => {
    return file
        .split('.')
        .slice(0, -1)
        .join('.')
        .toString()
}

/**
* Builds error object
* @param {number} code - error code
* @param {string} message - error text
*/
exports.buildErrObject = (code, message) => {
    return {
        code,
        message
    }
}


/**
* Builds success object
* @param {string} message - success text
*/
exports.buildSuccObject = message => {
    return {
        msg: message
    }
}


/**
* Item not found
* @param {Object} err - error object
* @param {Object} item - item result object
* @param {Object} reject - reject object
* @param {string} message - message
*/
exports.itemNotFound = (err, item, reject, message) => {
    if (err) {
        reject(this.buildErrObject(422, err.message))
    }
    if (!item) {
        reject(this.buildErrObject(404, message))
    }
}


/**
* Item already exists
* @param {Object} err - error object
* @param {Object} item - item result object
* @param {Object} reject - reject object
* @param {string} message - message
*/
exports.itemAlreadyExists = (err, item, reject, message) => {
    if (err) {
        reject(this.buildErrObject(422, err.message))
    }
    if (item) {
        reject(this.buildErrObject(422, message))
    }
}


/**
* Handles error by printing to console in development env and builds and sends an error response
* @param {Object} res - response object
* @param {Object} err - error object
*/
exports.handleError = (res, errMessage, error) => {
    console.error(error)
    res.status(400).json({
        response: {
            dataset: [],
            status: 0,
            message: errMessage.message ? errMessage.message : errMessage,
        }
    })
}
/**
 * Handles success by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleSuccess = (res, resultSet, message) => {
    res.status(200).json({
        response: {
            dataset: resultSet,
            status: 1,
            message: message,
        }
    })
}


/**
* Builds poster
* @param {number} poser - error code 
*/
exports.buildUserProfileImage = (name = '') => {
    var obj = {}

    obj = {
        profile_img_link: `${process.env.BASE_URL}/public/uploads/productImage/${name}`
    }
    return obj
}