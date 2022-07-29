import React from 'react';

export default function Page({ children, theme = undefined }) {
    return (
        <div className={` bg-[#d7d3ce]  ${theme ? theme : ''}`}>
            {children}
            {/* <div className='body'>{children}</div> */}
        </div>
    );
}
