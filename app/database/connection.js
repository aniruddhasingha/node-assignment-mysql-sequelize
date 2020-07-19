const Sequelize = require('sequelize')
// Connecting to a database
const sequelize = new Sequelize('assignment', `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`,
    {
        host: "localhost",
        dialect: "mysql",
    })

module.exports = sequelize;
// declaring sequelize as global so we can use it anywhere
global.sequelize = sequelize;