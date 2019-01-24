import React from "react";
import GameBet from "../gameBet/GameBet";
import { RecentGame } from "./RecentGame";
import { PlayersChart } from "./PlayersChart";

export const GameBetContainer = props => {
  return (
    <div className="g-container">
      <div className="new-game">
        <GameBet />
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
