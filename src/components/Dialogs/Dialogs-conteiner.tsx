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
let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (newMessageBody: string) => { dispatch(actions.sendMessageCreator(newMessageBody))}
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(// @ts-ignore
    Dialogs)



