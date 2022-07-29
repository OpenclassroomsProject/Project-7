import { createElement } from 'react';
import { cloneElement } from 'react';
import { Children, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
export default function ImageDelete({ children, className, edit = false }) {
  const deleteImg = () => {
    alert('are tou sure?');
  };
  const style = {
    desktop:
      'sm:-translate-x-[calc(0.75rem)] sm:-translate-y-[0.75rem]  sm:h-6 sm:w-6 z-10  ',
  };
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
        {Children.map(children, (child) => {
          if (child) {
            const classNameImg = child.props.className
              ? child.props.className
              : undefined;
            // const IMG = (

            // );
            return cloneElement(child, { className: classNameImg });
          }
        })}
      </div>
    </>
  );
}
