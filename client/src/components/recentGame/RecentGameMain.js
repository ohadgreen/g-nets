import React, { Component } from "react";
import { connect } from "react-redux";
import * as recentGamesActions from "../../store/recentGame/actions";
import { TeamsInfo } from "../gameBet/TeamsInfo";
import { AllBets } from "../gameBet/AllBets";
import "./RecentGame.css";

class RecentGameMain extends Component {  
  componentDidMount() {
    this.props.dispatch(recentGamesActions.recentGame());
  }

  renderAllBets = () => {
    return (
      <ul>
      {this.props.allBets.map((b, i) => { return (<li key={i}>{b.user.username} {b.betString}</li>)})}
      </ul>
    )
  }

  renderUserBet = () => {
      const userBet = this.props.userBet;
      if(Object.keys(userBet).length > 0){
          return this.props.userBet.betString; 
      }      
      else {
          return 'No bet made';
      }
  }

  render() {
    if (!this.props.gameInfo.srId) {
      return <div>Fetching info...</div>;
    } else {      
      return (
        <div className="recent-game-container">
          <div className="teams-info">
            <TeamsInfo gameInfo={this.props.gameInfo} mode="final" gameResults={this.props.gameResults} />
          </div>
          <div className="user-bets">{this.renderUserBet()}</div>
          <div className="all-bets"><AllBets allBets={this.props.allBets} scores={true}/></div>
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
  console.log("mstp allBets: " + JSON.stringify(allBets));
  console.log('mstp results: ' + JSON.stringify(gameResults));
  return {
    user,
    gameInfo,
    gameResults,
    userBet,
    allBets
  };
}

export default connect(mapStateToProps)(RecentGameMain);
