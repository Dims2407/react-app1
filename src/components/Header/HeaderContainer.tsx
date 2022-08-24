import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reduser";
import {AppStateType} from "../../redux/redux-store";



type MapPropsType = {
    isAuth: boolean
    login: string | null
}
type DispatchPropsType = {
    logout: () => void
}

type PropsType = MapPropsType & DispatchPropsType

const HeaderContainer: React.FC<PropsType> = (props) => {
        return <Header {...props} />
    }




const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login : state.auth.login

})
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {logout})(HeaderContainer)


