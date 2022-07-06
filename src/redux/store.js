// import dialogsReduser from "./message-reduser";
// import profileReduser from "./profile-reduser";



// let store = {
//     _state: {

//         profilePAge: {

//             posts: [
//                 { id: 1, message: "Hi, how are you?!", likesCount: 10 },
//                 { id: 2, message: "its my first post!!", likesCount: 12 },
//             ],


//             newPostText: 'Text Test'


//         },

//         messagesPage: {

//             dialogs: [
//                 { id: 1, name: "Dimon", },
//                 { id: 2, name: "Sanek" },
//                 { id: 3, name: "Serj" },
//             ],

//             avaImages: [
//                 { id: 1, img: "https://vk.com/images/icons/im_favorites_100.png" },
//                 { id: 2, img: "https://sun9-43.userapi.com/s/v1/ig2/7Lh0dw-wI_lBZeaQ2AsCJY0FJZYMJ36tYdSK0BXtElarq95kY0INyXPR5acOo-sGJZDwm1v7x8LeAid8bf2xWNa6.jpg?size=50x50&quality=96&crop=221,1,957,957&ava=1" },
//                 { id: 3, img: "https://sun9-2.userapi.com/s/v1/ig2/ZGba-x9up4Cuf3m9YNQou-HJvMEBoDiDAhoo7PhDwDIUwGRfY8RhRNfexMVhBDsWZ9mAjBPgYqARwVFOB_qB8YVK.jpg?size=50x50&quality=96&crop=4,118,1615,1615&ava=1" },
//             ],

//             messages: [
//                 { id: 1, message: "Heeey!" },
//                 { id: 2, message: "Hello!" },
//                 { id: 3, message: "Okey!" },
//                 { id: 4, message: "Yo!" },
//                 { id: 5, message: "Yo123!" },
//             ],
//             newMessageBody: ''

//         }
//         ,
//     },
//     _callSubscriber() {
//         console.log("Changed");
//     },

//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },

//     dispatch(action) {
//         this._state.profilePAge = profileReduser (this._state.profilePAge, action)
//         this._state.messagesPage = dialogsReduser (this._state.messagesPage, action)
            
//         this._callSubscriber(this._state);   
            
//     }
// }

// export default store;

// window.store = store;
