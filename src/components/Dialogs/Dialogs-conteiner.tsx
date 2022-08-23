import React from 'react'
import { actions } from '../../redux/message-reduser'
import Dialogs from './Dialogs'
import {connect} from "react-redux";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";




let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    WithAuthRedirect
)(// @ts-ignore
    Dialogs)



