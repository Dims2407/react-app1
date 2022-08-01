import React, {Component} from 'react';
import {Route, Routes, withRouter} from 'react-router-dom';
import './App.css';
import DialogsConteiner from './components/Dialogs/Dialogs-conteiner';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersConteiner from "./components/Users/UsersConteiner";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Lonig";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";



class App extends Component {

    componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
        return <Preloader/>
    }


        return (

          <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
              <Routes>
                <Route path="/dialogs/*" element={<DialogsConteiner/>}/>
                <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                <Route path="/profile/*" element={<ProfileContainer/>}/>
                <Route path="/users" element={<UsersConteiner/>}/>
                <Route path="/login" element={<Login/>}/>


                <Route path="/news" element={<News/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/music" element={<Music/>}/>
              </Routes>
            </div>
          </div>

    );
  }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect (mapStateToProps, {initializeApp})
(App);
