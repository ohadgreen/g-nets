const initialState = {
    fetched: false,
    allPlayerScores: []
};

export default function reduce(state = initialState, action) {
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
