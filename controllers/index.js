const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser")


//Initializations
require('./database')

//Settings

//Middlewares
app.use(cors())
app.use(bodyParser.json())

//Global Variables

//Routes
app.use(require('./src/routes/routes'))

//Server is Listening
app.set('port', process.env.port || 3001);
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'))
})