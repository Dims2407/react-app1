import {combineReducers, legacy_createStore} from "redux";
import dialogsReduser from "./message-reduser";
import profileReduser from "./profile-reduser";
import usersReduser from "./users-reduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser,
    usersPage: usersReduser
});

let store = legacy_createStore(reducers);

export default store;
