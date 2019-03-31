let localStorageUser = localStorage.getItem('user');
console.log('localStorageUser: ' + localStorageUser);
const initialState = (localStorageUser && localStorageUser.length > 20) ? { loggedIn: true, user: JSON.parse(localStorageUser) } : {};

export default function reduce(state = initialState, action) {    
    switch (action.type) { 
        case 'LOGIN_SUCCESS': {
            return {loggedIn: true,
                    user: action.payload,
                    loginResult: 'success',
            }
        }
        case 'LOGIN_FAILURE':
            return {                
                loginResult: action.payload,
            }        
        case 'REGISTER_SUCCESS': {
            return {
                loggedIn: true,
                user: action.payload,
                loginResult: 'register success',
            }
        }
        case 'REGISTER_FAILURE':
            return {
                loginResult: action.payload,
            }
        case 'LOGOUT':
            return {loggedIn: false}

        default:{
            return state;
        }
    }    
}

// selectors
export function getUser(state) {
    return state.userAuth.user;
}

export function isLoggedIn(state) {
    return state.userAuth.loggedIn;
}