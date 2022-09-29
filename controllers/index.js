const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser")
const path = require('path')

//Initializations
require('./database')
require('dotenv').config();

//Settings

//Middlewares
app.use(cors())
app.use(bodyParser.json())

//Global Variables

//Routes
app.use(require('./src/routes/routes'))

app.get("/api/test", (req, res)=>{
    res.send("Test")
})

//Server is Listening
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'))
})