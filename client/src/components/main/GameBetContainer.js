import React from "react";
import GameBet from "../gameBet/GameBet";
import { RecentGame } from "./RecentGame";
import RecentGameMain  from "../recentGame/RecentGameMain";
import { PlayersChart } from "./PlayersChart";
import './GameBetContainer.css';

export const GameBetContainer = props => {
  return (
    <div className="g-container">
      <div className="new-game">
        <GameBet />
      </div>
      <div className="recent-game">
        <RecentGameMain />
      </div>
      <div className="players-chart">
        <PlayersChart />
      </div>
    </div>
  );
};
