import ClientOAuth2 from 'client-oauth2';

const createActionName = (name) => `MyApp/auth/${name}`;

export const AUTH_SUCCESS = createActionName("AUTH_SUCCESS");
export const AUTH_ERROR = createActionName("AUTH_ERROR");

const initialState = {
    pxAuth: new ClientOAuth2({
        clientId: 'mW7JZbUcYols1FAFO9VZSpY83uzSzoJ8gjXLkIOd',
        clientSecret: 'nZksyrW7oqNShnt3KooC57L9gBHtLjtGjQ8gLBpU',
        accessTokenUri: 'https://api.500px.com/v1/oauth/access_token',
        authorizationUri: 'https://api.500px.com/v1/oauth/authorize',
        redirectUri: window.location.origin
    }),
    token: undefined,
    authenticated: false,
    error: undefined
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                authenticated: true
            };

        case AUTH_ERROR:
            return {
                ...state,
                token: undefined,
                authenticated: false,
                error: action.error
            };

        default:
            return state;
    }
}

export const checkAuthStatus = () => {
    return (dispatch, getSession) => {
        const STORAGE_TOKEN_KEY = "accessToken";
        const storedToken = getSession().auth.pxAuth.createToken(sessionStorage.getItem(STORAGE_TOKEN_KEY));
        let tokenPromise = undefined;
        if (storedToken.accessToken) {
            tokenPromise = Promise.resolve(storedToken);

        } else {
            tokenPromise = getSession().auth.pxAuth.token.getToken(window.location)
                .catch(error => {
                    dispatch({ type: AUTH_ERROR, error: error })
                })
        }

        return tokenPromise.then(token => {
            sessionStorage.setItem(STORAGE_TOKEN_KEY, token.accessToken);
            dispatch({ type: AUTH_SUCCESS, token: token })
        });
    }
};