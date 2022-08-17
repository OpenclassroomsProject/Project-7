import React, { useEffect, useState } from 'react';
import AuthForm from '../../components/header/auth/_AuthForm';
import Home from '../Home';

export default function SingIn () {
  console.log('Sigin comonent');
  // const [Mobile, setMobile] = useState(true);

  // useEffect(() => {
  //   if (!localStorage.getItem('JWT')) {
  //     // @ts-ignore
  //     document.getElementsByClassName('signin')[0].click();
  //   }
  // },[]);
  // if (!Mobile) {
  //   return <Home title={undefined}></Home>;
  // }

  return <AuthForm type={'SignIn'} />;
}
