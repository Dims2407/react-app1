import {instance} from "./api";


type GetCaptchaUrlResType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResType>(`security/get-captcha-url`).then(response => response.data)
    }
}