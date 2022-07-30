import React from 'react';
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";



const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }


    return <div className={s.content}>
        <img src="https://proumnyjdom.ru/wp-content/uploads/2019/06/1365401196_teplye-oboi-1-1024x557.jpeg"></img>
        <div className={s.descrblock}>

            <img src={props.profile.photos.large}/>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            <div> {props.profile.aboutMe}</div>
            <div> {props.profile.lookingForAJob} </div>
            <div> {props.profile.lookingForAJobDescription}</div>
            <div> {props.profile.fullName}</div>
            <div> {props.profile.userId}</div>





            <div> ava + description</div>

        </div>


    </div>
}


export default ProfileInfo;