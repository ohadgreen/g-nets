import React from "react";
import "./AllBets.css";
import { RenderAvatar } from "../common/RenderAvatar";

export const AllScores = props => {
  
  return (
    <div className="all-bets-container">
      <div className="all-bets-header">All Players Scores</div>
      <div className="all-bets-content">
        <table>
          <thead>
          <tr>
      <td>Player</td>
      <td>Total Bets</td>
      <td>Total Score</td>
      <td>Average Score</td>
    </tr>
          </thead>
          <tbody>
            {props.allScores.map((user, i) => {
              if (i < 10) {
                return renderUserScore(user, i);
              }
              else return ''
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function renderUserScore(user, i) {
  return (
    <tr key={i}>
      <td><RenderAvatar user={user} /></td>
      <td>{user.bets.totalBets}</td>
      <td>{user.bets.totalScore}</td>
      <td>{user.bets.avgScore.toFixed(2)}</td>
    </tr>
  );
}
