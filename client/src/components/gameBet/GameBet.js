import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as gamesActions from "../../store/gameBet/actions";
import { TeamsInfo } from "../common/TeamsInfo";
import AllBets from "./AllBets";
import { GameTitle } from "../common/GameTitle";
import web3 from "../../services/web3";
import contract from "../../services/contract";
import utils from "../../services/utils.service";
import {
  Dropdown,
  Button,
  Input,
  Dimmer,
  Loader,
  Segment,
  Label, 
  Icon 
} from "semantic-ui-react";
import "./GameBet.css";

class GameBet extends Component {
  state = {
    chosenWinner: "",
    pointsDiff: 0,
    millietherValue: 0,
    loadingSpinner: false,
    inputError: ""
  };

  async componentDidMount() {
    this.props.dispatch(gamesActions.newGame());
  }
  setWinner = e => {
    const chosenWinner = e.target.value;
    this.setState({ chosenWinner });
  };

  setPointsDiff = (e, { value }) => {
    this.setState({ pointsDiff: value });
  };

  placeBetEther = async event => {
    event.preventDefault();
    const etherSumInput = this.state.millietherValue;
    let accounts = [];
    if(web3 && web3.eth){
      accounts = await web3.eth.getAccounts();
    }      
    console.log('mm account: ' + JSON.stringify(accounts[0]));
    console.log(`${accounts.length} accounts undef: ${accounts.length === 0}`);
    if(isNaN(etherSumInput) || etherSumInput >=20 || etherSumInput <= 200){
      this.setState({ inputError: "value must be between 20-200" })
    }
    if (accounts.length === 0) {
      console.log('metamask closed');
      this.setState({ inputError: "please verify Metamask is installed and you logged in" })
    }
    if (!isNaN(etherSumInput) && etherSumInput >=20 && etherSumInput <= 200 && accounts.length > 0) {
      console.log('place bet');
    this.setState({ loadingSpinner: true, inputError: '' });
    const betValueEther = this.state.millietherValue / 1000;
    const betValueString = betValueEther.toString();
    console.log(
      `account: ${
        accounts[0]
      } betValEther: ${betValueEther} bvString: ${betValueString}`
    );
      try {
        await contract.methods.placeBet(this.props.user.intcode).send({
          from: accounts[0],
          value: web3.utils.toWei(betValueString, "ether")
        });
        this.placeBetPlain();
      } catch (error) {
        this.setState({ loadingSpinner: false, inputError: 'Metamask transaction rejected' })
      }
  }
  };

  placeBetPlain = () => {
    const winnerTeamName =
      this.state.chosenWinner === "homeTeam"
        ? this.props.gameInfo.homeTeam.name
        : this.props.gameInfo.awayTeam.name;
    const userBet = {
      gameid: this.props.gameid,
      user: this.props.user.id,
      intcode: this.props.user.intcode,
      winner: this.state.chosenWinner,
      pointsDiff: this.state.pointsDiff,
      ether: this.state.millietherValue,
      betString: `${winnerTeamName} by ${this.state.pointsDiff}`,
      score: 0
    };
    this.setState({ loadingSpinner: true });
    this.props.dispatch(gamesActions.addBet(userBet));
  };
  
  removeBet = () => {
    this.setState({ chosenWinner: "", pointsDiff: 0, loadingSpinner: false });
    const userBet = {
      gameid: this.props.gameid,
      betid: this.props.userBet._id
    };
    this.props.dispatch(gamesActions.removeBet(userBet));
  };

  renderPleaseLogin = () => {
    return (
      <div className="user-please-login">
        To play, please <span>&nbsp;</span> <Link to="/login">Login</Link><span>&nbsp; or &nbsp;</span>
        <Link to="/register">Register</Link>
      </div>
    );
  };
  renderOffHoursNoBets = () => {
    return <div>No more bets for current game</div>;
  };

