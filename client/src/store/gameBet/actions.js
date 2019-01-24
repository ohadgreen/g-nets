import gameService from '../../services/gamebet.service';
import { getUser } from '../userAuth/reducer';

  export const newGame = () => async (dispatch, getState) => {
    const newGame = await gameService.getNewGamesFirst();
    if(newGame){
        // const state = getState();
        const currentUserId = getUser(getState()).id;
        const userBet = findCurrentUserBet(newGame, currentUserId);
        const finalizedBet = (userBet !== {});

        dispatch({ type: 'NEW_GAME_INFO_SUCCESS', payload: {gameid: newGame.srId, gameInfo: newGame, currentUserBet: userBet, finalizedBet: finalizedBet } });
    }
    else{
        dispatch({ type: 'NEW_GAME_INFO_FAILURE' });
    }
}

export const addBet = (userBet) => async dispatch => {
    const newBetAdd = await gameService.addUserBet(userBet);
    if(newBetAdd.msg === 'user bet added'){
        dispatch({ type: 'BET_ADD_SUCCESS', payload: userBet });
    }
    else{
        dispatch({ type: 'BET_ADD_FAILURE' });
    }
}

function findCurrentUserBet(game, userid) {
    let currentUserBet = {};
    if(game.bets.length > 0){
    for(let bet of game.bets) {
        if(bet.user === userid){
            currentUserBet = bet;
            break;
        }
    }
    }
    return currentUserBet;
}