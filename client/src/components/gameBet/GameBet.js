import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as gamesActions from "../../store/gameBet/actions";
import { TeamsInfo } from "../common/TeamsInfo";
import { AllBets } from "./AllBets";
import web3 from "../../services/web3";
import contract from "../../services/contract";
import { Dropdown, Button, Input } from "semantic-ui-react";
import "./GameBet.css";

class GameBet extends Component {
  state = {
    chosenWinner: "",
    pointsDiff: 0,
    millietherValue: 0,
    totalPrizeWei: 0,
  };

  async componentDidMount() {
    this.props.dispatch(gamesActions.newGame());
    const totalPrizeWei = await contract.methods.showTotalBetSum().call();
    this.setState({ totalPrizeWei });
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

  placeBetEther = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const betValueEther = this.state.millietherValue / 1000;
    const betValueString = betValueEther.toString();
    console.log(`account: ${accounts[0]} betValEther: ${betValueEther} bvString: ${betValueString}`);

    await contract.methods.placeBet(this.props.user.intcode).send({
      from: accounts[0],
      value: web3.utils.toWei(betValueString, "ether")
    });
    this.placeBetPlain();
  };

  placeBetPlain = () => {
    const winnerTeamName =
      this.state.chosenWinner === "homeTeam"
        ? this.props.gameInfo.homeTeam.name
        : this.props.gameInfo.awayTeam.name;
    const userBet = {
      gameid: this.props.gameid,
      user: this.props.user.id,
      winner: this.state.chosenWinner,
      pointsDiff: this.state.pointsDiff,
      ether: this.state.millietherValue,
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

  pointsDiffOtions = n => {
    let pointsDiffMenuItems = [];
    for (let i = 1; i <= n; i++) {
      pointsDiffMenuItems.push({ text: i, value: i });
    }
    return pointsDiffMenuItems;
  };

  renderTitle = () => {        
    // const prizeInUsd = await web3.utils.fromWei(totalPrizeWei, 'ether') * this.props.etherConvRateValue;
    console.log('ether conversion: ' + this.props.etherConvRateValue + ' prize: ' + this.state.totalPrizeWei);
    return (<div className="game-bet-title">
        <div className="game-bet-title-main">Game bet title</div>
        <div className="game-bet-title-prize">Total Prize: {this.state.totalPrizeWei} ()</div>
    </div>);
  }

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
        <div className="winner-header">Winner</div>
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
        <div className="points-diff-header">Points Diff</div>
        <div className="points-diff-dd">
          <Dropdown
            placeholder={"choose"}
            onChange={this.setPointsDiff}
            options={this.pointsDiffOtions(35)}
            scrolling
          />
        </div>
        <div className="bet-option-head">Bet Options</div>
        <div className="bet-eth-sum"><Input            
            size='mini'
            value={this.state.millietherValue}
            onChange={(e) => this.setState({ millietherValue: e.target.value })}
            />
        </div>
        <div className="eth-bet-button">
        <Button size="tiny"
          color='green' 
          disabled={this.state.chosenWinner === "" || this.state.pointsDiff === 0 || this.state.miliEtherValue === 0} 
          onClick={this.placeBetEther}>
          Ether Bet
        </Button>
        </div>
        <div className="plain-bet-button">
        <Button size="tiny"
          color='blue' 
          disabled={this.state.chosenWinner === "" || this.state.pointsDiff === 0} 
          onClick={this.placeBetPlain}>
          Plain Bet
        </Button>
        </div>
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
        <Button size="tiny" disabled={disableBtn} onClick={this.placeBetPlain}>
          bet
        </Button>
      );
    }
  };

  render() {
    let userGameBet;
    let hour = new Date().getHours();
    const betHours = (hour < 2 || hour > 8);

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
        {this.renderTitle()}        
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
  // console.log('GameBet user: ' + JSON.stringify(user));
  const gameInfo = state.game.gameInfo;
  const gameid = state.game.gameid;
  const finalizedBet = state.game.finalizedBet;
  const userBet = state.game.currentUserBet;
  const allBets = state.game.allBets;
  const etherConvRateValue = state.game.etherConvRateValue;
  // console.log(`new game: ${gameid}`);
  return {
    user,
    gameInfo,
    gameid,
    finalizedBet,
    userBet,
    allBets,
    etherConvRateValue
  };
}

export default connect(mapStateToProps)(GameBet);

// 09-7651489 bachar