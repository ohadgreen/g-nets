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

    async addUserBet(userBet) {
        const response = await axios({
            url: baseUrl + 'addbet',
            method: 'POST',
            params: userBet,
            headers: {
                Accept: 'application/json'
            }
        });

        if(!response || response.error) {
            const errorMsg = response.error ? response.error : 'cannot fetch new games';
            console.log(errorMsg);
            return {error: errorMsg};
        }
        else {
            // console.log('service addBet: ' + JSON.stringify(response));
            return {msg: response.data.msg};
        }
    }
}

export default new NewGamesInfo();