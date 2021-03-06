const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    srId: String,
    srIdLong: String,
    schedule: Date,
    homeTeam: { type: Schema.Types.ObjectId, ref: 'teams' },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'teams' },
    results: { homePoints: Number, awayPoints: Number, resultsString: String },
    playoffSeries: {
        seriesTitle: String,
        round: Number,
        status: String,
        gameTitle: String,
        homeTeamRecord: Number,
        awayTeamRecord: Number,    
      },
    bets: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        intcode: Number,
        winner: String,
        pointsDiff: Number,
        ether: Number,
        betString: String,
        score: Number,
        rank: Number,
        timestamp: { type: Date, default: Date.now },
    }],
    gameSummaryUrl: String,
});

mongoose.model('games', gameSchema);