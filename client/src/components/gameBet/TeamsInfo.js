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
    <div className="teams-info-container">
      <div className="game-header">{gameDate}</div>
      <div className="home-team__img">{homeImg}</div>
      <div className="home-team__details">
        <div>{homeTeam.city} <b>{homeTeam.name}</b></div>
        <div>
          ({homeTeam.wins} - {homeTeam.losses})
        </div>
      </div>
      <div className="away-team__img">{awayImg}</div>
      <div className="away-team__details">
      <div>{awayTeam.city} <b>{awayTeam.name}</b></div>
        <div>
          ({awayTeam.wins} - {awayTeam.losses})
        </div>
      </div>
    </div>
  );
};
