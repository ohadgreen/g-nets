const mongoose = require("mongoose");
require('../../model/Game');
const dateUtils = require('../../utils/DateUtils');
const Game = mongoose.model("games");

module.exports = app => {
    //return games without results
    app.get("/api/games/new", async (req, res) => { 
        let errorMsg;
        const newGames = await Game.find({ 'results.homePoints': 0 , 'srId' : 'sr:match:15329958'},
        { results: 0, srIdLong: 0 })
            .populate('homeTeam', 'name city alias wins losses winPct gamesBehind.league')
            .populate('awayTeam', 'name city alias wins losses winPct gamesBehind.league')
            .populate({path: 'bets.user', model: 'users', select: 'username'})
            ;
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

        const recentGames = await Game.find({ 
            // 'schedule': { '$gte': new Date(yesterday) },
            'srId' : 'sr:match:15329122',
            'results.homePoints': {'$gt': 0} },
            { srIdLong: 0 } )
            .populate('homeTeam', 'name city alias wins losses winPct gamesBehind.league')
            .populate('awayTeam', 'name city alias wins losses winPct gamesBehind.league');
        if (!recentGames) {
            errorMsg = 'cannot find recent games';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(recentGames);
        }
    });
    // add bet
    app.post("/api/games/addbet", async (req, res) => { 
        let errorMsg;
        const { gameid, user, winner, pointsDiff, betString } = req.query;
        const userBet = {
            user: user,
            winner: winner,
            pointsDiff: pointsDiff,
            betString: betString           
        };
        // console.log('userBet: ' + JSON.stringify(userBet));
        const addBetRes = await Game.findOneAndUpdate({ 'srId': gameid }, { $push: { bets: userBet } }, { new: true })
        .populate({path: 'bets.user', model: 'users', select: 'username'});

        if (!addBetRes) {
            errorMsg = 'cannot add user bet';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send({msg: 'user bet added', data: addBetRes});
        }
    });

    // remove bet
    app.post("/api/games/removebet", async (req, res) => { 
        let errorMsg;
        const { gameid, betid } = req.query;
        const removeBetRes = await Game.findOneAndUpdate({ 'srId': gameid }, { $pull: { bets: {'_id' : betid} } }, { new: true })
            .populate({path: 'bets.user', model: 'users', select: 'username'});

        if (!removeBetRes) {
            errorMsg = 'cannot remove user bet';
            console.log(errorMsg);
            res.send({ success: false, error: errorMsg });
        }
        else {
            res.send({success: true, data: removeBetRes});
        }
    });
}