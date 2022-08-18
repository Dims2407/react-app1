import {instance, LoginResponseDataType, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

export const authAPI = {
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}