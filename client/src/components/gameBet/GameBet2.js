import React from "react";
import "./GameBet2.css";

class GameBet2 extends React.Component {
  state = {
    homeTeam: {
      city: "Brooklyn",
      name: "Nets",
      wins: 17,
      loses: 21
    },
    awayTeam: {
      city: "Boston",
      name: "Celtics",
      wins: 21,
      loses: 15
    },
    betStatus: "none",
    chosenWinner: "",
    pointsDiff: 0
  };

  onClick = () => {
    console.log("bet init");
    this.setState({ betInit: "init" });
  };

  setWinner = e => {
    const chosenWinner = e.target.value;
    this.setState(
      () => { return { chosenWinner, betStatus: "winner" } },
      () => { console.log("updated winner state: " + this.state.chosenWinner); }
    );
  };

  render() {
    return (
      <div className="my-container">
        <div className="game-bet">
          <div
            className="team-details"
            style={{ float: "left", paddingLeft: "10%", textAlign: "right" }}
          >
            <h2 className="team-city">{this.state.homeTeam.city}</h2>
            <h3 className="team-name">{this.state.homeTeam.name}</h3>
            <h3 className="team-city">
              ({this.state.homeTeam.wins} - {this.state.homeTeam.loses})
            </h3>
          </div>
          <div className="game-at">
            <p>At</p>
            <button onClick={this.onClick}>Place Bet</button>
          </div>
          <div
            className="team-details"
            style={{ float: "right", paddingRight: "10%", textAlign: "left" }}
          >
            <h2 className="team-city">{this.state.awayTeam.city}</h2>
            <h3 className="team-name">{this.state.awayTeam.name}</h3>
            <h3 className="team-city">
              ({this.state.awayTeam.wins} - {this.state.awayTeam.loses})
            </h3>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              value="home"
              name="winner"
              onChange={this.setWinner}
            />
            Home
            <input
              type="radio"
              value="away"
              name="winner"
              onChange={this.setWinner}
            />
            Away
          </div>
        </div>
      </div>
    );
  }
}

export default GameBet2;
