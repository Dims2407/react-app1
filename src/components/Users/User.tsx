import React from "react";
import s from './Users.module.css'
// @ts-ignore
import userPhoto from '../../assets/images/users.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../Types/types";


type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
let User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {

    return <div>
    <span>
        <div>
            <NavLink to={'/profile/' + user.id}>
        <img src={user.photos.small != null ? user.photos.small : userPhoto}
             className={s.userPhoto}/>
            </NavLink>
        </div>
            <div>
        {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)}
                      onClick={() => {
                          unfollow(user.id)}}
            >Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)}
                      onClick={() => {
                          follow(user.id)}}
            >Follow</button>}
                </div>
    </span>
            <span>

                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                    <div>{user.id}</div>
                </span>

                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>

                </span>
            </span>
        </div>
}

export default User;