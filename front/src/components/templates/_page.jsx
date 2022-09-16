import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { server } from '../../server';
import Avatar from '../avatar/_Avatar';
import NavMessaging from '../messaging/_NavMessaging';

export default function Page ({ children, theme = undefined , className =''}) {
  const userContext = useContext(UserContext)
  return( 
    <div className={` bg-[#f3f2ef]  ${className}  h-screen overflow-y-scroll overflow-x-hidden `}>
      {children}
    </div>
  );
}
