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
        .map(m => <Message message={m.message} key={m.id} />)



    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
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

