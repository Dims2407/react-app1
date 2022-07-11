import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsConteiner from './components/Dialogs/Dialogs-conteiner';
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profilecomp from './components/Profile/Profilecomp';
import Settings from './components/Settings/Settings';
import UsersConteiner from "./components/Users/UsersConteiner";


const App = () => {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*" element={<DialogsConteiner/>} />
            <Route path="/profile" element={<Profilecomp/>} />
            <Route path="/users" element={<UsersConteiner/>} />
            <Route path="/news" element={<News />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </div>
      </div>

    </BrowserRouter>
  );
}
export default App;
