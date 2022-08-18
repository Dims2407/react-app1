import axios from "axios";
import {UserType} from "../Types/types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "bb5439b8-899b-4cca-aed4-0178c21c8fac"}


})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type meResponseDataType = {
    id: number
    email: string
    login: string
}

export type LoginResponseDataType = {
    userId: number


}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

