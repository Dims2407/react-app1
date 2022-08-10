import {usersAPI} from "../api/api";
import {updateObjInArray} from "../utilities/updObjInArr/updateObInArray";
import {UserType} from "../Types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";



const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'




let initialState = {
    users: [] as Array<UserType>,
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
}

export type InitialStateType = typeof initialState



const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
               users: updateObjInArray(state.users, action.userId, "id", {followed: true} )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", {followed: false} )

                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }


        default:
            return state;
    }
}

type ActionTypes = FollowSuccessAcType | UnfollowSuccessAcType | SetUsersAcType |
SetCurrentPageAcType | SetTotalUsersCountAcType | ToggleIsFetchingAcType | ToggleFollowingProgressAcType

type FollowSuccessAcType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number) : FollowSuccessAcType => ({type: FOLLOW, userId})

type UnfollowSuccessAcType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number) : UnfollowSuccessAcType => ({type: UNFOLLOW, userId})

type SetUsersAcType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):SetUsersAcType => ({type: SET_USERS, users})

type SetCurrentPageAcType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageAcType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountAcType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCountAcType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})

type ToggleIsFetchingAcType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingAcType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingProgressAcType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number):ToggleFollowingProgressAcType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})



type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionTypes>

export const reqUsers = (page : number, pageSize : number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)

        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}


export const _followUnfollowFlow = async (dispatch:DispatchType, userId: number, apiMethod: any,
                                          actionCreator: (userId: number)=> FollowSuccessAcType | UnfollowSuccessAcType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)

    }
}


export default usersReducer;