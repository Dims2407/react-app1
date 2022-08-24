import React from 'react';
import { actions } from '../../../redux/profile-reduser';

import Myposts, {DispatchPropsType, MapPropsType} from './Myposts';
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";



let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts}

}



const MypostsConteiner = connect<MapPropsType, DispatchPropsType, {}, AppStateType> (mapStateToProps,
    {addPost: actions.addPostActionCreator})(Myposts)

export default MypostsConteiner;