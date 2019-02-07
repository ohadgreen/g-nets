import React from "react";
import GameBet from "../gameBet/GameBet";
import { RecentGame } from "./RecentGame";
import RecentGameMain  from "../recentGame/RecentGameMain";
import PlayersChartMain from "../playersChart/PlayersChartMain";
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
        <PlayersChartMain />
      </div>
    </div>
  );
};
