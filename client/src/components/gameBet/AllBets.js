import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { RenderAvatar } from "../common/RenderAvatar";
import './AllBets.css';

export const AllBets = props => {
  let allBetsDisplay = props.scores
    ? props.allBets.filter(b => b.score > 0)
    : props.allBets;

  return (
    <div className="all-bets-container">
      <div className="all-bets-header">All Players bets</div>
      <div className="all-bets-content">
        <Table celled striped compact size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Player</Table.HeaderCell>
              <Table.HeaderCell>Bet</Table.HeaderCell>
              {props.scores ? null : <Table.HeaderCell><Icon name="ethereum" size="small"/></Table.HeaderCell>}
              {props.scores ? <Table.HeaderCell>Score</Table.HeaderCell> : null}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allBetsDisplay.map((bet, i) => {
              if (i < 5) {
                return renderBet(bet, i);
              } else return "";
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

function renderBet(bet, i) {
  return (
    <Table.Row key={i}>
      <Table.Cell><RenderAvatar user={bet.user} /></Table.Cell>
      <Table.Cell>{bet.betString}</Table.Cell>
      {bet.score ? <Table.Cell>{bet.score}</Table.Cell> : null}
      {bet.score ? null : <Table.Cell>{bet.ether}</Table.Cell>}
    </Table.Row>
  );
}
