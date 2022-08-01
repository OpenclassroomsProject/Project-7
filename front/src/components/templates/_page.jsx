import React from 'react';

export default function Page ({ children, theme = undefined }) {
  return (
    <div className={`  bg-[#d7d3ce] min-h-[calc(100vh-3rem)]  ${theme || ''}  `}>
      {children}
      {/* <div className='body'>{children}</div> */}
    </div>
  );
}
