import {updateObjInArray} from "../utilities/updObjInArr/updateObInArray";
import {UserType} from "../Types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";
import {APIResponseType} from "../api/api";





let initialState = {
    users: [] as Array<UserType>,
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id
    filter:  {
        term: "",
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>


const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjInArray(state.users, action.payload, "id", {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjInArray(state.users, action.payload, "id", {followed: false})

                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            }
        case "SET_USERS": {
            return {...state, users: [...action.payload]}
        }

        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.payload}
        }

        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.payload}
        }

        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.payload}
        }

        case "SET_FILTER":{
            return {...state, filter: action.payload}
        }

        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state, followingInProgress: action.payload
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }


        default:
            return state;
    }
}




export const actions = {
    followSuccess: (userId: number) => ({type: "FOLLOW", payload:userId} as const),
    unfollowSuccess: (userId: number) => ({type: "UNFOLLOW", payload:userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", payload:users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", payload:currentPage} as const),
    setFilter: (filter: FilterType) => ({type: "SET_FILTER", payload:filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: "SET_TOTAL_USERS_COUNT", payload: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", payload:isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        payload: isFetching,
        userId
    } as const)

}




export const reqUsers = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState, ) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(pageNumber))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(pageNumber, pageSize, filter.term, filter.friend)

        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}


export const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number,
                                          apiMethod:  (userId: number) => Promise<APIResponseType>,
                                          actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)

    }
}


export default usersReducer;