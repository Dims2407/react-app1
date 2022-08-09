import React, {FC} from "react";
import {Paginator} from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../Types/types";

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return <div>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
<div>
        {
            users.map(u => <User
                followingInProgress={props.followingInProgress} follow={props.follow}   unfollow={props.unfollow} user={u} key={u.id}/>)
        }
    </div>
    </div>
}
export default Users;