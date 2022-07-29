import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, useState } from 'react';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

function Modal({ children }) {
    const [close, setClose] = useState(false);

    if (close) {
        return <></>;
    }

    return <div className='fixed h-screen w-screen top-0 left-0 z-50 bg-black bg-opacity-50 '>{children}</div>;
}
export default Modal;
