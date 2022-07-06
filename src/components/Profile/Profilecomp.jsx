import React from 'react';
import s from "./Profilecomp.module.css";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MypostsConteiner from './Myposts/Myposts-contener';



const Profilecomp = (props) => {
     
     return <div className={s.content}>
        
      
      <ProfileInfo/>
      <MypostsConteiner/>
      
    
      </div>
}

export default Profilecomp;