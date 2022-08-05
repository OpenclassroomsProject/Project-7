import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { server } from '../../server';

export default function AuthForm ({ type, closeLogPanel = null }) {
  const userContext = useContext(UserContext);
  const [formType, setFormType] = useState(type);

  const LoginForm = () => {
    return (
      <div className="flex flex-col items-center" >
      <h1> Formulaire de connexion : </h1>
      <form
      className="flex flex-col items-center"
        // @ts-ignore
        type="Login"
        onSubmit={submitForm}
        >
        <label htmlFor="mail"> Utilisateur :</label>
        <input
          type="email"
          name="mail"
          id="mail"
          className="border border-gray-300 w-3/4 "></input>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-300 w-3/4"></input>
        <button type="submit"> Connexion </button>

        <button className='mt-4' onClick={(e)=>{
          e.preventDefault();
          setFormType('SingIn');
        }}> inscription</button>
      </form>
    </div>
    );
  };
  const SignInForm = () => {
    return (
    <div className="flex flex-col items-center ">
      <h1> Formulaire d'inscription :</h1>
      <form
        // @ts-ignore
        type="SignIn"
        onSubmit={submitForm}
        className="flex flex-col items-center">
        <label htmlFor="mail"> Adresse email :</label>
        <input
          type="email"
          name="mail"
          id="mail"
          className="border border-gray-300 w-3/4"></input>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-300 w-3/4 "></input>
        <button type="submit"> Inscription </button>
        <button className='mt-4' onClick={(e)=>{
          e.preventDefault();
          setFormType('Login');
        }}> connexion</button>
      </form>
    </div>
    );
  };
  function submitForm (e) {
    e.preventDefault();

    const Action = e.target.getAttribute('type');
    const password = e.target.password.value;
    const email = e.target.mail.value;

    const data = { email, password };

    const myInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'cors'
    };

    // @ts-ignore
    fetch(server + 'api/auth/' + Action, myInit)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (!data) return console.log('No dta receive from API !');
        if (!data.JWT) return console.log('Server say ok but he dont send KWT token');
        if(closeLogPanel != null){
          closeLogPanel();
        }
        // @ts-ignore
        userContext.setDataUser({
          jwt: data.JWT,
          id: data.userId,
          pseudo: data.pseudo,
          avatar: data.avatar,
          admin: data.admin
        });
        // setUserConnected(data.JWT, data._id, data.pseudo, data.avatar);

        return localStorage.setItem('JWT', data.JWT);
      });
  }
  return <>
    {formType === 'Login'? 
    <LoginForm/>
    :<SignInForm/>}
  </>;
}
