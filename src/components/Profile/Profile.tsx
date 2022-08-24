import React from 'react';
import MypostsConteiner from './Myposts/Myposts-contener';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../Types/types";


type PropsType = {

    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    isOwner:boolean
    profile: ProfileType | null
    status:string
    updateStatus: (status: string) => void



}

const Profile: React.FC<PropsType> = (props) => {


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