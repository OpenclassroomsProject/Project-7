import React from 'react';
import {server} from './server'

import { useState, useEffect } from 'react';
// import '../styles/globals.css';

import Header from './components/header/Header';
import { addHeaderJWT } from './components/fetch/addHeaderJWT';



const useSetUserConnected = (initialValue = false) => {
    const [userConnected, setConnected] = useState(initialValue);

    const toggleConnected = (JWT = false) => setConnected(JWT);
    return [userConnected, toggleConnected];
};

function App() {
    // const [{ userConnected }, setuserConnected] = useState({ userConnected: false });
    const [userConnected, toggleConnected] = useSetUserConnected();

    useEffect(() => {
        if (localStorage.getItem('JWT') && userConnected === false) {
            (async function () {
                // myHeaders.append('authorization', 'bearer ' + localStorage.getItem('JWT'));
               const myHeaders=  addHeaderJWT();
                let init = { method: 'GET', headers: myHeaders, mode: 'cors' };

                const res = await fetch(server+'api/auth', init);

                if (!res.ok) return;
                return toggleConnected(localStorage.getItem('JWT'));
            })();
        }
    }, [userConnected,toggleConnected]);
    

    return (
    <>
        <Header userConnected={[userConnected, toggleConnected]}/>
    </>
    );
}

// export async function getStaticProps(){
//   console.log('ici');
//   return {
//     props:{Loading:LoadingScreen}
//   }
// }

export default App;
