import {APIResponseType, instance} from "./api";
import {ProfileType} from "../Types/types";

export const profileAPI = {
    getProfile(UserId: number) {
        return instance.get<ProfileType>(`profile/` + UserId).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status: status}).then(response => response.data)
    }
}