import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "bb5439b8-899b-4cca-aed4-0178c21c8fac"}


})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type meResponseType = {
    data: {
        id: number, email: string, login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export type loginResponseType = {
    data: {
        UserId: number,
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}


