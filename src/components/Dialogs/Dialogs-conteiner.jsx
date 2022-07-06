import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/message-reduser'
import StoreContext from '../../storeContext';

import Dialogs from './Dialogs'



const DialogsConteiner = () => {




    return (
        <StoreContext.Consumer>
             {
            (store) => {
                let state = store.getState().messagesPage;


                let onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }


                let onNewMessageChange = (body) => {

                    store.dispatch(updateNewMessageBodyCreator(body))
                }
                return <Dialogs
                    updateNewMessageBody={onNewMessageChange}
                    sendMessage={onSendMessageClick}
                    messagesPage={state}
                />
            }
        }
        </StoreContext.Consumer>
    )
}

export default DialogsConteiner;

