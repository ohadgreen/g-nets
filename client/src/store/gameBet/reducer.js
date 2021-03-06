const initialState = {
    fetched: false,
    gameid: '',
    gameInfo: {},
    allBets: {},
    currentUserBet: {},
    finalizedBet: false,
    etherConvRateValue: 0,
    contractPrize: 0
};

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case 'NEW_GAME_INFO_SUCCESS': 
            return {
                fetched: true,
                gameid: action.payload.gameid,
                gameInfo: action.payload.gameInfo,
                allBets: action.payload.allBets,
                currentUserBet: action.payload.currentUserBet,
                finalizedBet: action.payload.finalizedBet,
                etherConvRateValue: action.payload.etherConvRateValue,
                contractPrize: action.payload.contractPrize
                }
        
        case 'BET_ADD_SUCCESS': 
            return {
                ...state,
                allBets: action.payload.allBets,
                currentUserBet: action.payload.currentUserBet,
                contractPrize: action.payload.contractPrize,
                finalizedBet: true
                }

        case 'BET_ADD_FAILURE': 
            return state;
    
        case 'BET_REMOVE_SUCCESS': 
            // console.log('reducer: ' + JSON.stringify(action.payload));
            return {
                ...state,
                allBets: action.payload.allBets,
                currentUserBet: {},
                finalizedBet: false
                }
                
        case 'BET_REMOVE_FAILURE': 
            // console.log('reducer: ' + JSON.stringify(action.payload));
            return state;
        
        default:
            return state;
    }
}

// selectors
export function getCurrentUserBet(state) {
    return state.race.currentUserBet;
}

export function getIsFinalizeBet(state) {
    return state.finalizedBet;
}

export function getGameid(state) {
    return state.gameid
}

export function getGameInfo(state) {
    return state.gameInfo;
}