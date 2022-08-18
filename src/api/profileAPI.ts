import {instance} from "./api";

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