const mongoose = require("mongoose");
require("../../model/User");
const Game = mongoose.model("games");

module.exports = app => {
// return archive games, from requested days behind (default 14 days back), top ranked
app.get("/api/games/past", async (req, res) => {
    const { daysDiff } = req.query;
    const today = new Date();
    const fromDate = new Date().setDate(today.getDate() + (daysDiff ? (-daysDiff) : (-14)));
    let errorMsg;

    const pastGames = await Game.find(
        { "schedule": {"$gte": new Date(fromDate)}, "isArchiveGame": true, "gameRank.gameRank": 1 },
      { srIdLong: 0 }
    )
    .sort({schedule: -1})
      .populate(
        "homeTeam",
        "name city alias wins losses winPct gamesBehind.league"
      )
      .populate(
        "awayTeam",
        "name city alias wins losses winPct gamesBehind.league"
      )
      .populate({ path: "bets.user", model: "users", select: "username avatar" });
    if (!pastGames) {
      errorMsg = "cannot find recent games";
      console.log(errorMsg);
      res.send({ error: errorMsg });
    } else {
      res.send(pastGames);
    }
  });
}