import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

export function WithAuthRedirect <WCP> (WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={"/login"}/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType >(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent
}
