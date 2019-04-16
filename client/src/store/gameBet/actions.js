import gameService from "../../services/gamebet.service";
import { getUser, isLoggedIn } from "../userAuth/reducer";
import utils from '../../services/utils.service';

export const newGame = () => async (dispatch, getState) => {
  const newGame = await gameService.getNewGamesFirst();
  const etherConversionRes = await gameService.getEtherConversionRate();
  const contractPrize = await gameService.getPrizeFromContractBalance();
  const etherConvRateValue = etherConversionRes.success ? etherConversionRes.data : 0;

  if (newGame) {
    const loggedIn = isLoggedIn(getState());
    let userBet = {};
    if (loggedIn) {
      const currentUserId = getUser(getState()).id;
      userBet = utils.findCurrentUserBet(newGame, currentUserId);
    }
    const gameInfo = {
      _id: newGame._id,
      srId: newGame.srId,
      schedule: newGame.schedule,
      homeTeam: newGame.homeTeam,
      awayTeam: newGame.awayTeam,
      playoffSeries: newGame.playoffSeries
    };
    const finalizedBet = Object.keys(userBet).length > 0;

    dispatch({
      type: "NEW_GAME_INFO_SUCCESS",
      payload: {
        gameid: newGame.srId,
        gameInfo,
        allBets: allBetsOrderByDate(newGame.bets),
        currentUserBet: userBet,
        finalizedBet: finalizedBet,
        etherConvRateValue,
        contractPrize
      }
    });
  } else {
    dispatch({ type: "NEW_GAME_INFO_FAILURE" });
  }
};

export const addBet = userBet => async (dispatch, getState) => {
  const newBetAdd = await gameService.addUserBet(userBet);
  const allBets = allBetsOrderByDate(newBetAdd.data.data.bets);
  const currentUserId = getUser(getState()).id;
  const userBetUpdated = findCurrentUserBet(newBetAdd.data.data, currentUserId);
  const contractPrize = await gameService.getPrizeFromContractBalance();
  if (newBetAdd.data.msg === "user bet added") {
    dispatch({
      type: "BET_ADD_SUCCESS",
      payload: { currentUserBet: userBetUpdated, allBets, contractPrize }
    });
  } else {
    dispatch({ type: "BET_ADD_FAILURE" });
  }
};

export const removeBet = userBet => async dispatch => {
  const betRemove = await gameService.removeUserBet(userBet);
  const allBets = allBetsOrderByDate(betRemove.data.data.bets);
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

function allBetsOrderByDate(allBets) {
  return allBets.sort((a, b) => {
    return (a.timestamp > b.timestamp) ? -1 : ((a.timestamp < b.timestamp) ? 1 : 0);
  })
}
