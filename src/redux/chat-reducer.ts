import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {FormAction} from "redux-form";
import {Dispatch} from "redux";
import {v4} from 'uuid';


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

type ChatMessageType = ChatMessageAPIType & { id: string }

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "MESSAGES_RECEIVED":
            return {

                ...state,
                messages:  [ ...state.messages, ...action.payload.messages
                    .map(m => ({...m, id: v4()}))]
                    .filter((m, index, array) => index >= array.length - 100)

            }

        case "STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }

        case "CLEAR_MESSAGES":
             return {
                 ...state,
                 messages: []
             }


        default:
            return state;
    }
}
export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({type: "MESSAGES_RECEIVED", payload: {messages}} as const),
    statusChanged: (status: StatusType) =>
        ({type: "STATUS_CHANGED", payload: {status}} as const),
      clearMessages: (messages: ChatMessageAPIType[]) =>
         ({type: "CLEAR_MESSAGES", payload: [messages]} as const)

}




let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startListeningMessages = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}

export const stopListeningMessages = (): ThunkType => async (dispatch) => {

    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(actions.clearMessages([]))


}


export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
}





export default chatReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>