import React from 'react';
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img className='App-logo' src="https://cdn-icons-png.flaticon.com/128/238/238588.png"></img>


        <div className={s.loginBlock}>
            {props.isAuth
                ? <div> {props.login} - <button onClick={props.logout}>Log out</button> </div>
                : <NavLink to={'/login'}>Login</NavLink>
            }

        </div>
    </header>
}

export default Header;


