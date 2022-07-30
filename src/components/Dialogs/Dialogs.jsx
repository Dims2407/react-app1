import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './DialogItem/Message/Message'
import s from "./Dialogs.module.css"
import handleSubmit from "redux-form/lib/handleSubmit";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/controlforms/FormsControls";
import {maxLengthCreator, required} from "../../utilities/validators/validators";




const Dialogs = (props) => {

    let state = props.messagesPage;

    let dialogsElements = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id} id={m.id} />);
    let newMessageBody = state.newMessageBody;


    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div>
                <img src="https://vk.com/images/icons/im_favorites_100.png"></img>
                <img src="https://sun9-43.userapi.com/s/v1/ig2/7Lh0dw-wI_lBZeaQ2AsCJY0FJZYMJ36tYdSK0BXtElarq95kY0INyXPR5acOo-sGJZDwm1v7x8LeAid8bf2xWNa6.jpg?size=50x50&quality=96&crop=221,1,957,957&ava=1"></img>
                <img src="https://sun9-2.userapi.com/s/v1/ig2/ZGba-x9up4Cuf3m9YNQou-HJvMEBoDiDAhoo7PhDwDIUwGRfY8RhRNfexMVhBDsWZ9mAjBPgYqARwVFOB_qB8YVK.jpg?size=50x50&quality=96&crop=4,118,1615,1615&ava=1"></img>
            </div>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements} </div>

<AddMessageFormRedux onSubmit={addNewMessage} />

            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
                   <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message" />

        <div>
            <button>Add new message</button></div>
    </form>)
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;

