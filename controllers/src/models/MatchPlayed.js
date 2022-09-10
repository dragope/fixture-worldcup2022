const mongoose = require('mongoose')
const { Schema } = mongoose;

const MatchSchema = new Schema({
    
    group: { type: String, required: true },
    matchid: { type: Number, required: true },
    local: { type: Number, required: true },
    visitor: { type: Number, required: true },
    countryLocal: { type: String, required: true },
    countryVisitor: { type: String, required: true },
    goalsLocal: { type: Number, required: true },
    goalsVisitor: { type: Number, required: true },
    result: { type: String, required: true },
    pointsLocal: { type: Number, required: true },
    pointsVisitor: { type: Number, required: true }
});

module.exports = mongoose.model('MatchPlayed', MatchSchema)