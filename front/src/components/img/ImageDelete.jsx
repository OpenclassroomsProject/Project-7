/* eslint-disable multiline-ternary */
import React, { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
export default function ImageDelete (props) {
  const { closeIMG, className, edit = false, src, alt } = props;
  const deleteImg = () => {
    alert('are you sure?');
    closeIMG();
  };
  const style = {
    desktop: 'sm:-translate-x-[calc(0.75rem)] sm:-translate-y-[0.75rem]  sm:h-6 sm:w-6 z-10  '
  };
  // const Image = useMemo(() => {
  //   // const Images = Children.map(children, (child) => {
  //   //   if (child) {
  //   //     const classNameImg = child.props.className ? child.props.className : undefined;
  //   //     // const IMG = (

  //   //     // );
  //   //     return cloneElement(child, { className: classNameImg });
  //   //   }
  //   // });

  //   return <></>;
  // }, [children]);
  const Image = useMemo(
    function Image () {
      return <img src={src} alt={alt} className={'h-full'} />;
    },
    [src, alt]
  );
  return (
    <>
      <div className={className + ' relative'}>
        {edit ? (
          <FontAwesomeIcon
            icon={faXmark}
            className={
              'absolute h-3 w-3 translate-x-[-0.45rem]  -translate-y-[0.5rem] cursor-pointer bg-tertiary-black text-white hover:text-primary-red rounded-full p-[0.1rem]  ' +
              style.desktop
            }
            onClick={deleteImg}
          />
        ) : (
          false
        )}
        {Image}
      </div>
    </>
  );
}
