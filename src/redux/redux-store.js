import { combineReducers, createStore } from "redux";
import dialogsReduser from "./message-reduser";
import profileReduser from "./profile-reduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser
});

let store = createStore(reducers);

export default store;
