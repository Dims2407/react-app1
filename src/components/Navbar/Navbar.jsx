import React from 'react';
import { NavLink } from 'react-router-dom';
import s from "./Navbar.module.css"



const Navbar = () => {
  const ActiveLink = ({isActive}) => isActive ? s.active : s.item ;
    return <nav className={s.nav}>
        <div className={s.item}>
        <NavLink to='/profile' className = {ActiveLink}>Profile</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/dialogs' className = {ActiveLink}>Messeges</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/users' className = {ActiveLink}>Users</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/news' className = {ActiveLink}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/music' className = {ActiveLink} >Music</NavLink>
          <div className={s.item}>
            <NavLink to='/settings' className = {ActiveLink} >Settings</NavLink>
          </div>
          <div className={s.friends}>Friends</div>
          <div className={s.item}></div>
          <div>
            <img src="https://vk.com/images/icons/im_favorites_100.png"></img>
            <img src="https://sun9-43.userapi.com/s/v1/ig2/7Lh0dw-wI_lBZeaQ2AsCJY0FJZYMJ36tYdSK0BXtElarq95kY0INyXPR5acOo-sGJZDwm1v7x8LeAid8bf2xWNa6.jpg?size=50x50&quality=96&crop=221,1,957,957&ava=1"></img>
            <img src="https://sun9-2.userapi.com/s/v1/ig2/ZGba-x9up4Cuf3m9YNQou-HJvMEBoDiDAhoo7PhDwDIUwGRfY8RhRNfexMVhBDsWZ9mAjBPgYqARwVFOB_qB8YVK.jpg?size=50x50&quality=96&crop=4,118,1615,1615&ava=1"></img>
            </div>
        </div>
      </nav>

      
}





export default Navbar;