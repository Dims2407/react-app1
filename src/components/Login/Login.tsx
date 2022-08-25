import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, GetStringKeys, Input} from "../common/controlforms/FormsControls";
import {required} from "../../utilities/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Navigate} from "react-router-dom";
import s from "../common/controlforms/FormsControl.module.css"
import {AppStateType} from "../../redux/redux-store";
import {AnyAction} from "redux";



type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, captchaUrl, error}) => {

        return (
            <form onSubmit={handleSubmit}>
                {CreateField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
                {CreateField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
                {CreateField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && CreateField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input)}

                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {



        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha)as unknown as AnyAction)
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}
