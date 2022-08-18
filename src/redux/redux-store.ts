import {applyMiddleware, combineReducers, legacy_createStore, compose} from "redux"
import dialogsReduser from "./message-reduser"
import profileReduser from "./profile-reduser"
import usersReduser from "./users-reduser"
import authReduser from "./auth-reduser"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"

let RootReducer = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    app: appReducer,
    form: formReducer,
});

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never
export type InferActionsType <T extends {[key: string] : (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


//let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));


export default store
