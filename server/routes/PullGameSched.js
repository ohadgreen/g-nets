const axios = require('axios');
const API_URL = 'http://api.sportradar.us/nba/trial/v5/en/games/YEAR/MONTH/DAY/schedule.json?api_key=cmsysc2ct4bpgnvujfcxvsdz';


module.exports = app => {
    app.get("/api/nba/schedule", async (req, res) => {
        const { day, month, year } = req.query;
        const scheduleGamesApiUrl = API_URL.replace('YEAR', year).replace('MONTH', month).replace('DAY', day);
        console.log('raceUrl: ' + scheduleGamesApiUrl);

        const response = await axios({
            url: /* proxyurl +  */scheduleGamesApiUrl,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

        if (response.status === 200) {
            let scheduledGames = [];
            let apiGame;
            const apiGames = response.data.games;
            apiGames.map(game => {
                apiGame = {
                    homeTeamName: game.home.name,
                    awayTeamName: game.away.name
                };
                scheduledGames.push(apiGame);
            });

            console.log('games# ' + scheduledGames.length);
            console.log(scheduledGames[3]);
    
            res.send({game: scheduledGames[0]})
           /*  try {
                await race.save();
                res.send({ message: "new race saved" });
            }
            catch (error) {
                res.status(420).send(error);
            } */
        }
    })
}