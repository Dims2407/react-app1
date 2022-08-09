import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/types";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'



let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?!", likesCount: 10},
        {id: 2, message: "its my first post!!", likesCount: 12},
        {id: 3, message: "BLAbla!", likesCount: 21},
        {id: 4, message: "DadaNET", likesCount: 7}
    ] as Array<PostType>,

    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

export type InitialStateType = typeof initialState


const profileReduser = (state = initialState, action: any) : InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }

        }


        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            debugger
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state;
    }
}

type AddPostActionCreatorAcType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorAcType => ({type: ADD_POST, newPostText})

type SetUserProfileAcType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileAcType=> ({type: SET_USER_PROFILE, profile})

type SetStatusAcType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status:string): SetStatusAcType=> ({type: SET_STATUS, status})

type SavePhotoSuccessActype = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActype => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfile = (userId:number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))

}

export const getStatus = (userId:number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status:string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await usersAPI.savePhoto(file)
    debugger
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile:ProfileType) => async (dispatch: any, getState:any) => {
    const id = getState().auth.id
    const response = await usersAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(id))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReduser;