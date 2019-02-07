import React, { Component } from "react";
import { connect } from "react-redux";
import * as playersChartActions from "../../store/playerScores/actions";
import { AllScores } from "../gameBet/AllScores";
import "./PlayersChart.css";

class PlayersChartMain extends Component {  
  componentDidMount() {
    this.props.dispatch(playersChartActions.allPlayerScores());
  }

  render() {
    if (this.props.allPlayerScores.length === 0) {
      return <div>Fetching info...</div>;
    } else {      
      return (
        <div className="players-chart-container">
          <div className="all-bets"><AllScores allScores={this.props.allPlayerScores}/></div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const user = state.userAuth.user;
  const allPlayerScores = state.playerScores.allPlayerScores;
//   console.log("mstp allScores: " + JSON.stringify(allPlayerScores));
  return {
    user,
    allPlayerScores
  };
}

export default connect(mapStateToProps)(PlayersChartMain);
