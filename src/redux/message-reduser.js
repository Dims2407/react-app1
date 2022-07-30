
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: "Dimon",},
        {id: 2, name: "Sanek"},
        {id: 3, name: "Serj"},
    ],

    messages: [
        {id: 1, message: "Heeey!"},
        {id: 2, message: "Hello!"},
        {id: 3, message: "Okey!"},
        {id: 4, message: "Yo!"},
        {id: 5, message: "Yo123!"},
    ]
}
const dialogsReduser = (state = initialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReduser;