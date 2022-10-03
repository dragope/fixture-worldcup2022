require('dotenv')
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));