import React from "react";
import GameBet from "../gameBet/GameBet";
import RecentGameMain  from "../recentGame/RecentGameMain";
import PlayersChartMain from "../playersChart/PlayersChartMain";
import './GameBetContainer.css';
import web3 from '../../services/web3';

export const GameBetContainer = props => {
  /* console.log('web3 version: ' + web3.version);
  console.log('account: ');
  web3.eth.getAccounts().then(console.log); */

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
