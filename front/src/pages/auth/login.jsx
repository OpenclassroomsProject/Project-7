import { useEffect } from 'react';

import Index from '../../index';

export default function Login() {
    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            document.getElementsByClassName('login')[0].click();
        }
    });
    return <Index></Index>;
}
