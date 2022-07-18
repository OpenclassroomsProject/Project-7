import { useState, useEffect } from 'react';
import { server } from '../../server';

export default function AuthForm(props) {
    const [{ Form }, setForm] = useState({ Form: false });

    useEffect(() => {
        
        function submitForm(e) {
            e.preventDefault();

            const Action = e.target.getAttribute('type');
            const password = e.target.password.value;
            const email = e.target.mail.value;

            let data = {
                email: email,
                password: password,
            };

            var myInit = { method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data), mode: 'cors'};


            fetch(server+'api/auth/'+Action, myInit)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((data) => {
                    if (!data) return console.log('No dta receive from API !');;
                    if(!data.JWT) return console.log('Server say ok but he dont send KWT token');
                    props.setUserConnected(data.JWT);
                    return localStorage.setItem('JWT', data.JWT);
                });
        }
        const LoginForm = () => {
            return (
                <>
                    <form type="Login" onSubmit={submitForm} className="flex flex-col items-center w-full  ">
                        <label htmlFor="mail"> Utilisateur :</label>
                        <input type="email" name="mail" id="mail" className="border border-gray-300 w-3/4 "></input>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" className="border border-gray-300 w-3/4"></input>
                        <button type="submit"> Connexion </button>
                    </form>
                </>
            );
        };
        const SignInForm = () => {
            return (
                <>
                    <form type="SignIn" onSubmit={submitForm} className="flex flex-col items-center w-full">
                        <label htmlFor="mail"> Adresse email :</label>
                        <input type="email" name="mail" id="mail" className="border border-gray-300 w-3/4"></input>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" className="border border-gray-300 w-3/4 "></input>
                        <button type="submit"> Inscription </button>
                    </form>
                </>
            );
        };

        if (props.type) {
            switch (props.type) {
                case 'SignIn':
                    setForm({ Form: SignInForm() });
                    break;
                case 'Login':
                    setForm({ Form: LoginForm() });
                    break;
                default:
                    return () => {};
            }
        } 
    }, [props]);

    return Form;
}
