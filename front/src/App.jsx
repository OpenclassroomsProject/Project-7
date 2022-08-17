import Header from './components/header/Header';

import { addHeaderJWT } from './components/fetch/addHeaderJWT';
import { server } from './server';

import React, { useState, useEffect, createContext, useContext, useLayoutEffect } from 'react';
import Page from './components/templates/_page';
import { ThemeContext } from './pages/profil/Settings';

// import AuthForm from './components/header/auth/_AuthForm';
import Login from './pages/auth/Login';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';


export const  UserContext = createContext(false);
              UserContext.displayName='User'
export const  ResponsiveContext = createContext({state:null, witdh:{mobile:600}})
              ResponsiveContext.displayName='Responsive';


// const theme = {
//     'dark',
//     light: { header: '' },
//     red: { header: 'bg-primary-red text-white ' },
// };

export const App = ({ children }) => {
  const [theme, setTheme] = useState(useContext(ThemeContext));
  const [responsive, setResponsive] = useState(useContext(ResponsiveContext))
  const [userData, setDataUser] = useState(true);
  let  Navigate = useNavigate()
  

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
    const path = window.location.pathname
    if(!localStorage.getItem('JWT')){
      // console.log('lalaala');
      // console.log(path.toLowerCase());
      switch(path.toLowerCase()){
        case '/signin':
          console.log('path SignIn');
        break;
        case '/login':
          console.log('path login');

        break;
        default:
          console.log('path default');
          Navigate('/Login')

        break;
      }
      setDataUser(false)
    }
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

          if(user){
            toggleConnect(localStorage.getItem('JWT'), user._id, user.pseudo, user.avatar, user.admin);
          }else{
            localStorage.clear()
            setDataUser(false)
            Navigate('/Login')
          }
          // @ts-ignore
        });
    }
    if(localStorage.getItem('JWT') && userData){
      if(path.toLowerCase() === '/login' || path.toLowerCase() === '/signin'){
        Navigate('/')
        console.log('useEffect');
      }
    }
  }, [userData,Navigate]);

  useLayoutEffect(()=>{
    detectMobile()
    function detectMobile(){
      if(responsive.state === null ){
        return detecteMaxWidth();
      }else{
        return window.onresize = detecteMaxWidth;
      }
      function detecteMaxWidth(){
        if(window.innerWidth <= 600){
            return setResponsive({...responsive, state:{mobile:true}} )
        }else{
          return setResponsive({...responsive, state:{mobile:false}} )

        }

      }
    }
  })
    const heightHeader = userData? 3.5 : 4.5;
    const style= {
      header:{height: 'h-['+heightHeader+'rem] sm:h-[3.5rem]' }
    }

    return (
      (
      <ResponsiveContext.Provider value={responsive}>
        <ThemeContext.Provider
          value={{
            ...theme,
            // @ts-ignore
            setTheme
          }}>

          <UserContext.Provider
            // @ts-ignore
            value={{ userData, setDataUser }}>
            <Header className={style.header.height} />

            <Page className={`min-h-[calc(100vh-${heightHeader}rem)] `}>
              { children}
            </Page>

          </UserContext.Provider>
        </ThemeContext.Provider>
      </ResponsiveContext.Provider>
    )
    );
};
