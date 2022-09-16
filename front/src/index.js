import ReactDOM from 'react-dom/client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import { App  } from './App';

import Home from './pages/Home';

import SingIn from './pages/auth/SignIn';
import Login from './pages/auth/Login';


import Profil from './pages/profil/Profil';
import Options from './pages/profil/Options';
import Setting from './pages/profil/Settings';

import CreatePost from './pages/post/Create';

import GetPost from './pages/post/[id]';
import EditPost from './pages/post/Edit';


import Messaging from './pages/messaging/Messaging';
import Header from './components/header/Header';
// import OpenConversation from './pages/messaging/_OpenConversation.jsx'
import { UserContext } from './App';
import Page from './components/templates/_page';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      {/* <Header userContext={UserContext} /> */}
      {/* <UserContext.Provider> */}
      <Router>
        <App>
          {/* <App userContext={UserContext} /> */}
          <Header/>
          <Page>
                <Routes>
                    <Route path="/header" element={<Messaging/>} />
                    <Route path="/" element={<Home title={'Accueil'} />} />
                    <Route exact path="/SignIn" element={<SingIn />} />
                    <Route exact path="/Login" element={<Login />} />
                    <Route path="/messagerie" element={<Messaging />} />
                    <Route path="/messagerie/:idConversation" element={<Messaging openMessage/>} />
                    <Route path="/messagerie/newMessage/:userID" element={<Messaging createMessage/>} />
                    {/* <Route path='/profil' element={<Profil title={'Profil xxxxx '} />} /> */}
                    <Route path="/profil/" element={<Profil refresh title={'Mon Profil'} />} />
                    <Route path="/profil/edit" element={<Profil edit title={'Editer mon profil '} />} />
                    <Route path="/profil/:id" element={<Profil title={'Profil xxxxx '} />} />
                    {/* <Route path="/profil/options" element={<Options />} /> */}
                    <Route path="/profil/settings" element={<Setting />} />
                    <Route path="/post/create" element={<CreatePost title={"Création d'un Post"} />} />
                    <Route path="/post/edit/:id" element={<
                    // @ts-ignore
                    EditPost />} />
                    <Route path="/post/:id" element={<GetPost />} />
                  </Routes>
          </Page>
        </App>        
      </Router>
      {/* </UserContext.Provider> */}
    {/* <Index></Index> */}
  </>
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
