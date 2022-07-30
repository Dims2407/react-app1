import React from 'react';
import s from "./Profilecomp.module.css";
import MypostsConteiner from './Myposts/Myposts-contener';
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const Profile = (props) => {


     return <div>

         <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />

         <MypostsConteiner/>
      
    
      </div>
}

export default Profile;