  renderUserBet = () => {
    const homeTeamName = this.props.gameInfo.homeTeam
      ? this.props.gameInfo.homeTeam.name
      : "home team";
    const awayTeamName = this.props.gameInfo.awayTeam
      ? this.props.gameInfo.awayTeam.name
      : "away team";
    const spinnerText =
      this.state.millietherValue === 0
        ? "Booking your bet"
        : "Transaction confirmation in progress...";
    return (
      <Segment basic padded={false}>
        <Dimmer active={this.state.loadingSpinner}>
          <Loader active={this.state.loadingSpinner} content={spinnerText} />
        </Dimmer>
        <div className="user-game-bet">
          <div className="winner-points-container">
            <div className="winner-header">Winner</div>
            <div className="home-win">
              <label htmlFor="home" style={{ padding: "5px" }}>
                {homeTeamName}
              </label>
              <input
                id="home"
                type="radio"
                value="homeTeam"
                name="winner"
                onChange={this.setWinner}
              />
            </div>
            <div className="away-win">
              <label htmlFor="home" style={{ padding: "5px" }}>
                {awayTeamName}
              </label>
              <input
                id="away"
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
                options={utils.dropDownNumberOptions(35)}
                scrolling
              />
            </div>
          </div>
          <div className="bet-options-container">
            <div className="bet-option-head">Bet Options</div>
            <div className="plain-bet-option">
              <div className="plain-bet-button">
                <Button
                  size="tiny"
                  color="blue"
                  disabled={
                    this.state.chosenWinner === "" ||
                    this.state.pointsDiff === 0
                  }
                  onClick={this.placeBetPlain}
                >
                  Plain Bet
                </Button>
              </div>
            </div>
            <div className="ether-bet-option">
            <Label color={this.state.inputError === "" ? 'grey' : 'red'}  pointing='below'>
            {this.state.inputError === "" ? 'Please enter a value' : this.state.inputError}
              </Label>
              <div className="bet-eth-sum">
                <Input
                  size="mini"
                  label={{ basic: true, content: 'milliether' }}
                  labelPosition='right'
                  placeholder='20-200'
                  onChange={e => 
                    this.setState({ millietherValue: e.target.value, inputError: '' })
                  }
                />
              </div>
              <div className="eth-bet-button">
                <Button
                  size="tiny"
                  color="green"
                  disabled={
                    this.state.chosenWinner === "" ||
                    this.state.pointsDiff === 0 ||
                    this.state.miliEtherValue === 0
                  }
                  onClick={this.placeBetEther}
                >
                  Ether Bet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Segment>
    );
  };

  renderExistsBet = betHours => {
    return (
      <div className="exists-bet-container">
        <div className="exists-bet-header">Your Bet</div>
        <div className="exists-bet-content">{this.props.userBet.betString}</div>
        <div className="exists-bet-ether">{this.props.userBet.ether}<Icon name="ethereum" size="small" /></div>
        <div className="exists-bet-remove-btn">
          {betHours && this.props.userBet.ether === 0 ? <Button color="red" size="tiny" onClick={this.removeBet}>
          Cancel
        </Button> : null}
        </div>
      </div>
    );
  };
  
  render() {
    let userGameBet;
    let hour = new Date().getHours();
    const betHours = hour < 2 || hour > 8;

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
          <div className="game-bet-title">
            <GameTitle
              gameType="Next"
              gameSchedule={this.props.gameInfo.schedule}
              contractPrize={this.props.contractPrize}
              etherConvRate={this.props.etherConvRateValue}
              playoffSeries={this.props.gameInfo.playoffSeries}
            />
          </div>
          <div className="teams-info">
            <TeamsInfo
              gameInfo={this.props.gameInfo}
              mode="stats"
              gameResults={{}}
            />
          </div>
          {userGameBet}
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
  const contractPrize = state.game.contractPrize;
  return {
    user,
    gameInfo,
    gameid,
    finalizedBet,
    userBet,
    allBets,
    etherConvRateValue,
    contractPrize
  };
}
export default connect(mapStateToProps)(GameBet);
