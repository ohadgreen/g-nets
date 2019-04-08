import React from "react";
import { connect } from "react-redux";
import getPastGames from "../../services/pastGames.service";
import { Table, Dropdown, Button, Checkbox } from "semantic-ui-react";
import utils from "../../services/utils.service";
import "./PastGames.css";

class PastGames extends React.Component {
  state = {
    daysDiff: null,
    userOnly: false,
    gamesData: []
  };

  async componentDidMount() {
    this.fetchPastGames();
  }

  setDaysDiff = (e, { value }) => {
    this.setState({ daysDiff: value });
  };
  changeUserOnly = (e, { checked }) => {
    this.setState({ userOnly: checked });
  };

  fetchPastGames = async () => {
    const gamesData = await getPastGames.getAllPastGames({
      daysDiff: this.state.daysDiff
    });
    this.setState({ gamesData });
  };

  renderGame = (game, i) => {
    const userIdForBetFind = this.props.user ? this.props.user.id : "kawabanga";
    const currentGameUserBet = utils.findCurrentUserBet(game, userIdForBetFind);
    const userBetThisGame = Object.keys(currentGameUserBet).length > 0;
    const homeTeamWon = game.results.homePoints > game.results.awayPoints;
    const homePointsColor = homeTeamWon ? "red" : "black";
    const awayPointsColor = homeTeamWon ? "black" : "red";
    const finalScore = (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ color: homePointsColor }}>{game.results.homePoints}</div>{" "}
        -{" "}
        <div style={{ color: awayPointsColor }}>{game.results.awayPoints}</div>
      </div>
    );
    if (this.state.userOnly && !userBetThisGame) {
      return null;
    } else {
      return (
        <tr key={i}>
          <td>{utils.parseDateToString(game.schedule)}</td>
          <td>
            {game.homeTeam.city} {game.homeTeam.name}
          </td>
          <td>{finalScore}</td>
          <td>
            {game.awayTeam.city} {game.awayTeam.name}
          </td>
          <td>{userBetThisGame > 0 ? currentGameUserBet.betString : "-"}</td>
          <td>{userBetThisGame > 0 ? currentGameUserBet.score : "-"}</td>
        </tr>
      );
    }
  };
  render() {
    if (this.state.gamesData.length === 0) {
      return <div>Fetching Data</div>;
    }
    return (
      <div className="past-games-container">
        <div className="options-ruler">
          <div className="daysdiff-choice">
            <label>Choose How Many Games: </label>
            <Dropdown
              placeholder={"###"}
              onChange={this.setDaysDiff}
              options={utils.dropDownNumberOptions(60)}
              scrolling
            />
            <Button size="tiny" color="blue" onClick={this.fetchPastGames}>
              Shoot!
            </Button>
          </div>
          <div className="user-only-choice">
            <Checkbox
              label={{ children: "Only Games I bet" }}
              onChange={this.changeUserOnly}
            />
          </div>
        </div>
        <div className="past-games-table">
          <Table celled striped compact size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Schedule</Table.HeaderCell>
                <Table.HeaderCell>Home Team</Table.HeaderCell>
                <Table.HeaderCell>Final Score</Table.HeaderCell>
                <Table.HeaderCell>Away Team</Table.HeaderCell>
                <Table.HeaderCell>Your Bet</Table.HeaderCell>
                <Table.HeaderCell>Your Score</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.gamesData.map((game, i) => this.renderGame(game, i))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state.userAuth.user;
  return {
    user
  };
}
export default connect(mapStateToProps)(PastGames);
