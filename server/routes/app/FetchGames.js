const mongoose = require("mongoose");
require('../../model/Game');
const dateUtils = require('../../utils/DateUtils');
const Game = mongoose.model("games");

module.exports = app => {
    //return games without results
    app.get("/api/games/new", async (req, res) => { 
        let errorMsg;
        const newGames = await Game.find({ 'results.homePoints': 0})
            .populate('homeTeam', 'name city wins losses winPct gamesBehind.league')
            .populate('awayTeam', 'name city wins losses winPct gamesBehind.league');
        if (!newGames) {
            errorMsg = 'cannot find new games';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(newGames);
        }
    });

    // return games from two days ago that have results
    app.get("/api/games/recent", async (req, res) => { 
        let errorMsg;
        let yesterday = dateUtils.dateDiffFromToday(-2);
        console.log('yesterday: ' + yesterday);

        const recentGames = await Game.find({ 'schedule': { '$gte': new Date(yesterday) }, 'results.homePoints': {'$gt': 0} } )
            .populate('homeTeam', 'name city wins losses winPct gamesBehind.league')
            .populate('awayTeam', 'name city wins losses winPct gamesBehind.league');
        if (!recentGames) {
            errorMsg = 'cannot find recent games';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(recentGames);
        }
    });
}