import React, { useEffect, useMemo, useState } from 'react';
import AuthForm from '../../components/header/_AuthForm';
import Home from '../Home';

export default function Login () {
  const [Mobile, setMobile] = useState(true);
  const Index = useMemo(() => {
    return <Home title={undefined}></Home>;
  }, []);
  useEffect(() => {
    // window.onresize = () => {

    //   console.log(document.body.clientWidth);
    //   if (document.body.clientWidth == 641) {
    //     console.log('> 640');
    //     setMobile(false);
    //   }
    //   if (document.body.clientWidth == 639) {
    //     console.log('<640');
    //     setMobile(true);
    //   }
    // };
    // @ts-ignore

    // @ts-ignore

    if (document.body.clientWidth >= 640) {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    console.log('ici');
  }, [Mobile]);

  if (!Mobile) {
    return Index;
  }
  return <AuthForm type={'Login'} />;
}
