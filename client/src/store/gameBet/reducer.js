// import Immutable from 'seamless-immutable';

const initialState = {
    fetched: false,
    gameid: '',
    gameInfo: {},
    allBets: {},
    currentUserBet: {},
    finalizedBet: false,
};

export default function reduce(state = initialState, action) {
    console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'NEW_GAME_INFO_SUCCESS': {
            return {
                fetched: true,
                gameid: action.payload.gameid,
                gameInfo: action.payload.gameInfo,
                allBets: action.payload.allBets,
                currentUserBet: action.payload.currentUserBet,
                finalizedBet: action.payload.finalizedBet
                }
        };
        case 'BET_ADD_SUCCESS': {
            console.log('reducer: ' + JSON.stringify(action.payload));
            return {
                ...state,
                allBets: action.payload.allBets,
                currentUserBet: action.payload.currentUserBet,
                finalizedBet: true
                }
        }
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