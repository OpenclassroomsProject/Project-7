import React, { useEffect, useState } from 'react';
import AuthForm from '../../components/header/_AuthForm';
import Home from '../Home';

export default function SingIn () {
  const [Mobile, setMobile] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('JWT') && document.body.clientWidth >= 640) {
      setMobile(false);
      // @ts-ignore
      document.getElementsByClassName('signin')[0].click();
    }
  },[]);
  if (!Mobile) {
    return <Home title={undefined}></Home>;
  }

  return <AuthForm type={'SignIn'} />;
}
