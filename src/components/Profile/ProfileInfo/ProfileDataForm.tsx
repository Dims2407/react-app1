import React from "react";
import style from "../../common/controlforms/FormsControl.module.css"
import s from "./ProfileInfo.module.css";
import {CreateField, GetStringKeys, Input, Textarea} from "../../common/controlforms/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../Types/types";



type PropsType = {
    profile: ProfileType

}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
         <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full Name:</b>

            {CreateField<ProfileTypeKeys> ("Full name", "fullName", [], Input)}
        </div>

        <div>
            <b>Looking For A Job:</b>
            {CreateField<ProfileTypeKeys> ("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>

            <div><b>My Prof skills:</b> :
                {CreateField<ProfileTypeKeys> ("My Prof skills", "lookingForAJobDescription", [], Textarea)}
            </div>


        <div><b>About Me:</b>
            {CreateField<ProfileTypeKeys> ("About Me...", "aboutMe", [], Textarea)}
        </div>


      <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
       return <div key={key} className={s.contact}>
           <b>{key}:</b>  {CreateField (key, "contacts." + key, [], Input)}
       </div>
      })}
        </div>
    </form>
}
//не срабатывает инициализация формы с помощью параметра initialValues={profile}.в билде такого не будет но добавлены доп условия после эит-профайл

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile', enableReinitialize: true, destroyOnUnmount: false})(ProfileDataForm)
export default ProfileDataReduxForm