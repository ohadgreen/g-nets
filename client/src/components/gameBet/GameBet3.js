import React, { Component } from "react";
import { connect } from "react-redux";
import * as gamesActions from "../../store/gameBet/actions";
import { Dropdown } from 'semantic-ui-react';
import "./GameBet3.css";

class GameBet3 extends Component {
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
      () => { return { chosenWinner, betStatus: "winner" } },
      () => { console.log("updated winner state: " + this.state.chosenWinner); }
    );
  };

  pointsDiffOptions = (n) => {
      let pointsDiffArr = [];
      for (let i=1; i<=n; i++) { pointsDiffArr.push(i) }
    //   return pointsDiffArr;
    return['a', 'b', 'c'];
  }

  render() {
    if (!this.props.gameInfo.srId) {
      return <div>Fetching info...</div>;
    } else {
      const gameSched = new Date(Date.parse(this.props.gameInfo.schedule));
      const gameDate =
        gameSched.getDate() +
        "-" +
        (gameSched.getMonth() + 1) +
        "-" +
        gameSched.getFullYear();
      const homeTeam = this.props.gameInfo.homeTeam;
      const awayTeam = this.props.gameInfo.awayTeam;
      const homeImg = (
        <img
          src={require(`../../resources/images/50/${homeTeam.alias}-50.png`)}
          alt={homeTeam.name}
        />
      );
      const awayImg = (
        <img
          src={require(`../../resources/images/50/${awayTeam.alias}-50.png`)}
          alt={awayTeam.name}
        />
      );
      return (
        <div className="gamebet-container">
          <div className="game-header">Next Game on {gameDate}</div>
          <div className="home-team__img">{homeImg}</div>
          <div className="home-team__name">
            {homeTeam.city} {homeTeam.name}
          </div>
          <div className="home-team__stats">
            ({homeTeam.wins} - {homeTeam.losses})
          </div>
          <div className="away-team__img">{awayImg}</div>
          <div className="away-team__name">
            {awayTeam.city} {awayTeam.name}
          </div>
          <div className="away-team__stats">
            ({awayTeam.wins} - {awayTeam.losses})
          </div>
          <div className="winner-head">Choose winner</div>
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
          <Dropdown placeholder='Differene' scrolling options={[1, 2, 3]/* this.pointsDiffOptions(20) */} /></div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const user = state.userAuth.user;
  const gameInfo = state.game.gameInfo;
  console.log("mstp gameInfo: " + JSON.stringify(gameInfo));
  return {
    user,
    gameInfo
  };
}

export default connect(mapStateToProps)(GameBet3);
