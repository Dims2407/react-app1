import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reduser';

import Myposts from './Myposts';
import {connect} from "react-redux";



let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText}}


let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreator(text);
      dispatch(action)},
    addPost: () => {dispatch(addPostActionCreator())}
  }}

const MypostsConteiner = connect (mapStateToProps, mapDispatchToProps)(Myposts)

export default MypostsConteiner;