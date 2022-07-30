import React, { createRef, useState } from 'react';
import ImageDelete from '../../img/ImageDelete';

const ChoseIMG = ({ setImage }) => {
  const fileRef = createRef();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage({ File: i, URL: URL.createObjectURL(i) });
    }
  };

  return (
    <>
      <button
        className="p-4 cursor-pointer"
        onClick={() => {
          fileRef.current.click();
        }}>
        <svg viewBox="0 0 24 24" data-supported-dps="24x24" className="icon fill-gray-600 h-6 w-6 ">
          <path d="M16 13a4 4 0 11-4-4 4 4 0 014 4zm6-4v11H2V9a3 3 0 013-3h1.3l1.2-3h9l1.2 3H19a3 3 0 013 3zm-5 4a5 5 0 10-5 5 5 5 0 005-5z"></path>
        </svg>
      </button>
      <input type="file" className={'w-0'} ref={fileRef} onChange={uploadToClient}></input>
    </>
  );
};
export default ChoseIMG;
