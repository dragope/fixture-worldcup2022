require('dotenv')
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://dragope:LololoFWC123@cluster0.lu0ymd2.mongodb.net/?retryWrites=true&w=majority`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));