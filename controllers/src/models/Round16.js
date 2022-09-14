const mongoose = require('mongoose')
const { Schema } = mongoose;

const Round16Schema = new Schema({
    matchid: { type: Number, required: true },
    local: { type: String, required: true },
    visitor: { type: String, required: true },
    stadium: { type: String, required: true },
    date: { type: Date, required: true },
    stage: { type: String, required: true },
});

module.exports = mongoose.model('Round16', Round16Schema)