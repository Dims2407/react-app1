import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startListeningMessages, stopListeningMessages} from "../../redux/chat-reducer";
import {AnyAction} from "redux";
import {AppStateType} from "../../redux/redux-store";


export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


const ChatPage: React.FC = React.memo(() => {
        return <div>
            < Chat/>
        </div>
    }
)

const Chat: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)




    useEffect(()=>{
    dispatch(startListeningMessages() as unknown as AnyAction)

    return () => {
        dispatch(stopListeningMessages() as unknown as AnyAction)

    }

}, [dispatch])



    return <div>
        {status === 'error' && <div>Some error occured. Please refresh the page </div>}
<>
        <Messages />
        <FormForAddMessages/>
</>
    </div>
})

const Messages: React.FC = React.memo(() => {


    //console.log('>>>>>>>>Messages')
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }



    useEffect(() => {
        if (isAutoScroll) {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m}/>)}
<div ref={messagesAnchorRef}/>
    </div>
})
const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    //console.log('>>>>>>>>Message')

    return <div>
        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>

})


const FormForAddMessages: React.FC = React.memo(() => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()


    const status = useSelector((state: AppStateType) => state.chat.status)



    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message)as unknown as AnyAction)
        setMessage('')
    }

    return <div>
        <div>
            <textarea placeholder={'Text'}
                      onChange={(e) => setMessage(e.currentTarget.value)}
                      value={message}/>
        </div>
        <div>
            <button disabled={status !==  'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
})

export default ChatPage