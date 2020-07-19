const Sequelize = require('sequelize');
const Image = require('./Image')


const Product = sequelize.define("Product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    product_desc: {
        type: Sequelize.STRING
    }
    ,
    Status: {
        type: Sequelize.TINYINT
    },
    fk_image_id: {
        type: Sequelize.INTEGER,
    },
    created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updated_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }

}, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
});

Product.belongsTo(Image, { foreignKey: 'fk_image_id' });
module.exports = Product




