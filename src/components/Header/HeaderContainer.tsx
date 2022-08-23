import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reduser";
import {AppStateType} from "../../redux/redux-store";



type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const HeaderContainer: React.FC<PropsType> = (props) => {
        return <Header {...props} />
    }




const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login : state.auth.login

})
export default connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
(mapStateToProps, {logout})(HeaderContainer)


