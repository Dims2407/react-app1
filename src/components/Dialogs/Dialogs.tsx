import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './DialogItem/Message/Message'
import s from "./Dialogs.module.css"
import {InitialStateType} from "../../redux/message-reduser";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";



type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string

}



const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.messagesPage;

    let dialogsElements = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id} />)
    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id} id={m.id} />)



    let addNewMessage = (values: NewMessageFormValuesType) => {
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



export default Dialogs;

