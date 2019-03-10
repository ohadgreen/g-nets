import React from "react";
import { RenderAvatar } from "../common/RenderAvatar";

export const AllBets = props => {
  let allBetsDisplay = props.scores
    ? props.allBets.filter(b => b.score > 0)
    : props.allBets;

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
              else return ''
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
      <td><RenderAvatar user={bet.user} /></td>
      <td>{bet.betString}</td>
      {bet.score ? <td>{bet.score}</td> : null}
      {bet.ether ? <td>{bet.ether}</td> : null}
    </tr>
  );
}
