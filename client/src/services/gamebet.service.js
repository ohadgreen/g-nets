import axios from 'axios';
import contract from "./contract";
const keys = require('../config/keys');
const baseUrl = '/api/games/';
const cryptoCompareUrl = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=';

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
            console.log(errorMsg);
            return {error: errorMsg};
        }
        else {
            return response.data[0];
        }
    }

    async getRecentGame() {
        const response = await axios({
            url: baseUrl + 'recent',
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if(!response || response.data.length === 0) {
            const errorMsg = 'cannot fetch recent games';
            console.log(errorMsg);
            return {error: errorMsg};
        }
        else {
            return response.data[0];
        }
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

    async getEtherConversionRate() {
        const fullApiUrl = cryptoCompareUrl + keys.cryptoCompareApiKey;
        const response = await axios({
            url: fullApiUrl,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if(!response){
            return {success: false};       
        }
        else {
            return {success: true, data: response.data.ETH.USD};
        }
    }

    async getPrizeFromContractBalance() {
        const totalPrizeWei = await contract.methods.showTotalBetSum().call();
        return totalPrizeWei;
    }
}

export default new NewGamesInfo();