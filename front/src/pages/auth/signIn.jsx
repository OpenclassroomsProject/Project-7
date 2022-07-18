import { useEffect } from 'react';

import Index from '../../index';

export default function SingIn() {
    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            document.getElementsByClassName('signin')[0].click();
        }
    });
    return <Index></Index>;
}
