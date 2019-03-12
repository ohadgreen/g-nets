const mongoose = require("mongoose");
require("../../model/Game");
const dateUtils = require("../../utils/DateUtils");
const Game = mongoose.model("games");

module.exports = app => {
  //return new game with top rank
  app.get("/api/games/new", async (req, res) => {
    let errorMsg;
    const newGames = await Game.find(
      { isNewGame: true, "gameRank.gameRank": 1 }, // new game and ranked #1
      { results: 0, srIdLong: 0 }
    )
      .populate(
        "homeTeam",
        "name city alias wins losses winPct pointsFor pointsAgainst pointsDiff gamesBehind.league"
      )
      .populate(
        "awayTeam",
        "name city alias wins losses winPct pointsFor pointsAgainst pointsDiff gamesBehind.league"
      )
      .populate({ path: "bets.user", model: "users", select: "username avatar" });
    if (!newGames) {
      errorMsg = "cannot find new games";
      console.log(errorMsg);
      res.send({ error: errorMsg });
    } else {
      res.send(newGames);
    }
  });

  // return recent game with top rank
  app.get("/api/games/recent", async (req, res) => {
    let errorMsg;
    let yesterday = dateUtils.dateDiffFromToday(-2);
    // console.log("yesterday: " + yesterday);

    const recentGames = await Game.find(
        { isRecentGame: true, "gameRank.gameRank": 1 },
      { srIdLong: 0 }
    )
      .populate(
        "homeTeam",
        "name city alias wins losses winPct gamesBehind.league"
      )
      .populate(
        "awayTeam",
        "name city alias wins losses winPct gamesBehind.league"
      )
      .populate({ path: "bets.user", model: "users", select: "username avatar" });
    if (!recentGames) {
      errorMsg = "cannot find recent games";
      console.log(errorMsg);
      res.send({ error: errorMsg });
    } else {
      res.send(recentGames);
    }
  });
  // add bet
  app.post("/api/games/addbet", async (req, res) => {
    let errorMsg;
    const { gameid, user, winner, pointsDiff, ether, betString } = req.query;
    const userBet = {
      user: user,
      winner: winner,
      pointsDiff: pointsDiff,
      ether: ether,
      betString: betString
    };
    // console.log('userBet: ' + JSON.stringify(userBet));
    const addBetRes = await Game.findOneAndUpdate(
      { srId: gameid },
      { $push: { bets: userBet } },
      { new: true }
    ).populate({ path: "bets.user", model: "users", select: "username avatar" });

    if (!addBetRes) {
      errorMsg = "cannot add user bet";
      console.log(errorMsg);
      res.send({ error: errorMsg });
    } else {
      res.send({ msg: "user bet added", data: addBetRes });
    }
  });

  // remove bet
  app.post("/api/games/removebet", async (req, res) => {
    let errorMsg;
    const { gameid, betid } = req.query;
    const removeBetRes = await Game.findOneAndUpdate(
      { srId: gameid },
      { $pull: { bets: { _id: betid } } },
      { new: true }
    ).populate({ path: "bets.user", model: "users", select: "username avatar" });

    if (!removeBetRes) {
      errorMsg = "cannot remove user bet";
      console.log(errorMsg);
      res.send({ success: false, error: errorMsg });
    } else {
      res.send({ success: true, data: removeBetRes });
    }
  });
};
