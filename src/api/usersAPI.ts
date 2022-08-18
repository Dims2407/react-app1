import {PhotosType, ProfileType} from "../Types/types";
import {GetItemsType, instance, meResponseDataType, APIResponseType} from "./api";


type SavePhotoResponseType = {
    photos: PhotosType
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    },
    getAuthUser() {
        return instance.get<APIResponseType<meResponseDataType>>(`auth/me`).then(response => response.data)
    },


    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<APIResponseType<SavePhotoResponseType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile).then(response => response.data)
    }
}