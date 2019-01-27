import gameService from '../../services/gamebet.service';
import { getUser } from '../userAuth/reducer';

  export const newGame = () => async (dispatch, getState) => {
    const newGame = await gameService.getNewGamesFirst();
    if(newGame){
        const currentUserId = getUser(getState()).id;
        const userBet = findCurrentUserBet(newGame, currentUserId);
        const gameInfo = {_id: newGame._id, srId: newGame.srId, schedule: newGame.schedule, homeTeam: newGame.homeTeam, awayTeam: newGame.awayTeam}
        const finalizedBet = Object.keys(userBet).length > 0;

        dispatch({ type: 'NEW_GAME_INFO_SUCCESS', payload: {gameid: newGame.srId, gameInfo: gameInfo, allBets: newGame.bets, currentUserBet: userBet, finalizedBet: finalizedBet } });
    }
    else{
        dispatch({ type: 'NEW_GAME_INFO_FAILURE' });
    }
}

export const addBet = (userBet) => async (dispatch, getState) => {
    const newBetAdd = await gameService.addUserBet(userBet);
    const allBets = newBetAdd.data.data.bets;
    console.log('action addBet: ' + JSON.stringify(newBetAdd));
    const currentUserId = getUser(getState()).id;
    const userBetUpdated = findCurrentUserBet(newBetAdd.data.data, currentUserId);
    if(newBetAdd.data.msg === 'user bet added'){
        dispatch({ type: 'BET_ADD_SUCCESS', payload: {currentUserBet: userBetUpdated, allBets: allBets} });
    }
    else{
        dispatch({ type: 'BET_ADD_FAILURE' });
    }
}

function findCurrentUserBet(game, userid) {
    console.log(JSON.stringify(game));
    let currentUserBet = {};
    if(game.bets.length > 0){
    for(let bet of game.bets) {
        if(bet.user._id === userid){
            currentUserBet = bet;
            break;
        }
    }
    }
    return currentUserBet;
}