const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
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
    ],
    newMessageBody: ''}
const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
            case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;}
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body})
export default dialogsReduser;