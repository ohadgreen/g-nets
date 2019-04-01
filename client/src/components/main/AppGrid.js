import React from "react";
import GameBet from "../gameBet/GameBet";
import RecentGameMain  from "../recentGame/RecentGameMain";
import PlayersChartMain from "../playersChart/PlayersChartMain";
import './AppGrid.css';

export const AppGrid = () => {
  return (
    <div className="g-container">
      <div className="new-game">
        <GameBet />
      </div>
      <div className="recent-game">
        <RecentGameMain />
      </div>
      <div className="billboard">
        <h2>Billboard placeholder</h2>
      </div>
      <div className="players-chart">
        <PlayersChartMain />
      </div>
    </div>
  );
};
