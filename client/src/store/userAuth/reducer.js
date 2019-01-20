/* let rawStoredUser = localStorage.getItem('user');
console.log(`login reducer: ${rawStoredUser.nickname}`);
let storedUser = (rawStoredUser.length !== 0) ? JSON.stringify(rawStoredUser) : '';
const initialState = {
    loggedIn: false,
    user: (storedUser) ? storedUser : undefined,
    loginResult: '',
} */

let user = JSON.parse(localStorage.getItem('user'));
console.log('auth reducer: ' + JSON.stringify(user));
const initialState = user ? { loggedIn: true, user } : {};

export default function reduce(state = initialState, action) {
    console.log(action.type);
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

        default:
            return state;
    }    
}

// selectors
export function getUser(state) {
    return state.userAuth.user;
}