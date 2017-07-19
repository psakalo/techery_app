import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import photos from './modules/photos';
import favourites from './modules/favourites';

const rootReducer = combineReducers({
    photos: photos,
    favourites: favourites
});

export default () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(
            thunk
        )
    )

    // Save favourites to localStorage
    store.subscribe(() => {
        sessionStorage.setItem("favourites", JSON.stringify(store.getState().favourites));
    });

    return store;
}