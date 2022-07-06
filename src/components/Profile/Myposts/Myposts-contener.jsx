import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reduser';
import StoreContext from '../../../storeContext';
import Myposts from './Myposts';

const MypostsConteiner = () => {


  return (
    <StoreContext.Consumer>
       {
      (store) => {
        let state = store.getState();
        let addPost = () => {
          store.dispatch(addPostActionCreator());
        }

        let onPostChange = (text) => {
          let action = updateNewPostTextActionCreator(text);
          store.dispatch(action);
        }
        return <Myposts
          updateNewPostText={onPostChange}
          addPost={addPost}
          newPostText={state.profilePage.newPostText}
          posts={state.profilePage.posts}
        />
      }
    }
    </StoreContext.Consumer>
  )

}

export default MypostsConteiner;