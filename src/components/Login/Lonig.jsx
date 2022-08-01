import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/controlforms/FormsControls";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Navigate} from "react-router-dom";
import s from "../common/controlforms/FormsControl.module.css"


const LoginForm = (handleSubmit, error) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"email"} name={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"Checkbox"}/> remember me
            </div>
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
        <LoginReduxForm onSubmit={onSubmit} />
        </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
    export default connect (mapStateToProps, {login}) (Login);