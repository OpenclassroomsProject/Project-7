import React from 'react';

export default function Page ({ children, theme = undefined , className}) {
  return( console.log("render page"),
    <div className={`  bg-[#f3f2ef]  ${className}  `}>
      {children}
      {/* <div className='body'>{children}</div> */}
    </div>
  );
}
