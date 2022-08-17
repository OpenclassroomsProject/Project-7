import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { server } from '../../../server';

export default function AuthForm ({ type, closeLogPanel = null }) {
  const Navigate = useNavigate()

  const userContext = useContext(UserContext);
  // const responsiveContext = useContext(ResponsiveContext);
  // console.log(responsiveContext.mobile);
  const [formType, setFormType] = useState(type);

  // console.log(formType);

  const style = {
    form:'flex flex-col  w-full',
    inputWrapper:'relative border border-black w-full h-full mt-4' ,
    label:'absolute px-[12px] text-[#aaa] text-sm ',
    input:'w-full h-full px-[12px] pt-[20px] pb-[4px]  ' ,
    link:'text-center',
    hover:{
      link:'border-b border-white hover:text-[#006097] hover:border-[#006097] w-fit'
    }
  }
  const ButtonSubmitForm = ({children})=>{
    return <button type="submit" className='bg-[#2977C9] px-8 py-4 my-10 w-full text-white rounded-full font-black tracking-widest '> {children} </button>
  }
  const LoginForm = ({className}) => {
    return (
    <>
      <h2 className='text-center'>Veuillez remplir le formulaire de connexion ci-dessous :</h2>
      <form
      className={style.form}
        // @ts-ignore
        type="Login"
        onSubmit={submitForm}
        >
        
        <div className={style.inputWrapper}>
          <label htmlFor='mail' className={style.label  }> Email ou Pseudo </label>
          <input
            type="email"
            name="mail"
            id="mail"
            className={style.input}
             >
            </input>
        </div>
        <div className={style.inputWrapper}>

          <label htmlFor="password" className={style.label}>Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            className={style.input}></input>
        </div>
          <Link to='/ForgotPassword' className={`${style.link} ${style.hover.link}`} > Mot de passe oublié ?</Link>

          <ButtonSubmitForm>Connexion</ButtonSubmitForm>

          <span className='text-center'>Pas encore inscrit ?
            <Link to='/SignIn ' className={style.hover.link + ' '+ style.link}> Inscription </Link>
          </span>

      </form>
    </>

    );
  };
  const SignInForm = ({className}) => {
    return (
    <>
      <h2 className='text-center'>Veuillez repmplir le formulaire d'inscription ci-dessous:</h2>
      <form
        // @ts-ignore
        type="SignIn"
        onSubmit={submitForm}
        className={style.form}>
          <div className={style.inputWrapper}>
            <label htmlFor="mail" className={style.label}> Adresse email</label>
            <input
              type="email"
              name="mail"
              id="mail"
              className={style.input}></input>
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="password" className={style.label}>Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              className={style.input}></input>
          </div>
        <ButtonSubmitForm>Inscription</ButtonSubmitForm>
        <span className='text-center'>Déjà inscrit(e) ?
          <Link to='/Login' className={`mt-4  ${style.hover.link} ${style.link} `}> S'identifier  </Link>
        </span>
      </form>
    </>

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

        localStorage.setItem('JWT', data.JWT);
        return  Navigate('/')
      });
  }
  // const className = 'flex flex-col items-center bg-white h-[calc(100vh-3rem)]';
  return<>
    <div className={' flex flex-col items-center min-h-[inherit] bg-white p-4 pt-0 '}>
      <h1 className=' text-4xl text-[#8f5849] mb-4 text-center '>Bienvenue sur votre réseau social d'entreprise </h1>
      {formType === 'Login'?   
          <LoginForm />
        :
          <SignInForm />}
    </div>
  </>
}
