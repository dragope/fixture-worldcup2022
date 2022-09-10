const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fixture-wc2022')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));