import {authAPI, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";




const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    isFetching: true

}

export type InitialStateType = typeof initialState


const authReduser = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data}
        }

        case GET_CAPTCHA_URL_SUCCESS: {
            return {

                ...state,
                ...action.payload}
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}
type SetAuthUserDataActionDataType = {
    id: number | null
    email: string | null
    login:string | null
    isAuth:boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetAuthUserDataActionDataType
}
export const setAuthUserData = (id: number | null, email: string | null, login:string | null, isAuth:boolean): SetAuthUserDataActionType =>
    ({type: SET_USER_DATA,
        data: {id, email, login, isAuth}})



type SetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const setCaptchaUrlSuccess = (captchaUrl: string): SetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})


type ToggleIsFetchingAcType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching:boolean): ToggleIsFetchingAcType => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getAuthUserData = () => async (dispatch: any) => {

    let data = await usersAPI.getAuthUser()

    if (data.resultCode === 0) {
        let  {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email:string, password:string, rememberMe:boolean, captcha: undefined) => async (dispatch: any) => {

    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {

    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(setCaptchaUrlSuccess(captchaUrl))
}


export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}





export default authReduser;