import React, {useEffect, useState} from "react";
import s from './Github.module.css'
import axios from "axios";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}


type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}
export const Search = React.memo((props: SearchPropsType) => {
    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return <div>
        <input placeholder={"Search"} value={tempSearch}
               onChange={(e) => {
                   setTempSearch(e.currentTarget.value)
               }}/>
        <button onClick={() => {
            props.onSubmit(tempSearch)
        }}>Find
        </button>
    </div>
})

type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}
export const UsersList = React.memo((props: UsersListPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    useEffect(() => {
        console.log("sync users completed")
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])
    return <ul>
        {users.map(u => <li key={u.id} className={props.selectedUser === u ? s.selected : ''}
                            onClick={() => {
                                props.onUserSelect(u)
                                //document.title = u
                            }}>
            {u.login}
        </li>)}
    </ul>
})

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
}

export const Timer = React.memo((props: TimerPropsType) => {
    const [seconds, setSeconds] = useState(props.seconds)

    useEffect(()=>{
        setSeconds(props.seconds)
    },[props.seconds])

    useEffect(()=>{
        props.onChange(seconds)
},[seconds])

    useEffect(() => {
      const intervalId =  setInterval(() => {
          console.log('tik-tak')
            setSeconds((prev) => prev - 1)
        }, 1000)
        return () => {clearInterval(intervalId)}
    }, [props.timerKey])
    return <div>
        {seconds}
    </div>
})


type UserDetailsPropsType = {
    user: SearchUserType | null
}
const startTimer = 10
export const UserDetails = React.memo((props: UserDetailsPropsType) => {

    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [seconds, setSeconds] = useState(startTimer)
    useEffect(() => {
        console.log("sync user datails")
        if (!!props.user) {
            axios.get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(res => {
                    setSeconds(startTimer)
                    setUserDetails(res.data)

                })
        }
    }, [props.user])

    useEffect(()=>{
if (seconds < 1) {
    setUserDetails(null)
}
    },[seconds])

    return <div>

        {userDetails && <div>
            <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()} />
            <h2>{userDetails.login}</h2>
            <img src={userDetails.avatar_url}/>
            <br/>
            {userDetails.login}, followers: {userDetails.followers}
        </div>}
    </div>
})


export const Github = React.memo(() => {
    let initialSearchState = 'Dims2407'
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState(initialSearchState)

    useEffect(() => {
        console.log("sync TAB title")
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return <div className={s.container}>
        <div>
            <Search value={searchTerm} onSubmit={(value: string) => {
                setSearchTerm(value)
            }}/>
            <button onClick={() => setSearchTerm(initialSearchState)}>reset</button>
            <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>
        </div>
        <div>
            <UserDetails user={selectedUser}/>
        </div>
    </div>
})