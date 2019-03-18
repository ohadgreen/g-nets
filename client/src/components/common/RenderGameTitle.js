import React from "react";
import web3 from "../../services/web3";
import { Icon } from "semantic-ui-react";
import "./TeamsInfo.css";
import "./GameTitle.css";

export const GameTitle = props => {
  const gameSched = new Date(Date.parse(props.gameSchedule));
  const gameDate =
    gameSched.getDate() +
    "-" +
    (gameSched.getMonth() + 1) +
    "-" +
    gameSched.getFullYear();
    
  return (
    
    <div className="game-bet-title-flex">
      <div className="game-bet-title-main">{props.gameType} Game: {gameDate}</div>
      {props.contractPrize ? renderEtherPrize(props.contractPrize, props.etherConvRate) : null}
    </div>
  );
};

function renderEtherPrize(contractPrizeWei, etherConvRate) {
    const contractPrize = contractPrizeWei ? contractPrizeWei : 0;
    const prizeInEther = web3.utils.fromWei(contractPrize.toString(), "ether");
    const prizeInUsd =
      Math.round(prizeInEther * etherConvRate * 100) / 100;
    return( <React.Fragment><div className="game-bet-title-prize-eth">
    Total Prize: {prizeInEther}
    <Icon name="ethereum" size="small" />
  </div>
  <div className="game-bet-title-prize-usd">
    ({prizeInUsd})<Icon name="dollar" size="small" />
  </div></React.Fragment>)
}
