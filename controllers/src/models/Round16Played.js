const mongoose = require('mongoose')
const { Schema } = mongoose;

const Round16PlayedSchema = new Schema({
    matchid: { type: Number, required: true },
    local: { type: String, required: true },
    visitor: { type: String, required: true },
    countryLocal: { type: String, required: true },
    countryVisitor: { type: String, required: true },
    goalsLocal: { type: Number, required: true },
    goalsVisitor: { type: Number, required: true },
    result: { type: String, required: true },
    stadium: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Round16Played', Round16PlayedSchema)