import axios from 'axios';
const baseUrl = '/api/games/past';

class getPastGames {
    async getAllPastGames(pastGames) {
        console.log('past games service ' + pastGames.daysDiff);
        const response = await axios({
            url: baseUrl,
            method: 'GET',
            params: pastGames,
            headers: {
                Accept: 'application/json'
            }
        });
        if(!response) {
            const errorMsg = 'cannot fetch past games';
            console.log(errorMsg);
            return {error: errorMsg};
        }
        else {
            return response.data;
        }
    }   
}

export default new getPastGames();