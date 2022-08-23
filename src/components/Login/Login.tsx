import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, GetStringKeys, Input} from "../common/controlforms/FormsControls";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Navigate} from "react-router-dom";
import s from "../common/controlforms/FormsControl.module.css"
import {AppStateType} from "../../redux/redux-store";


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, captchaUrl, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            {CreateField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {CreateField<LoginFormValuesTypeKeys>("Password", "password", [required], Input,{type: "password"})}
            {CreateField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl &&  CreateField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input)}

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



type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha )
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth

})
export default connect (mapStateToProps, {login}) (Login);