import React, { Component } from "react";
import { connect } from "react-redux";
import * as recentGamesActions from "../../store/recentGame/actions";
import { TeamsInfo } from "../common/TeamsInfo";
import { AllBets } from "../gameBet/AllBets";
import { GameTitle } from "../common/GameTitle";
import "./RecentGame.css";

class RecentGameMain extends Component {  
  componentDidMount() {
    this.props.dispatch(recentGamesActions.recentGame());
  }

  renderUserBet = () => {
    let recentBetContent;
    if(!this.props.user) {
      recentBetContent = 'please login or register';
    }    
      const userBet = this.props.userBet;
      
      if(Object.keys(userBet).length > 0){
        recentBetContent = (
        <React.Fragment>
            <div style={{fontSize: "1rem", padding: "0.8rem"}}>{this.props.userBet.betString}</div>
            <div>Score: {this.props.userBet.score} points</div>
        </React.Fragment>);
    }
    else {
        recentBetContent = (
            <div>No bet made</div>
        )
    }
    return (
        <div className="user-recent-bet-container">
        <div className="user-recent-bet-header">Your Bet</div>
        <div className="user-recent-bet-content">
        {recentBetContent}
        </div>
        </div>);
  }

  render() {
    if (!this.props.gameInfo.srId) {
      return <div>Fetching info...</div>;
    } else {      
      return (
        <div className="recent-game-container">
        <div className="recent-game-title">
        <GameTitle gameType = 'Recent' gameSchedule = {this.props.gameInfo.schedule} playoffSeries={this.props.gameInfo.playoffSeries}/>
        </div>
          <div className="recent-game-teams-info">
            <TeamsInfo gameInfo={this.props.gameInfo} mode="final" gameResults={this.props.gameResults} />
          </div>
          <div className="recent-game-bet">{this.renderUserBet()}</div>
          <div className="recent-game-chart"><AllBets allBets={this.props.allBets} scores={true}/></div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const user = state.userAuth.user;
  const gameInfo = state.recentGame.gameInfo;
  const gameResults = state.recentGame.gameResults;
  const userBet = state.recentGame.currentUserBet;
  const allBets = state.recentGame.allBets;
  return {
    user,
    gameInfo,
    gameResults,
    userBet,
    allBets
  };
}

export default connect(mapStateToProps)(RecentGameMain);
