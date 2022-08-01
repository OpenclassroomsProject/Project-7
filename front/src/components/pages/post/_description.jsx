import React, { useState } from 'react';
export default function Description ({ edit, children }) {
  const [clickEditDescription, setclickEditDescription] = useState(false);

  const handleClickDescription = () => {
    function close (e) {
      if (!e.target.closest('textarea')) {
        console.log('close');
        window.removeEventListener('click', close);
      }
    }
    window.addEventListener('click', close);
    setclickEditDescription(true);
  };
  return (
        <div
            className={` w-full h-full border-secondary-pink  overflow-y-auto relative rounded-lg  ${
                edit ? 'hover:cursor-pointer' : undefined
            }`}
            onClick={edit ? handleClickDescription : undefined}
        >
            {clickEditDescription && edit && (
                <textarea className='w-full h-full rounded-lg resize-none text-center' defaultValue={children} />
            )}
            {edit && (
                <span className='absolute text-center w-full  top-1/2 -translate-y-1/2 z-10 hover:cursor-pointer '>
                    Cliquez-ici pour modifier !
                </span>
            )}
            <p className={`text-justify h-full ${edit ? '  blur-sm ' : ''}  `}>{children}</p>
        </div>
  );
}
