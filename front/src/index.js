import ReactDOM from 'react-dom/client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import { App } from './App';

import Home from './pages/Home';
import CreatePost from './pages/post/Create';
import Profil from './pages/profil/Profil';
import Setting from './pages/profil/Setting';
import GetPost from './pages/post/[id]';
import EditPost from './pages/post/Edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            {/* <Header userContext={UserContext} /> */}
            {/* <UserContext.Provider> */}
            <App>
                {/* <App userContext={UserContext} /> */}
                <Routes>
                    <Route path='/header' />
                    <Route path='/' element={<Home title={'Accueil'} />} />
                    {/* <Route path='/profil' element={<Profil title={'Profil xxxxx '} />} /> */}
                    <Route path='/profil/:id' element={<Profil title={'Profil xxxxx '} />} />
                    <Route path='/profil/settings' element={<Setting title={'Paramètres :'} />} />
                    <Route path='/post/create' element={<CreatePost title={"Création d'un Post"} />} />
                    <Route path='/post/edit/:id' element={<EditPost />} />
                    <Route path='/post/:id' element={<GetPost />} />
                </Routes>
            </App>
            {/* </UserContext.Provider> */}
        </Router>
        {/* <Index></Index> */}
    </React.StrictMode>
);

// export async function getStaticProps(){
//   console.log('ici');
//   return {
//     props:{Loading:LoadingScreen}
//   }
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
