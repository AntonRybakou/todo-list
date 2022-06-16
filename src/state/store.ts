import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, compose, legacy_createStore as createStore} from 'redux';

// Combining the reducers
// Set the structure of our single state object
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store
export const store = createStore(rootReducer, composeEnhancers());
// Determine automatically the type of the entire state object
export type AppRootStateType = ReturnType<typeof rootReducer>

// Access the store at any time in the browser console
// @ts-ignore
window.store = store;
