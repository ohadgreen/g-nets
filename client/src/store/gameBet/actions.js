import gameService from '../../services/gamebet.service';

  export const newGame = () => async dispatch => {
    const newGame = await gameService.getNewGamesFirst();
    console.log('action newGame: ' + JSON.stringify(newGame));
    if(newGame){
        dispatch({ type: 'NEW_GAME_INFO_SUCCESS', payload: newGame });
    }
    else{
        dispatch({ type: 'NEW_GAME_INFO_FAILURE' });
    }
}