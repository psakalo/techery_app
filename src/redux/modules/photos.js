import axios from 'axios';

const createActionName = (name) => `MyApp/photos/${name}`;

const CONSUMER_KEY = "mW7JZbUcYols1FAFO9VZSpY83uzSzoJ8gjXLkIOd";

export const PHOTOS_FETCH_START = createActionName("PHOTOS_FETCH_START");
export const PHOTOS_FETCH_SUCCESS = createActionName("PHOTOS_FETCH_SUCCESS");
export const PHOTOS_FETCH_ERROR = createActionName("PHOTOS_FETCH_ERROR");

const initialState = {
    photos: [],
    currentPage: 0,
    totalPages: 0,
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
            return {
                ...state,
                fetchInProgress: false,
                photos: [...state.photos, ...action.data.photos],
                currentPage: action.data.current_page,
                totalPages: action.data.total_pages
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

export function getNextPhotos(perPage) {
    return (dispatch, getState) => {
        dispatch({ type: PHOTOS_FETCH_START });

        const url = "https://api.500px.com/v1/photos" +
                "?consumer_key=" + CONSUMER_KEY +
                "&page=" + (getState().photos.currentPage + 1) +
                "&rpp=" + perPage;

        axios(url)
            .then(response => dispatch({ type: PHOTOS_FETCH_SUCCESS, data: response.data }))
            .catch(error => dispatch({ type: PHOTOS_FETCH_ERROR, error: error }));
    }
}