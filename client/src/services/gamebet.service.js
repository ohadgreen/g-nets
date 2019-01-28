import axios from 'axios';
import { newGameSample } from '../resources/sampleData/newGames';
const baseUrl = '/api/games/';

class NewGamesInfo {
    async getNewGamesFirst() {
        const response = await axios({
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
            return response.data[0];
        }

        // return newGameSample[0];
    }
    getNewGamesAll() {
        return newGameSample;
    }

    async addUserBet(userBet) {
        console.log('add bet service: ' + JSON.stringify(userBet));
        const response = await axios({
            url: baseUrl + 'addbet',
            method: 'POST',
            params: userBet,
            headers: {
                Accept: 'application/json'
            }
        });

        if(!response || response.error) {
            const errorMsg = response.error ? response.error : 'cannot add bet';
            console.log(errorMsg);
            return {error: errorMsg};
        }
        else {
            // console.log('service addBet: ' + JSON.stringify(response.data));
            return {msg: response.msg, data: response.data};
        }
    }

    async removeUserBet(userBet) {
        const response = await axios({
            url: baseUrl + 'removebet',
            method: 'POST',
            params: userBet,
            headers: {
                Accept: 'application/json'
            }
        });

        if(!response.data.success){
            return {success: false};       
        }
        else {
            // console.log('service removeBet: ' + JSON.stringify(response.data));
            return {success: true, data: response.data};
        }
    }
}

export default new NewGamesInfo();