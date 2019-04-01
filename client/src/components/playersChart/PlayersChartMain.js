import React, { Component } from "react";
import { connect } from "react-redux";
import * as playersChartActions from "../../store/playerScores/actions";
import { RenderAvatar } from "../common/RenderAvatar";
import { Table } from "semantic-ui-react";
import "./PlayersChart.css";

class PlayersChartMain extends Component {  
  componentDidMount() {
    this.props.dispatch(playersChartActions.allPlayerScores());
  }

  renderUserScore = (user, i) => {
    return (
      <tr key={i}>
        <td>{i+1}</td>
        <td><RenderAvatar user={user} /></td>
        <td>{user.bets.totalBets}</td>
        <td>{user.bets.totalScore}</td>
        <td>{user.bets.avgScore.toFixed(2)}</td>
      </tr>
    );
  }

  render() {
    if (this.props.allPlayerScores.length === 0) {
      return <div>Fetching info...</div>;
    } else {      
      return (
        <div className="players-chart-container">
        <div className="players-chart-header">Overall Standings</div>
          <div className="players-chart-content">
          <Table celled striped compact size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Player</Table.HeaderCell>
              <Table.HeaderCell>Total Bets</Table.HeaderCell>
              <Table.HeaderCell>Total Score</Table.HeaderCell>
              <Table.HeaderCell>Average Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.allPlayerScores.map((bet, i) => {
              if (i < 10) {
                return this.renderUserScore(bet, i);
              } else return "";
            })}
          </Table.Body>
        </Table>
        </div>
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
