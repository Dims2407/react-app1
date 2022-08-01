import {applyMiddleware, combineReducers, legacy_createStore, compose} from "redux";
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))


//let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;
