import axios from 'axios';
import { newGameSample } from '../resources/sampleData/newGames';
const baseUrl = '/api/games/';

class NewGamesInfo {
    /* async */ getNewGamesFirst() {
        /* const response = await axios({
            url: baseUrl + 'new',
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        if(!response) {
            const errorMsg = 'cannot fetch new games';
            return {error: errorMsg};
            console.log(errorMsg);
        }
        else {
            return response.data[1];
        } */

        return newGameSample[0];
    }
    getNewGamesAll() {
        return newGameSample;
    }
}

export default new NewGamesInfo();