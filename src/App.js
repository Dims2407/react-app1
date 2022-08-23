import React, {Component, Suspense}  from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import  {AppStateType} from "./redux/redux-store";
import {compose} from "redux";
//import Music from './components/Music/Music';
//import News from './components/News/News';
//import Settings from './components/Settings/Settings';

const DialogsConteiner = React.lazy(() => import('./components/Dialogs/Dialogs-conteiner'));
//import DialogsConteiner from './components/Dialogs/Dialogs-conteiner';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//import ProfileContainer from "./components/Profile/ProfileContainer";
const UsersConteiner = React.lazy(() => import('./components/Users/UsersConteiner'));
//import UsersConteiner from "./components/Users/UsersConteiner";
//const Login = React.lazy(() => import('./components/Login/Login'));


// type MapPropsType = ReturnType<typeof mapStateToProps>
// type DispatchPropsType = {
//     initializeApp: ()=>void
// }



class App extends Component { //<MapPropsType & DispatchPropsType> {

    // catchAllUndandledErrors = (e: PromiseRejectionEvent) => {
    //     alert("Some error occured")
    // }

    componentDidMount() {
    this.props.initializeApp()
        //window.addEventListener("unhandlerejection", this.catchAllUndandledErrors )
  }
  // componentWillUnmount() {
  //     window.addEventListener("unhandlerejection", this.catchAllUndandledErrors )
  // }

    render() {
    if (!this.props.initialized) {
        return <Preloader/>
    }




        // @ts-ignore
        return (

          <div className="app-wrapper">
              <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
             <Suspense fallback={<Preloader/>} >
              <Routes>
                <Route path="/dialogs/*" element={<DialogsConteiner/>}/>
                <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                <Route path="/profile/*" element={<ProfileContainer/>}/>
                <Route path="/users" element={<UsersConteiner pageTitle={"Воины"} />}/>
                <Route path="/login" element={<Login/>}/>


                {/*<Route path="/news" element={<News/>}/>*/}
                {/*<Route path="/settings" element={<Settings/>}/>*/}
                {/*<Route path="/music" element={<Music/>}/>*/}
              </Routes>
             </Suspense>
            </div>
          </div>

    );
  }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


export default connect (mapStateToProps, {initializeApp})
(App)  ;
