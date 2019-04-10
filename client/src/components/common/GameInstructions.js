import React from 'react';
import { Icon } from 'semantic-ui-react'
import "./GameInstructions.css";

class GameInstructions extends React.Component {
    state = {
        items: {}
    }

    toggleItem = (itemIndex) => {
        this.setState({
            items: {
                ...this.state.items,
                [itemIndex]: !this.state.items[itemIndex]
            }
        });
    }

    renderItem = (item, index) => {
        return (
            <div key={index}>
                <div className="item-header" onClick={() => this.toggleItem(index)}>
                {item.header}
                <Icon name={this.state.items[index] ? "caret up" : "caret down"} size="large"/>
                </div>
                {this.state.items[index] ? <div className="item-content">{item.content}</div> : null}                
            </div>
        )
    }

    render() {
        return (<div>
            {
                instructionsContent.map((item, index) => {return this.renderItem(item, index)})
            }
        </div>)
    }
}
export default GameInstructions;

const instructionsContent = [
    { 
        header: 'who can play?',
        content: 'everyone. first, just register to create a player profile. If you want to bet with Ether, follow specific instructions below' 
    },
    { 
        header: 'how does the game work?',
        content: 'every day it will show the next night NBA game. Players can try and guess game results: winning team and the points difference. The closer your guess to the actual results - the higher score you get. By the end of the season, the player with best average score will be the game winner' 
    },
    { 
        header: 'how are the scores calculated?',
        content: <ul>
            <li>only choosing the correct winner team gets you points</li>
            <li>then it's how close you are to the actual points difference, calculated like so: 
                <ul><li>exact match = 15 points</li>
                <li>within 10 points range = 13 - (points diff range)</li>
                <li>more than 10 points range = 2 points</li>                
                </ul>
            </li>
            <li>example: your bet: "team A wins by 5 points" actual game score: "team A wins by 7 points" your calculated score = 13 - 2 = 11 points</li>
        </ul>
            
    },
    { 
        header: 'how to bet with Ether?',
        content: <ul><li>install {<a href="https://metamask.io/">Metamask</a>} addon in your browser</li>
            <li>this game is currently on the Rinkeby testnet, so the ether we use doesn't have real value. Use {<a href="https://faucet.rinkeby.io/">rinkeby faucet</a>} utility to get some ether to your wallet</li>
            <li>for each game, you can bet with 20 - 200 milliether (AKA - "finney") but first make sure you have that sum in your wallet and you are logged in to Metamask</li>
            <li>once you click the bet button, you will be prompted to accept the transaction in Metamask popup window. Notice that each transaction has some (very small) fee, called "gas". You must confirm the transaction to place the bet</li>
            <li>the transaction to the Ethereum network takes approx. 30 seconds. Be patient :) </li>
            <li>when you choose to bet with Ether, you can't cancel your bet</li>
            <li>the player with the highest bet score will win the entire prize, regardless to the bet sum. If two or more players share the highest score - the prize will split between them equally</li>
            <li>the prize will be transferred to the winners accounts automatically the next day</li>
            <li>if no one had a score (had bet the winning team), the prize will be carried on to the next game </li>
            </ul>
    },

]