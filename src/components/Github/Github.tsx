import React, {useState} from "react";
import s from './Github.module.css'


export const Github = () => {

    const [selectedUser, setSelectedUser] = useState<string | null>(null)

    return <div className={s.container}>
        <div>
            <div>
                <input placeholder={"Search"} /> <button>Find</button>
            </div>
            <ul>
                {[ 'Dimych', 'San4ez', 'Serjio'].
                map(u=> <li className={selectedUser === u ? s.selected : ''}
                onClick={()=> {
                    setSelectedUser(u)
                    document.title = u
                }}>
                    {u}
                </li>)}
            </ul>
        </div>
        <div>
            <h2>Username</h2>
            <div>Details</div>
        </div>
    </div>
}