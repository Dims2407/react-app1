import React from 'react'
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, Input, Textarea} from "../../common/controlforms/FormsControls";
import {NewMessageFormValuesType} from "../Dialogs";



const maxLength50 = maxLengthCreator(50)
type NewMessageFormValuesKeys = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {CreateField<NewMessageFormValuesKeys>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}

            <div>
                <button>Add new message</button></div>
        </form>)
}
export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)