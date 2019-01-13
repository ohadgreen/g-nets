const axios = require("axios");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Game = mongoose.model("games");
const Team = mongoose.model("teams");
const API_URL =
  "http://api.sportradar.us/nba/trial/v5/en/games/YEAR/MONTH/DAY/schedule.json";
const gamesFetchLimit = 3;

module.exports = app => {
  app.post("/api/games/insert/bydate", async (req, res) => {
    console.log("games/insert/bydate params " + JSON.stringify(req.query));
    let schedGamesData = await fetchGames(req.query);

    if (schedGamesData) {
        const dbGamesList = await apiGamesListToDbGamesList(schedGamesData.games);
        const dbSaveRes = await insertGamesBatchToDb(dbGamesList);
        if(dbSaveRes.status === 0){
          res.send({ message: "day games batch saved" });
        }
        else{
          res.status(420).send(dbSaveRes.error);
        }
      }
  });

  app.post("/api/games/insert/nextday", async (req, res) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    const dd = tomorrow.getDate();
    const day = (dd < 10) ? '0' + dd : dd;
    const mm = tomorrow.getMonth() + 1; //January is 0!
    const month = (mm < 10) ? '0' + mm : mm;
    const yyyy = tomorrow.getFullYear();
        
    const nextDayQueryParams = { day: day, month: month ,year: yyyy };
    
    console.log("games/insert/nextday params" + JSON.stringify(nextDayQueryParams));
    let schedGamesData = await fetchGames(nextDayQueryParams);

    if (schedGamesData) {
      const dbGamesList = await apiGamesListToDbGamesList(schedGamesData.games);
      const dbSaveRes = await insertGamesBatchToDb(dbGamesList);
      if(dbSaveRes.status === 0){
        res.send({ message: "day games batch saved" });
      }
      else{
        res.status(420).send(dbSaveRes.error);
      }
    }
  });

  app.post('/api/games/insert/test', async (req, res) => {
    const gameTest = new Game({
        srId: '12345',
        srIdLong: 'abcde',
        homeTeam: {
          city: 'New York',
          name: 'Knicks',
          alias: 'NYK'
        }
        });

    try {
        await gameTest.save();
        res.send({ message: "test game saved" });
    }
    catch (error) {
        res.status(420).send(error);
      }
  })

  async function fetchGames(date) {
    const { day, month, year } = date;
    let scheduleGamesApiUrl = API_URL.replace("YEAR", year)
      .replace("MONTH", month)
      .replace("DAY", day);
    scheduleGamesApiUrl += "?api_key=" + keys.sportsRadarApiKey;
    // console.log('games sched api: ' + scheduleGamesApiUrl);

    const response = await axios({
      url: scheduleGamesApiUrl,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.log("cannot fetch games sched from api");
      return null;
    }
  }

  async function fetchTeamStats() {
    try {
        const dbTeamList = await Team.find({}).select('srId');
        if(dbTeamList) {
          return dbTeamList;
        }
        else {
          return { error: 'cannot find teams in db'}
        }
      } catch (error) {
        return { error: error.text };
      }
  }

  async function insertGamesBatchToDb(gamesList) {
    try {
        await Game.create(gamesList);
        return { status: 0, error: '' };
      } catch (error) {
        return { status: -1, error: error.text };
      }
  }

  async function apiGamesListToDbGamesList(apiGamesSched) {
    let dbGamesList = [];
    let gamesCount = 0;
    const dbTeamList = await fetchTeamStats();

    for (game of apiGamesSched) {
      if (gamesCount < gamesFetchLimit) {
        let homeTeamDbId, awayTeamDbId;
        for (team of dbTeamList) {
          if (game.home.sr_id === team.srId){
            homeTeamDbId = team._id;
          };
          if (game.away.sr_id === team.srId){
            awayTeamDbId = team._id;
          }
        }
        const dbGame = gameConvertApiToDb(game, homeTeamDbId, awayTeamDbId);
        dbGamesList.push(dbGame);
        gamesCount++; 
      }
    }
    return dbGamesList;
  }

  function gameConvertApiToDb(apiGameData, homeTeamDbId, awayTeamDbId) {
    const homePoints = apiGameData.home_points ? apiGameData.home_points : 0;
    const awayPoints = apiGameData.away_points ? apiGameData.away_points : 0;

    const game = new Game({
      srId: apiGameData.sr_id,
      srIdLong: apiGameData.id,
      schedule: apiGameData.scheduled,
      homeTeam: homeTeamDbId,
      awayTeam: awayTeamDbId,
      results: { homePoints, awayPoints }
    });
    return game;
  }
};
