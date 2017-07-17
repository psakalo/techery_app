import axios from 'axios';

const createActionName = (name) => `MyApp/photos/${name}`;

export const PHOTOS_FETCH_START = createActionName("PHOTOS_FETCH_START");
export const PHOTOS_FETCH_SUCCESS = createActionName("PHOTOS_FETCH_SUCCESS");
export const PHOTOS_FETCH_ERROR = createActionName("PHOTOS_FETCH_ERROR");

const initialState = {
    photos: [],
    fetchInProgress: false,
    error: undefined
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case PHOTOS_FETCH_START:
            return {
                ...state,
                fetchInProgress: true
            };

        case PHOTOS_FETCH_SUCCESS:
            console.log(action.data);

            return {
                ...state,
                fetchInProgress: false,
                photos: state.photos.concat(action.data.photos)
            };

        case PHOTOS_FETCH_ERROR:
            return {
                ...state,
                fetchInProgress: false,
                error: action.error
            };

        default:
            return state;
    }
}

export function getPhotos(page) {
    return (dispatch, getSession) => {
        dispatch({ type: PHOTOS_FETCH_START });

        const fetchParams = getSession().auth.token.sign({
            method: 'get',
            url: `https://api.500px.com/v1/photos?page=${page}`
        });

        // Headers are wrong, and empty for 500px anywhere (accessToken is passed in url param), so get rid of them
        delete fetchParams.headers;

        axios(fetchParams)
            .then(response => dispatch({ type: PHOTOS_FETCH_SUCCESS, data: response.data }))
            .catch(error => dispatch({ type: PHOTOS_FETCH_ERROR, error: error }));
    }
}