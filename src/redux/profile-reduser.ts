import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/types";
import {usersAPI} from "../api/usersAPI";
import {profileAPI} from "../api/profileAPI";
import {BaseThunkType, InferActionsType} from "./redux-store";



let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?!", likesCount: 10},
        {id: 2, message: "its my first post!!", likesCount: 12},
        {id: 3, message: "BLAbla!", likesCount: 21},
        {id: 4, message: "DadaNET", likesCount: 7}
    ] as Array<PostType>,

    profile: null as ProfileType | null,
    status: ""

}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType) : InitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        }


        case "SET_USER_PROFILE": {
            return {
                ...state, profile: action.profile
            }
        }
        case "SET_STATUS": {
            return {
                ...state, status: action.status
            }
        }
        case "SAVE_PHOTO_SUCCESS": {
            debugger
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state;
    }
}



export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: "ADD_POST", newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "SET_STATUS", status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: "SAVE_PHOTO_SUCCESS", photos} as const)
}


export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))

}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}



export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    let data = await usersAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    const id = getState().auth.id
    const data = await usersAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (id != null) {
        dispatch(getUserProfile(id))
    } else {
        throw new Error("id can't be null")
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}


export default profileReducer;