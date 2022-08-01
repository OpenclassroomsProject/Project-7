import React, { useState } from 'react';

function Modal ({ children, className = null }) {
  const [close] = useState(false);

  if (close) {
    return <></>;
  }
  let defaultClassName = 'fixed top-0 left-0 z-50';
  if (className) {
    defaultClassName = className;
  }

  return (
    <div className={defaultClassName + ' h-full w-full  bg-black bg-opacity-50 '}>{children}</div>
  );
}
export default Modal;
