import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import dialogsReduser from "./message-reduser";
import profileReduser from "./profile-reduser";
import usersReduser from "./users-reduser";
import authReduser from "./auth-reduser";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    app: appReducer,
    form: formReducer,
});

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
