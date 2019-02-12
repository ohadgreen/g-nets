import React from "react";
import "./TeamsInfo.css";

export const TeamsInfo = props => {
  const gameSched = new Date(Date.parse(props.gameInfo.schedule));
  const gameDate =
    gameSched.getDate() +
    "-" +
    (gameSched.getMonth() + 1) +
    "-" +
    gameSched.getFullYear();
  const homeTeam = props.gameInfo.homeTeam;
  const awayTeam = props.gameInfo.awayTeam;

  return (
    <div className="teams-info-container">
      <div className="game-header">{gameDate}</div>
      <div className="home-team__img">{getTeamImage(homeTeam)}</div>
      <div className="home-team__details">
        <div>{homeTeam.city} <b>{homeTeam.name}</b></div>
        <div>
          ({homeTeam.wins} - {homeTeam.losses})
        </div>
      </div>
      <div className="away-team__img">{getTeamImage(awayTeam)}</div>
      <div className="away-team__details">
      <div>{awayTeam.city} <b>{awayTeam.name}</b></div>
        <div>
          ({awayTeam.wins} - {awayTeam.losses})
        </div>
      </div>
      {(props.mode === 'stats') ? renderTeamStats(homeTeam, awayTeam):renderFinalScore(props.gameResults)}
    </div>
  );
};

function getTeamImage(team) {
  return (<img
    src={require(`../../resources/images/ext/${team.alias}-70.png`)}
    alt={team.name}
  />)
}

function renderTeamStats (homeTeam, awayTeam){
  return (
   <React.Fragment>
    <div className="stats-header">Team Stats</div>
      <div className="home-stats">
        <div>Points for: {homeTeam.pointsFor}</div>
        <div>Points Against: {homeTeam.pointsAgainst}</div>
        <div>Points Diff: {homeTeam.pointsDiff}</div>
      </div>
      <div className="away-stats">
        <div>Points for: {awayTeam.pointsFor}</div>
        <div>Points Against: {awayTeam.pointsAgainst}</div>
        <div>Points Diff: {awayTeam.pointsDiff}</div>
      </div>
      </React.Fragment>
  );
};

function renderFinalScore(gameResults) {
  const homeTeamWon = (gameResults.homePoints > gameResults.awayPoints);
  const homePointsColor = homeTeamWon ? 'red' : 'black';
  const awayPointsColor = homeTeamWon ? 'black' : 'red';
  return (
    <React.Fragment>
      <div className="stats-header">Final Score</div>
        <div className="home-stats" >
          <div style={{fontSize: "16px", color: homePointsColor}}>{gameResults.homePoints}</div>
        </div>
        <div className="away-stats">
          <div style={{fontSize: "16px", color: awayPointsColor}}>{gameResults.awayPoints}</div>
        </div>          
        </React.Fragment>
    );
}
