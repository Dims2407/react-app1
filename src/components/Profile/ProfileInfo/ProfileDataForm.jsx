import React from "react";
import style from "../../common/controlforms/FormsControl.module.css"
import s from "./ProfileInfo.module.css";


import {CreateField, Input, Textarea} from "../../common/controlforms/FormsControls";
import {reduxForm,} from "redux-form";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
         <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full Name:</b>

            {CreateField ("Full name", "fullName", [], Input)}
        </div>

        <div>
            <b>Looking For A Job:</b>
            {CreateField ("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>

            <div><b>My Prof skills:</b> :
                {CreateField ("My Prof skills", "lookingForAJobDescription", [], Textarea)}
            </div>


        <div><b>About Me:</b>
            {CreateField ("About Me...", "aboutMe", [], Textarea)}
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
const ProfileDataReduxForm = reduxForm({form: 'edit-profile', enableReinitialize: true, destroyOnUnmount: false})(ProfileDataForm)
export default ProfileDataReduxForm