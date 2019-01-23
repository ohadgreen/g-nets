import React, { Component } from "react";
import { connect } from "react-redux";
import * as gamesActions from "../../store/gameBet/actions";
import { TeamsInfo } from "./TeamsInfo";
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

  setPointsDiff = (e, { value }) => {
      this.setState(
          () => { return { pointsDiff: value } }, 
          () => console.log('pointsDiff: ' + this.state.pointsDiff)
        )
    };

  pointsDiffOtionsTest = (n) => {
    let pointsDiffMenuItems = [];
    for (let i=1; i<=n; i++) {
      pointsDiffMenuItems.push({text: i, value: i}) 
  }
    return pointsDiffMenuItems;
  }

  render() {
    if (!this.props.gameInfo.srId) {
      return <div>Fetching info...</div>;
    } else {
      return (
        <div className="gamebet-container">
         <div className="teams-info"><TeamsInfo gameInfo={this.props.gameInfo} /></div>
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
          <Dropdown placeholder='"points"' scrolling value={this.state.pointsDiff} onChange={this.setPointsDiff} options={this.pointsDiffOtionsTest(35)}>
          
          </Dropdown></div>
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
