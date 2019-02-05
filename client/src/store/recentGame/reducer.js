
const initialState = {
    fetched: false,
    gameInfo: {},
    gameResults: {},
    allBets: {},
    currentUserBet: {},
};

export default function reduce(state = initialState, action) {
    // console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'RECENT_GAME_INFO_SUCCESS': 
            return {
                fetched: true,
                gameInfo: action.payload.gameInfo,
                gameResults: action.payload.gameResults,
                allBets: action.payload.allBets,
                currentUserBet: action.payload.currentUserBet,
                }                        
        default:
            return state;
    }
}

// selectors
