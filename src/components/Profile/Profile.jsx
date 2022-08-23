import React from 'react';
import MypostsConteiner from './Myposts/Myposts-contener';
import ProfileInfo from "./ProfileInfo/ProfileInfo";




const Profile = (props) => {


     return <div>

         <ProfileInfo saveProfile={props.saveProfile}
                      savePhoto={props.savePhoto}
                      isOwner={props.isOwner}
                      profile={props.profile}
                      status={props.status}
                      updateStatus={props.updateStatus} />

         <MypostsConteiner/>
      
    
      </div>
}

export default Profile;