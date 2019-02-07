import scoreService from '../../services/allPlayerScores.service';

  export const allPlayerScores = () => async (dispatch) => {

    const allScores = await scoreService.getAllScores();
    if(allScores){
        dispatch({ type: 'ALL_SCORES_SUCCESS', payload: { allPlayerScores: allUsersSortByAvgScore(allScores) } });
    }
    else{
        dispatch({ type: 'ALL_SCORES_FAILURE' });
    }
}

function allUsersSortByAvgScore(allUsers) {
    return allUsers.sort((a, b) => { return (b.bets.avgScore - a.bets.avgScore)});
}