const mongoose = require("mongoose");
require("../../model/User");
const User = mongoose.model("users");

module.exports = app => {
    // Fetch all players scores
    app.get("/api/scores/all", async (req, res) => {
        let errorMsg;
        const allScores = await User.find(
          {'bets.totalBets' : {'$gt' : 0}}, // filter users that made any bets
          { username: 1, avatar: 1, bets : 1 }
        )          
        if (!allScores) {
          errorMsg = "cannot fetch scores";
          console.log(errorMsg);
          res.send({ error: errorMsg });
        } else {
          res.send(allScores);
        }
      });
}