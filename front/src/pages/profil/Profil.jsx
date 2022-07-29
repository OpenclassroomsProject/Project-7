// import Header from "../../App";
// import  from "react";

import React, { useEffect } from 'react';

export default function Profil({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);
    return (
        <>
            {/* <Header/> */}
            <main className='flex flex-col items-center p-4'>
                <h1 className='pb-4'>Mon profil :</h1>
                <p>Lorem </p>
            </main>
        </>
    );
}
