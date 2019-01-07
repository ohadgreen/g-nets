import React from "react";
import "./GameBet.css";

class GameBet extends React.Component {
  render() {
    const homeTeam = {
      city: "Brooklyn",
      name: "Nets",
      wins: 17,
      loses: 21
    };
    const awayTeam = {
      city: "Boston",
      name: "Celtics",
      wins: 21,
      loses: 15
    };

    return (
      <div className="my-container">
        <div className="game-bet-container">
          <div className="img-col" style={{ float: "left" }}>
            <img
              style={{ width: "100%" }}
              src={require("../../resources/images/BKN_logo.svg")}
              alt="image1"
            />
          </div>
          <div className="game-center">
            <div className="at">at</div>
          </div>
          <div className="img-col" style={{ float: "right" }}>
            <img
              style={{ width: "100%" }}
              src={require("../../resources/images/BOS_logo.svg")}
              alt="image2"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GameBet;
