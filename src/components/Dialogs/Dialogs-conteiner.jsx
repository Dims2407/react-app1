import React from 'react'
import { sendMessageCreator } from '../../redux/message-reduser'
import Dialogs from './Dialogs'
import {connect} from "react-redux";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => { dispatch(sendMessageCreator(newMessageBody))}
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)



