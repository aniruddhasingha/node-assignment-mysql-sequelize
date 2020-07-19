const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
// const mysql = require('mysql2');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('./app/database/connection')

const app = express()
app.set('port', process.env.PORT || 3000)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// for parsing json
app.use(
    bodyParser.json({
        limit: '20mb'
    })
)
// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true
    })
)

// Init all other stuff
app.use(cors())
app.use(express.static('public'))
app.use(require('./app/routes'));
app.listen(app.get('port'), () => {
    if (process.env.NODE_ENV !== 'test') {
        // Prints initialization
        console.log('****************************')
        console.log('*    Starting Server')
        console.log(`*    Port: ${process.env.PORT || 3000}`)
        console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)

    }
})

sequelize.authenticate()
    .then(() => {
        console.log('*    DB Connection has been established successfully.');
        console.log(`****************************`)
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });




app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
        res.status(err.status);
    else
        res.status(500);
    //res.render('error');
});

module.exports = app