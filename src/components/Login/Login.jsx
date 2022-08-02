import React from "react";
import {reduxForm} from "redux-form";
import {CreateField, Input} from "../common/controlforms/FormsControls";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Navigate} from "react-router-dom";
import s from "../common/controlforms/FormsControl.module.css"


const LoginForm = (handleSubmit, error, captchaUrl) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField("Email", "email", [required], Input)}
            {CreateField("Password", "password", [required], Input,{type: "password"})}
            {CreateField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

           {captchaUrl && <img src={captchaUrl} />}

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)



const Login = (props) => {

    const onSubmit = (formData) => {
props.login(formData.email, formData.password, formData.rememberMe )
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
    export default connect (mapStateToProps, {login}) (Login);