import Header  from './components/header/Header';
// import io from 'socket.io-client'

import { addHeaderJWT } from './components/fetch/addHeaderJWT';
import { server } from './server';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Page from './components/templates/_page';
import { ThemeContext } from './pages/profil/Settings';

// import AuthForm from './components/header/auth/_AuthForm';
// import Login from './pages/auth/Login';
import { useNavigate } from 'react-router-dom';
// import { useCallback } from 'react';
// import Home from './pages/Home';
import NavMessaging from './components/messaging/_NavMessaging';
// import socket from './components/socket/socket';
import {io} from 'socket.io-client'

// export const socket =  io.connect(server)
// import { io } from "socket.io-client";
// import { server } from "../../server";


const URL = "http://192.168.1.50:3001/";
export const socket = io(URL)

export const  UserContext = createContext(null);
              UserContext.displayName='User'
export const  ResponsiveContext = createContext({state:null, witdh:{mobile:600}})
              ResponsiveContext.displayName='Responsive';
export const  CacheContext = createContext({home:null,pageActive:String, previousPath: [], messaging : {sendMessage: false , conversationOpen:[]} });
              CacheContext.displayName='Cache'


// const theme = {
//     'dark',
//     light: { header: '' },
//     red: { header: 'bg-primary-red text-white ' },
// };

export const App = (props) => {

  const children = props.children
  const themeContext = useContext(ThemeContext)
  const [theme, updateTheme] = useState(themeContext);
  // const [responsive, setResponsive] = useState(useContext(ResponsiveContext))
  const [cache, updateCache] = useState(useContext(CacheContext));
  const [userData, setDataUser] = useState(useContext(UserContext));
  let  Navigate = useNavigate()

  useEffect(()=>{
    if(userData === null && localStorage.getItem('JWT') ){
      // console.log('fetch ');
      const myHeaders = addHeaderJWT();
      const init = { method: 'GET', headers: myHeaders, mode: 'cors' };
      fetch(server + '/api/auth', init)
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((user) => {
          if(user){
            // socket.emit('userId', user._id)
            // socket.connect()
            setDataUser(user)
            // toggleConnect(localStorage.getItem('JWT'), user._id, user.pseudo, user.avatar, user.admin,user.followedUser, user.conversation);
          }else{
            // setDataUser(false)
            localStorage.clear()
            Navigate('/Login')
          }
          // @ts-ignore
        });
    }else{
      if(userData === null && !localStorage.getItem('JWT')){
        setDataUser(false);
      }
    }

  },[userData, Navigate])
  useEffect(()=>{
    if(userData){
              // socket.on('connect', () => { 
        // //   socket.emit('joinPrivateRoom', "id_sdsfd", userContext._id)
        // });
        // console.log('ici');
        socket.emit("userId", userData._id)
    
        // socket.on('disconnect', () => {
        //     // setUserOnline(false);
        // });
    
        // socket.on('pong', () => {
        //   setLastPong(new Date().toISOString());
        // });
    
        return () => {
            socket.off('userId');
            // socket.off('disconnect');
          //   socket.off('pong');
          };
    }
  },[userData])

  

    const path = window.location.pathname.toLowerCase();
    switch(path){
      case '/signin':
        if(userData) return window.location.href = "/"
        break;
      case '/login':
        if(userData) return window.location.href = "/"
        break;
      default:
        if(userData === false ) return window.location.href='/Login'
        break;
    }



  // const toggleConnect = (JWT = false, id = false, pseudo = false, avatar = false, admin = false,followedUser=false, conversation = false) => {
  //   const Avatar = '/images/' + (avatar === "default.png"? "default.png": id+'/asset/'+avatar);
    
  //   const Obj = !JWT
  //     ? false
  //     : {
  //         jwt: JWT,
  //         id,
  //         pseudo,
  //         Avatar,
  //         followedUser,
  //         conversation,
  //         admin
  //       };
  //   // @ts-ignore
  //   setDataUser(Obj);
  // };


    // const path = window.location.pathname.toLowerCase();
    // if(!localStorage.getItem('JWT')) {
    //   switch(path){
    //     case '/signin':
    //       console.log('path SignIn');
    //     break;
    //     case '/login':
    //       console.log('path login');

    //     break;
    //     default:
    //       console.log('path default');
    //       Navigate('/Login')

    //     break;
    //   }
    //   setDataUser(false)
    // }
    // if (localStorage.getItem('JWT') && !userData) {
    //   const myHeaders = addHeaderJWT();
    //   const init = { method: 'GET', headers: myHeaders, mode: 'cors' };

    //   // @ts-ignore
    //   
    // }
    // if(localStorage.getItem('JWT') && userData){
    //   if(path === '/login' || path === '/signin'){
    //     Navigate('/')
    //   }else{
    
    //   }
    // }
    if(userData === null) return false;
    return (

            <UserContext.Provider value={[userData, setDataUser]}>
              <CacheContext.Provider value={{value:cache,updateCache:updateCache}}>

              {/* <Header/> */}

              {/* <Page className={`h-screen overflow-scroll`}> { children} </Page> */}
                {children}
                {userData? <NavMessaging/> : ''}
              </CacheContext.Provider>

            </UserContext.Provider>
       
    )
};

