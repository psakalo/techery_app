import reducer, * as actions from './favourites';

describe("favourites module", () => {
    function photosArrayToObject(photos) {
        return photos.reduce((res, photo) => {
            res[photo.id] = photo;
            return res;
        }, {});
    }

    const photos = Array.from({length: 10}, (v, k) => {
        return {id: k, text: `photo${k}`}
    });

    const initialState = {
        photos: photosArrayToObject(photos)
    };

    test("creates new state, if sessionStorage is empty", () => {
        expect(reducer()).toBeDefined();
    });

    test("reads state from sessionStorage, if it exists", () => {
        sessionStorage.setItem("favourites", JSON.stringify(initialState));
        expect(reducer()).toEqual(initialState);
    });

    test("adds new photos to state, updates existing", () => {
        const newPhotos = Array.from({length: 15}, (v, k) => {
            return {id: k, text: `newPhoto${k}`}
        });
        const action = actions.addPhotosToFavourites(newPhotos);

        const expectedState = {
            photos: photosArrayToObject(newPhotos)
        };

        const newState = reducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("removes photos", () => {
        const photosToRemove = photos.slice(0, 5);
        const action = actions.removePhotosFromFavourites(photosToRemove);

        const expectedState = {
            photos: photosArrayToObject(photos.slice(5, 10))
        };

        const newState = reducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
});