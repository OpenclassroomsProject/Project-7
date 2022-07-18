
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

  import './index.css';

  import App from './App';
  

import Home from './pages/Home';
import CreatePost from './pages/post/Create';
import Profil from './pages/profil/Profil';
import Setting from './pages/profil/Setting';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
        <App/>
        <Routes>
            <Route exact path='/'  element={<Home title={"Accueil"} />} />
            <Route  path='/profil' element={<Profil title={'Profil xxxxx '}/>} />
            <Route  path='/profil/setting' element={<Setting title={"Paramaètres :"}/>}/>
            <Route  path='/createPost' element={<CreatePost title={"Création d'un Post"} />} />
        </Routes>
    </Router>
    {/* <Index></Index> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
