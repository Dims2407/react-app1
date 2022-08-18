import React from 'react';
import { actions } from '../../../redux/profile-reduser';

import Myposts from './Myposts';
import {connect} from "react-redux";



let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText}}


let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {dispatch(actions.addPostActionCreator(newPostText))}
  }}

const MypostsConteiner = connect (mapStateToProps, mapDispatchToProps)(Myposts)

export default MypostsConteiner;