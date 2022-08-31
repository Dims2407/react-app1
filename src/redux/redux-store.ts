import {applyMiddleware, combineReducers, legacy_createStore, compose, Action} from "redux"
import dialogsReduser from "./message-reduser"
import profileReducer from "./profile-reduser"
import usersReduser from "./users-reduser"
import authReducer from "./auth-reduser"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"
import chatReducer from "./chat-reducer";

let RootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    form: formReducer,
});


export type AppDispatch = typeof store.dispatch

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never
export type InferActionsType <T extends {[key: string] : (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, any, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


//let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));


export default store
