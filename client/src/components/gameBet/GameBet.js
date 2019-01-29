import React, { Component } from "react";
import { connect } from "react-redux";
import * as gamesActions from "../../store/gameBet/actions";
import { TeamsInfo } from "./TeamsInfo";
import { Dropdown, Button } from "semantic-ui-react";
import "./GameBet.css";

class GameBet extends Component {
  state = {
    chosenWinner: "",
    pointsDiff: 0
  };

  componentDidMount() {
    this.props.dispatch(gamesActions.newGame());
  }
  setWinner = e => {
    const chosenWinner = e.target.value;
    this.setState(
      () => {
        return { chosenWinner, betStatus: "winner" };
      },
      () => {
        console.log("updated winner state: " + this.state.chosenWinner);
      }
    );
  };

  setPointsDiff = (e, { value }) => {
    this.setState(
      () => {
        return { pointsDiff: value };
      },
      () => console.log("pointsDiff: " + this.state.pointsDiff)
    );
  };

  placeBet = () => {
    const winnerTeamName = (this.state.chosenWinner === 'homeTeam') ? this.props.gameInfo.homeTeam.name : this.props.gameInfo.awayTeam.name
    const userBet = {
      gameid: this.props.gameid,
      user: this.props.user.id,
      winner: this.state.chosenWinner,
      pointsDiff: this.state.pointsDiff,
      betString: `${winnerTeamName} by ${this.state.pointsDiff}`
    }
    this.props.dispatch(gamesActions.addBet(userBet));
  }

  removeBet = () => {
    this.setState({ chosenWinner: "", pointsDiff: 0 })
    const userBet = { gameid: this.props.gameid, betid: this.props.userBet._id }
    this.props.dispatch(gamesActions.removeBet(userBet));
  }

  pointsDiffOtionsTest = n => {
    let pointsDiffMenuItems = [];
    for (let i = 1; i <= n; i++) {
      pointsDiffMenuItems.push({ text: i, value: i });
    }
    return pointsDiffMenuItems;
  };

  renderUserBet = () => {
    return (
    <div className="user-bet-container">
      <div className="winner-header">Choose winner</div>
      <div className="home-win">
        <input
          type="radio"
          value="homeTeam"
          name="winner"
          onChange={this.setWinner}
        />
      </div>
      <div className="away-win">
        <input
          type="radio"
          value="awayTeam"
          name="winner"
          onChange={this.setWinner}
        />
      </div>
      <div className="points-diff-head">Points diff</div>
      <div className="points-diff-dd">
        <Dropdown
          placeholder="Select"
          scrolling
          value={this.state.pointsDiff}
          onChange={this.setPointsDiff}
          options={this.pointsDiffOtionsTest(35)}
        />
      </div>
    </div>);
  };

  renderExistsBet = () => {
    return this.props.userBet.betString;
  }

  renderBetButton = () => {
    if(this.props.finalizedBet){
      return (
        <div><Button size="tiny" onClick={this.removeBet}>Remove</Button></div>
      )
    }
    else {
      const disableBtn = (this.state.chosenWinner === "" || this.state.pointsDiff === 0);
      return (
        <div><Button size="tiny" disabled={disableBtn} onClick={this.placeBet}>Place bet</Button></div>
      )
    }
  }

  renderAllBets = () => {
    return (
      <ul>
      {this.props.allBets.map((b, i) => { return (<li key={i}>{b.user.username} {b.betString}</li>)})}
      </ul>
    )
  }

  render() {
    if (!this.props.gameInfo.srId) {
      return <div>Fetching info...</div>;
    } else {      
      return (
        <div className="gamebet-container" style={{'gridTemplateAreas': (this.props.finalizedBet) ? "'teams ebet ebet bbtn abet abet'" : "'teams nbet nbet bbtn abet abet'"}}>
          <div className="teams-info">
            <TeamsInfo gameInfo={this.props.gameInfo} />
          </div>
          {(this.props.finalizedBet) ? (<div className="exists-bet">{this.renderExistsBet()}</div>) :(<div className="new-bet">{this.renderUserBet()}</div>)}
          <div className="bet-button">{this.renderBetButton()}</div>
          <div className="all-bets">{this.renderAllBets()}</div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const user = state.userAuth.user;
  const gameInfo = state.game.gameInfo;
  const gameid = state.game.gameid;
  const finalizedBet = state.game.finalizedBet;
  const userBet = state.game.currentUserBet;
  const allBets = state.game.allBets;
  // console.log("mstp userBet: " + JSON.stringify(userBet));
  // console.log("mstp allBets: " + JSON.stringify(allBets));
  // console.log('finalized: ' + finalizedBet);
  return {
    user,
    gameInfo,
    gameid,
    finalizedBet,
    userBet,
    allBets
  };
}

export default connect(mapStateToProps)(GameBet);
