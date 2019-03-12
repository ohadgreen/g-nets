import gameService from "../../services/gamebet.service";
import { getUser, isLoggedIn } from "../userAuth/reducer";

export const newGame = () => async (dispatch, getState) => {
  const newGame = await gameService.getNewGamesFirst();
  const etherConversionRes = await gameService.getEtherConversionRate();
  console.log('action ether conv: ' + JSON.stringify(etherConversionRes));
  const etherConvRateValue = etherConversionRes.success ? etherConversionRes.data : 0;

  if (newGame) {
    const loggedIn = isLoggedIn(getState());
    let userBet = {};
    if (loggedIn) {
      const currentUserId = getUser(getState()).id;
      userBet = findCurrentUserBet(newGame, currentUserId);
    }
    const gameInfo = {
      _id: newGame._id,
      srId: newGame.srId,
      schedule: newGame.schedule,
      homeTeam: newGame.homeTeam,
      awayTeam: newGame.awayTeam
    };
    const finalizedBet = Object.keys(userBet).length > 0;

    dispatch({
      type: "NEW_GAME_INFO_SUCCESS",
      payload: {
        gameid: newGame.srId,
        gameInfo,
        allBets: allBetsOrderByString(newGame.bets),
        currentUserBet: userBet,
        finalizedBet: finalizedBet,
        etherConvRateValue
      }
    });
  } else {
    dispatch({ type: "NEW_GAME_INFO_FAILURE" });
  }
};

export const addBet = userBet => async (dispatch, getState) => {
  const newBetAdd = await gameService.addUserBet(userBet);
  const allBets = newBetAdd.data.data.bets;
  const currentUserId = getUser(getState()).id;
  const userBetUpdated = findCurrentUserBet(newBetAdd.data.data, currentUserId);
  if (newBetAdd.data.msg === "user bet added") {
    dispatch({
      type: "BET_ADD_SUCCESS",
      payload: { currentUserBet: userBetUpdated, allBets: allBets }
    });
  } else {
    dispatch({ type: "BET_ADD_FAILURE" });
  }
};

export const removeBet = userBet => async dispatch => {
  const betRemove = await gameService.removeUserBet(userBet);
  const allBets = betRemove.data.data.bets;
  if (betRemove.success) {
    dispatch({ type: "BET_REMOVE_SUCCESS", payload: { allBets: allBets } });
  } else {
    dispatch({ type: "BET_REMOVE_FAILURE" });
  }
};

function findCurrentUserBet(game, userid) {
  // console.log(JSON.stringify(game));
  let currentUserBet = {};
  if (game.bets.length > 0) {
    for (let bet of game.bets) {
      if (bet.user._id === userid) {
        currentUserBet = bet;
        break;
      }
    }
  }
  return currentUserBet;
}

function allBetsOrderByString(allBets) {
  return allBets.sort((a, b) => {
    return b.betString.localeCompare(a.betString);
  });
}
