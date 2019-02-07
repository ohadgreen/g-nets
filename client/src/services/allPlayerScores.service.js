import axios from 'axios';
const baseUrl = '/api/scores/';

class GetAllPlayerScores {
    async getAllScores() {
        const response = await axios({
            url: baseUrl + 'all',
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if(!response) {
            const errorMsg = 'cannot fetch player scores';
            console.log(errorMsg);
            return {error: errorMsg};
        }
        else {
            return response.data;
        }
    }   
}

export default new GetAllPlayerScores();