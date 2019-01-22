import React from "react";
import GameBet3 from "../gameBet/GameBet3";
import { RecentGame } from "./RecentGame";
import { PlayersChart } from "./PlayersChart";

export const GameBetContainer = props => {
  return (
    <div className="g-container">
      <div className="new-game">
        <GameBet3 />
      </div>
      <div className="recent-game">
        <RecentGame />
      </div>
      <div className="players-chart">
        <PlayersChart />
      </div>
    </div>
  );
};
