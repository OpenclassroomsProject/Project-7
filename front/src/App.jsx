import Header from './components/header/Header';

import { addHeaderJWT } from './components/fetch/addHeaderJWT';
import { server } from './server';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Page from './components/templates/_page';
import { ThemeContext } from './pages/profil/Setting';

// import Login from './pages/auth/login';
import AuthForm from './components/header/_AuthForm';


export const UserContext = createContext(false);
// const theme = {
//     'dark',
//     light: { header: '' },
//     red: { header: 'bg-primary-red text-white ' },
// };

export const App = ({ children }) => {
  const [theme, setTheme] = useState(useContext(ThemeContext));

  const [userData, setDataUser] = useState(false);

  const toggleConnect = (JWT = false, id = false, pseudo = false, avatar = false, admin = false) => {
    const Obj = !JWT
      ? false
      : {
          jwt: JWT,
          id,
          pseudo,
          avatar,
          admin
        };
    // @ts-ignore
    setDataUser(Obj);
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') && !userData) {
      console.log('Log request send with JWT token ...');

      // myHeaders.append('authorization', 'bearer ' + localStorage.getItem('JWT'));
      const myHeaders = addHeaderJWT();
      const init = { method: 'GET', headers: myHeaders, mode: 'cors' };

      // @ts-ignore
      fetch(server + 'api/auth', init)
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((user) => {
          console.log(user);
          // @ts-ignore
          toggleConnect(localStorage.getItem('JWT'), user._id, user.pseudo, user.avatar, user.admin);
        });
    }
  }, [userData]);

    return (
      console.log('render app'),
      (
        <ThemeContext.Provider
        value={{
          ...theme,
          // @ts-ignore
          setTheme
        }}>
        <UserContext.Provider
          // @ts-ignore
          value={{ userData, setDataUser }}>
          <Header />

          <Page>{userData? children : <AuthForm type={'Login'}/>}</Page>

        </UserContext.Provider>
      </ThemeContext.Provider>
    )
    );
};
