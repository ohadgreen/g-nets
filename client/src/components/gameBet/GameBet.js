import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as gamesActions from "../../store/gameBet/actions";
import { TeamsInfo } from "../common/TeamsInfo";
import { AllBets } from "./AllBets";
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
    const winnerTeamName =
      this.state.chosenWinner === "homeTeam"
        ? this.props.gameInfo.homeTeam.name
        : this.props.gameInfo.awayTeam.name;
    const userBet = {
      gameid: this.props.gameid,
      user: this.props.user.id,
      winner: this.state.chosenWinner,
      pointsDiff: this.state.pointsDiff,
      betString: `${winnerTeamName} by ${this.state.pointsDiff}`,
      score: 0
    };
    this.props.dispatch(gamesActions.addBet(userBet));
  };

  removeBet = () => {
    this.setState({ chosenWinner: "", pointsDiff: 0 });
    const userBet = {
      gameid: this.props.gameid,
      betid: this.props.userBet._id
    };
    this.props.dispatch(gamesActions.removeBet(userBet));
  };

  pointsDiffOtionsTest = n => {
    let pointsDiffMenuItems = [];
    for (let i = 1; i <= n; i++) {
      pointsDiffMenuItems.push({ text: i, value: i });
    }
    return pointsDiffMenuItems;
  };

  renderPleaseLogin = () => {
    return (
      <div>
        To guess game results, please <Link to="/login">Login</Link> or{" "}
        <Link to="/register">Register</Link>
      </div>
    );
  };
  renderOffHoursNoBets = () => {
    return <div>No bets for current game</div>;
  };

  renderUserBet = () => {
    return (
      <div className="new-bet-container">
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
        <div className="points-diff-header">Points diff</div>
        <div className="points-diff-dd">
          <Dropdown
            placeholder={"choose"}
            onChange={this.setPointsDiff}
            options={this.pointsDiffOtionsTest(35)}
            scrolling
          />
        </div>
        <div className="bet-button">{this.renderBetButton()}</div>
      </div>
    );
  };

  renderExistsBet = betHours => {
    return (
      <div className="exists-bet-container">
        <div className="exists-bet-header">Your Bet</div>
        <div className="exists-bet-content">{this.props.userBet.betString}</div>
        <div className="exists-bet-remove-btn">
          {betHours ? this.renderBetButton() : null}
        </div>
      </div>
    );
  };

  renderBetButton = () => {
    if (this.props.finalizedBet) {
      return (
        <Button size="tiny" onClick={this.removeBet}>
          Remove
        </Button>
      );
    } else {
      const disableBtn =
        this.state.chosenWinner === "" || this.state.pointsDiff === 0;
      return (
        <Button size="tiny" disabled={disableBtn} onClick={this.placeBet}>
          bet
        </Button>
      );
    }
  };

  render() {
    let userGameBet;
    let hour = new Date().getHours();
    const betHours = hour > 8;

    if (!this.props.user) {
      userGameBet = this.renderPleaseLogin();
    } else {
      if (!this.props.finalizedBet && betHours)
        userGameBet = this.renderUserBet();
      if (!this.props.finalizedBet && !betHours)
        userGameBet = this.renderOffHoursNoBets();
      if (this.props.finalizedBet) userGameBet = this.renderExistsBet(betHours);
    }

    if (!this.props.gameInfo.srId) {
      return <div>Fetching info...</div>;
    } else {
      return (
        <div className="gamebet-container">
          <div className="teams-info">
            <TeamsInfo
              gameInfo={this.props.gameInfo}
              mode="stats"
              gameResults={{}}
            />
          </div>
          <div className="user-game-bet">{userGameBet}</div>
          <div className="all-bets">
            <AllBets allBets={this.props.allBets} scores={false} />
          </div>
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
  console.log(`new game: ${gameid}`);
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
