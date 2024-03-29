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
import {useSearchParams} from "react-router-dom";




type PropsType = {}



export const Users: FC<PropsType> = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)




    const dispatch: AppDispatch = useDispatch()


    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {

        const result: any = {}

        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value === 'true') {
                value2 = true
            } else if (value === 'false') {
                value2 = false
            }
            result[key] = value2
        }

        let actualPage = result.page || currentPage
        let term = result.term || filter.term

        let friend = result.friend || filter.friend
        if (result.friend === false) {
            friend = result.friend
        }

        const actualFilter = {friend, term}

        dispatch(reqUsers(actualPage, pageSize, actualFilter)as unknown as AnyAction)

        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)

        // eslint-disable-next-line
    }, [filter, currentPage])


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

