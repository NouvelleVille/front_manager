import { createContext, useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import apiFetcher from "../utils/axios";

const UserContext = new createContext();

function UseUserLocalStorage() {

    const access_token_key = 'nouvelleville_access_token';
    const refresh_token_key = 'nouvelleville_refresh_token';

    const storeCredentials = (access_token, refresh_token) => {
        localStorage.setItem(access_token_key, access_token);
        localStorage.setItem(refresh_token_key, refresh_token);
    }

    const getAccessToken = () => {
        return localStorage.getItem(access_token_key);
    }

    const getRefreshToken = () => {
        return localStorage.getItem(refresh_token_key);
    }

    const setAccessToken = (access_token) => {
        localStorage.setItem(access_token_key, access_token);
    }

    const setRefreshToken = (refresh_token) => {
        localStorage.setItem(refresh_token_key, refresh_token);
    }


    const clearTokens = () => {
        localStorage.removeItem(access_token_key);
        localStorage.removeItem(refresh_token_key);
    }

    return { storeCredentials, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens }
}

const init = () => {

    let init_context = {
        username: null,
        errors: [],
        success: null,
        access_token: null,
        refresh_token: null,
        trying: false,
    }

    const { getAccessToken, getRefreshToken } = UseUserLocalStorage();
    init_context['access_token'] = getAccessToken();
    init_context['refresh_token'] = getRefreshToken();


    return init_context;


}


function userReducer(state, action) {
    const { setAccessToken, setRefreshToken, clearTokens } = UseUserLocalStorage();
    switch (action.type) {
        case 'signedIn':
            console.log('User: ' + action.username + ' has signed-in');
            return {
                ...state,
                username: action.username,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
                trying: false,
                success: 'Welcome back !',
                errors: []
            };
        case 'startSignIn':
            return {
                ...state,
                trying: true
            }
        case 'startSignUp':
            return {
                ...state,
                trying: true,
                success: null,
                errors: []
            }
        case 'stopSignInWithError':
            return {
                ...state,
                trying: false,
                errors: [action.error],
                success: null
            }
        case 'stopSignUpWithSuccess':
            return {
                ...state,
                trying: false,
                success: action.message,
                errors: []
            }
        case 'stopSignUpWithErrors':
            let form_errors = [];
            Object.keys(action.errors).forEach(function(key) {
                console.log(key, action.errors[key]);
                form_errors.push(action.errors[key]);
            });

            return {
                ...state,
                trying: false,
                errors: form_errors,
                success: null
            }
        case 'signIn':
            return state;
        case 'tokenRefreshed':
            console.log('Token has be refreshed')
            setAccessToken(action.access_token);
            setRefreshToken(action.refresh_token)
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
                trying: false
            }
        case 'tokenRefreshError':
            clearTokens();
            return {
                ...state,
                username: null,
                access_token: null,
                refresh_token: null,
                trying: false,
                errors: [],
                success: null

            }
        case 'signOut':
            clearTokens();
            return {
                ...state,
                username: null,
                access_token: null,
                refresh_token: null,
                trying: false,
                errors: [],
                success: null
            }
        case 'resetErrors':
            return {
                ...state,
                errors: [],
                success: null
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, {}, init);
    apiFetcher.setCredentials(state.access_token, state.refresh_token);
    apiFetcher.setUserDispatch(dispatch);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};



function useUser() {
    const { state, dispatch } = useContext(UserContext);
    const { access_token, refresh_token } = state;
    const { clearTokens, storeCredentials } = UseUserLocalStorage();
    if (state === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }

    const history = useHistory();
    useEffect(() => {


    }, [dispatch, history])

    const signOut = () => {
        clearTokens();
        dispatch({
            type: 'signOut'
        })
    }


    const signIn = (payload) => {
        try {
            dispatch({ type: 'startSignIn' });
            apiFetcher.getAxiosInstance().post('api/token/', {
                username: payload.username,
                password: payload.password
            })
                .then(function (response) {
                    storeCredentials(response.data.access, response.data.refresh);
                    history.push('/');
                    dispatch({
                        type: 'signedIn',
                        username: payload.username,
                        access_token: response.data.access,
                        refresh_token: response.data.refresh
                    })
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch({ type: 'stopSignInWithError', error: error.response.statusText })
                    } else {
                        console.log(error);
                        dispatch({ type: 'stopSignInWithError', error: 'Unknown Error' })
                    }


                });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'stopSignInWithError', error: error.code })
        }
    }

    const startRefreshToken = () => {
        return apiFetcher.getAxiosInstance().post('api/token/refresh/', {
            refresh_token: refresh_token
        })
    }

    const storeRefreshedToken = (access_token, refresh_token) => {
        dispatch({
            type: 'refreshToken',
            access_token: access_token,
            refresh_token: refresh_token
        })
    }

    const signUp = (username, email, password) => {
        dispatch({ type: 'startSignUp' })
        apiFetcher.getAxiosInstance().post('api/account/register', {
            username: username,
            password: password,
            email: email
        }).then((response) => {
            if (response.status === 200) {
                dispatch({ type: 'stopSignUpWithSuccess', message: response.data.message });
            }
        }).catch((error) => {
            console.log(error.response);
            dispatch({ type: 'stopSignUpWithErrors', errors: error.response.data });
            return error.data;
        })
    }


    return { state, dispatch, signIn, signOut, startRefreshToken, storeRefreshedToken, signUp, access_token, refresh_token };
}


export { UserProvider, useUser, UseUserLocalStorage, UserContext };