import React, {useState} from 'react';
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import usersPhoto from "../../../assets/images/users.png"
import ProfileDataReduxForm, {ProfileDataForm} from "./ProfileDataForm";


const ProfileInfo = (props) => {


    let [editMode, setEditMode] = useState(false)


    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit =  (formData) => {
     props.saveProfile(formData).then(
         ()=>{
             setEditMode(false)
         })}

    return <div className={s.content}>
        <img src="https://proumnyjdom.ru/wp-content/uploads/2019/06/1365401196_teplye-oboi-1-1024x557.jpeg"></img>
        <div className={s.avatar}>
            <img src={props.profile.photos.large || usersPhoto}/>
            <div>  {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}</div>
        </div>
        <div><b>ID:</b> {props.profile.userId}</div>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        {editMode
            ? <ProfileDataReduxForm initialValues={props.profile} profile={props.profile}  onSubmit={onSubmit}/>
            : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={props.profile} isOwner={props.isOwner}/>}


        <div> ava + description</div>
    </div>
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        { isOwner && <div><button onClick={goToEditMode}>edit</button></div> }
        <div><b>Full Name:</b> {profile.fullName}</div>

        <div>
            <b>Looking For A Job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>

        <div><b>My Prof skills:</b> {profile.lookingForAJobDescription}</div>

        <div><b>About Me:</b>{profile.aboutMe}</div>



        <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contacts contactTitle={key} contactValue={profile.contacts[key]}/>})}
        </div>
    </div>
}



const Contacts = ({contactTitle, contactValue}) => {
    return <div className={s.contacts}>
        <b>{contactTitle}:</b>{contactValue}
    </div>
}

export default ProfileInfo;