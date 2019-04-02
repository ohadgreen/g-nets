import React from "react";
import getPastGames from '../../services/pastGames.service';

class PastGames extends React.Component {
    state = {
        daysDiff: null,
        userOnly: false,
        gamesData: []
    }

    async componentDidMount() {
       const gamesData = await getPastGames.getAllPastGames({ daysDiff: this.state.daysDiff });
       this.setState({ gamesData });
    }

    renderGame = (game, i) => {
        return ( <li key='i'>{game.schedule} - {game.homeTeam.name}-{game.results.homePoints} : {game.awayTeam.name}-{game.results.awayPoints} </li> )
    }
    render() {
        if(this.state.gamesData.length === 0){
            return <div>Fetching Data</div>;
        }
        return <div>
            <ul>{this.state.gamesData.map((game, i) => this.renderGame(game, i))}</ul>
        </div>
    }
}

export default PastGames;