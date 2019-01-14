const axios = require("axios");
const mongoose = require("mongoose");
const keys = require("../../config/keys");
const Team = mongoose.model("teams");
const API_URL =
  "http://api.sportradar.us/nba/trial/v5/en/seasons/YEAR/SEASON_TYPE/standings.json";

module.exports = app => {
  app.post("/api/teams/initall", async (req, res) => {
    console.log("/api/teams/initall " + JSON.stringify(req.query));
    let teamStatsData = await fetchTeamStats();

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

  app.post("/api/teams/updateall", async (req, res) => {
    console.log("/api/teams/updateall " + JSON.stringify(req.query));
    let newTeamDataFromApi = await fetchTeamStats();

    if (newTeamDataFromApi) {
      const teamListUpdatedData = apiToDbTeamList(newTeamDataFromApi.conferences);
      let errorResults = [];
      for (newTeamData of teamListUpdatedData) {
        const updateRes = await Team.updateOne(
          { srId: newTeamData.srId },
          {
            $set: {
              wins: newTeamData.wins,
              losses: newTeamData.losses,
              winPct: newTeamData.winPct,
              pointsFor: newTeamData.pointsFor,
              pointsAgainst: newTeamData.pointsAgainst,
              pointsDiff: newTeamData.pointsDiff,
              gamesBehind: {
                league: newTeamData.gamesBehind.league,
                conference: newTeamData.gamesBehind.conference,
                division: newTeamData.gamesBehind.division
              }
            }
          }
        );
        if(updateRes.ok !== 1){
            errorResults.push({ teamName: newTeamData.name, result: updateRes })
        }
      }
      if (errorResults.length === 0) {
        res.send( 'update complete' );
      }
      else {
          res.send(errorResults);
      }
    }
  });

  async function fetchTeamStats() {
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
      return { status: 0, error: "" };
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
          dbTeamsList.push(
            convertApiTeamToDbTeam(team, confName, divisionName)
          );
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
      winPct: apiTeam.win_pct,
      pointsFor: apiTeam.points_for,
      pointsAgainst: apiTeam.points_against,
      pointsDiff: apiTeam.points_diff,
      gamesBehind: {
        league: apiTeam.games_behind.league,
        conference: apiTeam.games_behind.conference,
        division: apiTeam.games_behind.division
      }
    });
    return team;
  }
};
