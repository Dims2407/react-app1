import axios from "axios";
import {ProfileType} from "../Types/types";


const instance = axios.create({
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

type meResponseType = {
    data: {
        id: number, email: string, login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type loginResponseType = {
    data: {
        UserId: number,
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getAuthUser() {
        return instance.get<meResponseType>(`auth/me`).then(response => response.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile)
    }
}

export const profileAPI = {
    getProfile(UserId: number) {
        return instance.get(`profile/` + UserId).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    }
}


export const authAPI = {
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<loginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}


