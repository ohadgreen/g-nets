import gameService from '../../services/gamebet.service';
import { getUser } from '../userAuth/reducer';

  export const recentGame = () => async (dispatch, getState) => {
    const recentGame = await gameService.getRecentGame();
    if(recentGame){
        const currentUserId = getUser(getState()).id;
        const userBet = findCurrentUserBet(recentGame, currentUserId);
        const allBetsOrdered = allBetsOrderByScore(recentGame.bets);
        const gameInfo = {_id: recentGame._id, srId: recentGame.srId, schedule: recentGame.schedule, homeTeam: recentGame.homeTeam, awayTeam: recentGame.awayTeam};
        const gameResults = recentGame.results;

        dispatch({ type: 'RECENT_GAME_INFO_SUCCESS', payload: {gameInfo: gameInfo, gameResults: gameResults, allBets: allBetsOrdered, currentUserBet: userBet } });
    }
    else{
        dispatch({ type: 'RECENT_GAME_INFO_FAILURE' });
    }
}

function findCurrentUserBet(game, userid) {
    // console.log(JSON.stringify(game));
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

function allBetsOrderByScore(allBets) {
    return allBets.sort((a, b) => { return (b.score - a.score)});

}