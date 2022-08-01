import {authAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Navigate} from "react-router-dom";



const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';




let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true

}
const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state,
            ...action.data}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}


export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}})

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getAuthUserData = () => async (dispatch) => {

   let data = await usersAPI.getAuthUser()

            if (data.resultCode === 0) {
                let  {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
    }


export const login = (email, password, rememberMe) => async (dispatch) => {

   let response = await authAPI.login(email, password, rememberMe)

            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())}
            else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit('login', {_error: message}))
            }

}
export const logout = () => async (dispatch) => {
   let response = await authAPI.logout()

            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
}





export default authReduser;