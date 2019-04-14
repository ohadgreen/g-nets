import React from "react";
import web3 from "../../services/web3";
import { Icon } from "semantic-ui-react";
import utils from '../../services/utils.service';
import "./TeamsInfo.css";
import "./GameTitle.css";

export const GameTitle = props => {
  return (
    <div className="game-bet-title-flex">
      <div className="game-bet-title-main">{props.gameType} Game: {utils.parseDateToString(props.gameSchedule)} {formatPlayoffSerieTitle(props.playoffSeries)} </div>
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

function formatPlayoffSerieTitle(playoffSeriesInfo) {
  if(playoffSeriesInfo){
    try {
      const seriesTitleSplit = playoffSeriesInfo.seriesTitle.split(" - ");
      if(seriesTitleSplit.length > 1){
        return seriesTitleSplit[0] + ' - ' + seriesTitleSplit[1] + ' - ' + playoffSeriesInfo.gameTitle;
      }
    } catch (error) {
      return null;   
    }
  }
  else {
    return null;
  }
}
