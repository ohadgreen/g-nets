import React, { Component } from 'react';
import { Icon, Table, Button, Modal } from "semantic-ui-react";
import { RenderAvatar } from "../common/RenderAvatar";
import './AllBets.css';

class AllBets extends Component {
    state = {
        showModal: false
    }

    renderBet = (bet, i) => {
        return (
          <Table.Row key={i}>
            <Table.Cell><RenderAvatar user={bet.user} /></Table.Cell>
            <Table.Cell>{bet.betString}</Table.Cell>
            {this.props.scores ? <Table.Cell>{bet.score}</Table.Cell> : null}
            {this.props.scores ? null : <Table.Cell>{bet.ether}</Table.Cell>}
          </Table.Row>
        );
      }

      renderBetRows = (limit) => {
         return this.props.allBets.slice(0, limit).map((bet, i) => {
              if (i < limit) {
                  return (
                    <Table.Row key={i}>
                        <Table.Cell><RenderAvatar user={bet.user} /></Table.Cell>
                        <Table.Cell>{bet.betString}</Table.Cell>
                        {this.props.scores ? <Table.Cell>{bet.score}</Table.Cell> : null}
                        {this.props.scores ? null : <Table.Cell>{bet.ether}</Table.Cell>}
                    </Table.Row>
                  )
              }
              else return null;
          })
      }

      renderShowAllFooter = (limit) => {
        return (
            this.props.allBets.length > limit ? 
                <Table.Footer fullWidth>
                    <Table.Row><Table.HeaderCell colSpan='3'><Button style={{"marginLeft": "40%"}} size="tiny" onClick={() => this.setState({ showModal: true })}>Show All</Button></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer> 
                : null
        )
      }

      renderTable = (limit) => {
        return (            
                <Table celled striped compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Player</Table.HeaderCell>
                      <Table.HeaderCell>Bet</Table.HeaderCell>
                      {this.props.scores ? null : <Table.HeaderCell><Icon name="ethereum" size="small"/></Table.HeaderCell>}
                      {this.props.scores ? <Table.HeaderCell>Score</Table.HeaderCell> : null}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.renderBetRows(limit)}
                  </Table.Body>
                    {this.renderShowAllFooter(limit)}
                </Table>
          );
      }

    render() {
        // bets array is sorted by score in the action class
        return (
        <div className="all-bets-container">
          <div className="all-bets-header">All Players bets</div>
          <div className="all-bets-content">
            {this.renderTable(3)}
          </div>
          <Modal open={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                <Modal.Content>{this.renderTable(1000)}</Modal.Content>
          </Modal>
        </div>
      );
    }
}

export default AllBets;