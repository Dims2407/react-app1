import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {usersAPI} from "../api/usersAPI";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {BaseThunkType, InferActionsType} from "./redux-store";







let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    isFetching: true

}



const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.data}
        }

        case "GET_CAPTCHA_URL_SUCCESS": {
            return {

                ...state,
                ...action.payload}
        }

        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login:string | null, isAuth:boolean) =>
        ({type: "SET_USER_DATA",
            data: {id, email, login, isAuth}} as const),
    setCaptchaUrlSuccess : (captchaUrl: string) => ({type: "GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}}as const),
    toggleIsFetching : (isFetching:boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching}as const)
}







export const getAuthUserData = (): ThunkType => async (dispatch) => {

    let MeData = await usersAPI.getAuthUser()

    if (MeData.resultCode === ResultCodeEnum.Success) {
        let  {id, email, login} = MeData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }

        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {

    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url

    dispatch(actions.setCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>