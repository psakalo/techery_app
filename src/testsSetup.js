import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'

const mock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key];
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'sessionStorage', { value: mock });

// Setup mock store for redux
global.mockStore = configureStore([thunk]);