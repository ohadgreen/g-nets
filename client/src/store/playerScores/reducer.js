const initialState = {
    fetched: false,
    allPlayerScores: []
};

export default function reduce(state = initialState, action) {
    // console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'ALL_SCORES_SUCCESS': 
            return {
                fetched: true,
                allPlayerScores: action.payload.allPlayerScores,                
                }                        
        default:
            return state;
    }
}

// selectors
