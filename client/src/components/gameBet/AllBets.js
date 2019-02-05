import React from "react";
import "./AllBets.css";

export const AllBets = props => {
  let allBetsDisplay = (props.scores)? (props.allBets.filter(b =>  (b.score > 0))) : (props.allBets);
  
  return (
    <div className="all-bets-container">
      <div className="all-bets-header">All Players bets</div>
      <div className="all-bets-content">
        <table>
          <tbody>
            {allBetsDisplay.map((bet, i) => {
              if (i < 5) {
                return renderBet(bet, i);
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function renderBet(bet, i) {
  return (
    <tr key={i}>
      <td>{bet.user.username}</td>
      <td>{bet.betString}</td>
      {bet.score ? <td>{bet.score}</td> : null}
    </tr>
  );
}
