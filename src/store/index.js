import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import AuthReducer from './reducers/authReducer';

export const rootReducer = combineReducers({
    auth: AuthReducer
});

export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));