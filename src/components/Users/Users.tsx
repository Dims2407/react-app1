import React, {FC, useEffect} from "react";
import {Paginator} from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, reqUsers, unfollow} from "../../redux/users-reduser";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction} from "redux";
import {AppDispatch} from "../../redux/redux-store";



type PropsType = {}



export const Users: FC<PropsType> = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)




    const dispatch: AppDispatch = useDispatch()



    useEffect(() => {
        console.log('azaza')


        dispatch(reqUsers(currentPage, pageSize, filter) as unknown as AnyAction)
    }, [])


    const onPageChanged = (pageNumber: number) => {

        dispatch(reqUsers(pageNumber, pageSize, filter) as unknown as AnyAction)
    }
    const onFilterChanged = (filter: FilterType) => {

        dispatch(reqUsers(1, pageSize,filter) as unknown as AnyAction)
    }
    const _follow = (userId: number) => {

        dispatch(follow(userId)as unknown as AnyAction)
    }
    const _unfollow = (userId: number) => {


        dispatch(unfollow(userId)as unknown as AnyAction)
    }

    return <div>


        <UsersSearchForm onFilterChanged={onFilterChanged}/>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User
                    followingInProgress={followingInProgress} follow={_follow}
                    unfollow={_unfollow}
                    user={u}
                    key={u.id}/>)
            }
        </div>
    </div>
}

