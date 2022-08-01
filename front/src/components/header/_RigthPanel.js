
import React, { useEffect } from 'react';

export default function RightPanel ({ children, visible, unmount }) {
  let className = 'rightPanel';
  if (!visible) {
    className += ' close';
  }
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        // unmount();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, unmount]);
  return (
    <>
      <style>{`
                .rightPanel.close {
                    animation: closeLogPannel 1s;
                    animation-fill-mode: forwards;
                }

                @keyframes closeLogPannel {
                    0% {
                        margin-right: 0;
                    }
                    100% {
                        margin-right: -15rem;
                    }
                }
                .rightPanel {
                    animation: showLogPannel 1s;
                    animation-fill-mode: forwards;
                }
                @keyframes showLogPannel {
                    0%{
                    margin-right: -15rem;

                    }
                    100% {
                        margin-right: 0;
                    }
                }
            `}</style>
      <div
        className={`hidden ${className} w-60 -mr-80  bg-gray-200 text-black h-screen z-[100] overflow-hidden sm:flex p-auto justify-center `}>
        {children}
      </div>
    </>
  );
}
