import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import auth from './modules/auth';
import photos from './modules/photos';

const rootReducer = combineReducers({
    auth: auth,
    photos: photos
});

export default () => createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunk
    )
)