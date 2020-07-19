const Sequelize = require('sequelize');


const Image = sequelize.define("Image", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    image_name: {
        type: Sequelize.STRING
    },
    image_ext: {
        type: Sequelize.STRING
    },
    created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_on',
})
module.exports = Image