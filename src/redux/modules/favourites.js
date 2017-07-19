const createActionName = (name) => `MyApp/favourites/${name}`;

export const ADD_PHOTOS_TO_FAVOURITES = createActionName("ADD_PHOTOS_TO_FAVOURITES");
export const REMOVE_PHOTOS_FROM_FAVOURITES = createActionName("REMOVE_PHOTOS_FROM_FAVOURITES");

const initialState = {
    photos: {}
};

export default function reducer(state, action = {}) {
    if (!state) {
        const storedState = sessionStorage.getItem("favourites");
        if (storedState) {
            return JSON.parse(storedState);
        } else {
            return initialState;
        }
    }

    switch (action.type) {
        case ADD_PHOTOS_TO_FAVOURITES:
            return {
                ...state,
                photos: {
                    ...state.photos,
                    ...action.photos.reduce((res, photo) => {
                        res[photo.id] = photo;
                        return res;
                    }, {})
                }
            };

        case REMOVE_PHOTOS_FROM_FAVOURITES:
            const newPhotos = {...state.photos};
            for (let i = 0; i < action.photos.length; i++) {
                delete newPhotos[action.photos[i].id];
            }

            return {
                ...state,
                photos: newPhotos
            };

        default:
            return state;
    }
}

export function addPhotosToFavourites(photos) {
    return { type: ADD_PHOTOS_TO_FAVOURITES, photos: photos };
}

export function removePhotosFromFavourites(photos) {
    return { type: REMOVE_PHOTOS_FROM_FAVOURITES, photos: photos };
}