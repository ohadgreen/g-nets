import React from "react";
import "./AllBets.css";

export const AllBets = props => {
  
  return (
    <div className="all-bets-table">
     <table>
         <thead><tr><td>player</td><td>bet</td>{props.scores ? <td>score</td> : null}</tr></thead>
         <tbody>{props.allBets.map((bet, i) => renderBet(bet, i))}</tbody>
     </table>
    </div>
  );
};

function renderBet(bet, i) {
    return (<tr key={i}><td>{bet.user.username}</td><td>{bet.betString}</td>{bet.score ? <td>{bet.score}</td> : null}</tr>)
}
