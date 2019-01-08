
const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    srId: String,
    srIdLong: String,
    schedule: Date,
    homeTeam: {city: String, name: String, alias: String},
    awayTeam: {city: String, name: String, alias: String},
    results: {homePoints: Number, awayPoints: Number},
    gameSummaryUrl: String,
});

mongoose.model('games', gameSchema);