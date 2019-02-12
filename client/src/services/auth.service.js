import axios from 'axios';

const baseUrl = '/api/auth/';

class AuthService {
    async loginDb(userLogin) {
        console.log('login db');
        const getUserUrl = `${baseUrl}/user`;
        const response = await axios({
            url: getUserUrl,
            params: userLogin,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.statusText }
        }
        else {
            if (response.data.error) {
                console.log('login error: ' + response.data.error);
                return { error: response.data.error };

            }
            else {
                const user = response.data.authUser;
                if (user.token) {
                    const verifiedUser = JSON.stringify(user);
                    localStorage.setItem('user', verifiedUser);
                    return { user: user };
                }
            }
        }
    }

    async registerDb(user) {
        // console.log('register service user: ' + JSON.stringify(user));
        const postRegisterUrl = `${baseUrl}/user`;
        const response = await axios({
            url: postRegisterUrl,
            params: user,
            method: 'POST',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.text }
        }
        else {
            const user = response.data.authUser;
                if (user.token) {
                    const verifiedUser = JSON.stringify(user);
                    localStorage.setItem('user', verifiedUser);
                    return { user: user };
                }
        }
    }

    async fetchAllUsers() {
        const fetchAllUsersUrl = `${baseUrl}/users`;
        const response = await axios({
            url: fetchAllUsersUrl,
            // params: user,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.text }
        }
        else {
            const allUsers = JSON.stringify(response.data);
            return response.data;
        }
    }

    logout() {
        // remove user from local storage to log user out
        console.log('authService logout');
        localStorage.removeItem('user');
    }
}

export default new AuthService();