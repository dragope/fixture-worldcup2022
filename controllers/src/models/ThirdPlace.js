const mongoose = require('mongoose')
const { Schema } = mongoose;

const ThirdPlaceSchema = new Schema({
    stage: { type: String, required: true },
    matchid: { type: Number, required: true },
    local: { type: Number, required: true },
    visitor: { type: Number, required: true },
    stadium: { type: String, required: true },
    date: { type: Date, required: true },
    stage: { type: String, required: true },
});

module.exports = mongoose.model('ThirdPlace', ThirdPlaceSchema)