const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Dimon",},
        {id: 2, name: "Sanek"},
        {id: 3, name: "Serj"},
    ] as Array<DialogType> ,

    messages: [
        {id: 1, message: "Heeey!"},
        {id: 2, message: "Hello!"},
        {id: 3, message: "Okey!"},
        {id: 4, message: "Yo!"},
        {id: 5, message: "Yo123!"},
    ]  as Array<MessageType>
}

export type InitialStateType = typeof initialState


const dialogsReduser = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {

                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;}
}

type SendMessageCreatorAcType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorAcType => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReduser