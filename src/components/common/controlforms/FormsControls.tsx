import React from "react"
import s from "./FormsControl.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../utilities/validators/validators"
import {LoginFormValuesType} from "../../Login/Login";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}


const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            {children}
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    return <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    return <FormControl {...props}><input {...props.input} {...props}/></FormControl>
}





export function CreateField<FormKeysType extends string> (placeholder: string | undefined,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = ""){
    return <div>
            <Field placeholder={placeholder}
                   name={name}
                   validate={validators}
                   component={component}
                   {...props}
            /> {text}
        </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>
