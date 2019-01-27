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
  const homeImg = (
    <img
      src={require(`../../resources/images/40/${homeTeam.alias}-40.png`)}
      alt={homeTeam.name}
    />
  );
  const awayImg = (
    <img
      src={require(`../../resources/images/40/${awayTeam.alias}-40.png`)}
      alt={awayTeam.name}
    />
  );
  return (
    <div className="teams-info-container">
      <div className="game-header">Next Game on {gameDate}</div>
      <div className="home-team__img">{homeImg}</div>
      <div className="home-team__name">
        {homeTeam.city}<br/><b>{homeTeam.name}</b>
      </div>
      <div className="home-team__stats">
        ({homeTeam.wins} - {homeTeam.losses})
      </div>
      <div className="away-team__img">{awayImg}</div>
      <div className="away-team__name">
        {awayTeam.city}<br/><b>{awayTeam.name}</b>
      </div>
      <div className="away-team__stats">
        ({awayTeam.wins} - {awayTeam.losses})
      </div>
    </div>
  );
};
