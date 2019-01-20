import { history } from '../../services/history';
import authService from '../../services/auth.service';

    export const userLoginValidate = (userLogin) => async dispatch => {
        const loginResult = await authService.loginDb(userLogin);
        console.log('loginResult: ', loginResult);
        
        let user;        
        if(!loginResult.error){
            console.log('logic succes');
            user = loginResult.user;
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            appRoute("/gamebet");           
        }
        else{
            dispatch({ type: 'LOGIN_FAILURE', payload: loginResult.error })
        }                 
}
    export const userRegister = (user) => async dispatch => {
        const registerResult = await authService.registerDb(user);
        if(!registerResult.data.error){
            dispatch({ type: 'REGISTER_SUCCESS', payload: registerResult.data.user });
            appRoute("/login");
        }
        else{
            dispatch({ type: 'REGISTER_FAILURE', payload: registerResult.data.error });
        }
    }
 function appRoute(route){
    history.push(route);
}
