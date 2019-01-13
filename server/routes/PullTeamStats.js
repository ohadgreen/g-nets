const axios = require("axios");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Team = mongoose.model("teams");
const API_URL = "http://api.sportradar.us/nba/trial/v5/en/seasons/YEAR/SEASON_TYPE/standings.json";

module.exports = app => {
  app.post("/api/teams/initall", async (req, res) => {
    console.log("/api/teams/initall " + JSON.stringify(req.query));
    let teamStatsData = await fetchTeamStats(req.query);

    if (teamStatsData) {
      const dbTeamsList = apiToDbTeamList(teamStatsData.conferences);
      const dbSaveRes = await insertTeamsBatchToDb(dbTeamsList);
      if (dbSaveRes.status === 0) {
        res.send({ message: "teams stats batch saved" });
      } else {
        res.status(420).send(dbSaveRes.error);
      }
    }
  });

  async function fetchTeamStats(date) {
    const { day, month, year } = date;
    let scheduleGamesApiUrl = API_URL.replace("YEAR", keys.year).replace(
      "SEASON_TYPE",
      keys.seasonType
    );
    scheduleGamesApiUrl += "?api_key=" + keys.sportsRadarApiKey;
    console.log("teams stat api: " + scheduleGamesApiUrl);

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
      console.log("cannot fetch team stats from api");
      return null;
    }
  }

  async function insertTeamsBatchToDb(dbTeamList) {
    try {
        await Team.create(dbTeamList);
        return { status: 0, error: '' };
      } catch (error) {
        return { status: -1, error: error.text };
      }
  }

  function apiToDbTeamList(apiData) {
    let confName, divisionName;
    let dbTeamsList = [];
    for (conference of apiData) {
      confName = conference.name;
      console.log("confName: " + confName);
      for (division of conference.divisions) {
        divisionName = division.name;
        for (team of division.teams) {
          dbTeamsList.push(convertApiTeamToDbTeam(team, confName, divisionName));
        }
      }
    }
    return dbTeamsList;
  }

  function convertApiTeamToDbTeam(apiTeam, confName, divisionName) {
    let team = new Team({
      srId: apiTeam.sr_id,
      city: apiTeam.market,
      name: apiTeam.name,
      conference: confName,
      division: divisionName,
      wins: apiTeam.wins,
      losses: apiTeam.losses,
      win_pct: apiTeam.win_pct,
      pointsFor: apiTeam.points_for,
      pointsAgainst: apiTeam.points_against,
      pointDiff: apiTeam.points_diff,
      gamesBehind: {
        league: apiTeam.games_behind.league,
        conference: apiTeam.games_behind.conference,
        division: apiTeam.games_behind.division
      }
    });
    return team;
  }
};
