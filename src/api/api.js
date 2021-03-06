import * as axios from "axios";


const instance = axios.create ({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/' ,
    headers: {"API-KEY": "bb5439b8-899b-4cca-aed4-0178c21c8fac"}


})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getAuthUser() {
        return instance.get(`auth/me`).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(UserId) {
        return instance.get(`profile/` + UserId ).then(response => response.data)
    },
    getStatus(userId) {
        return instance.get('profile/status/'+ userId)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status})
    }
}

export const authAPI = {
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}


