import {  useEffect } from 'react';
import userOnMobile from './_detectMobile';

export default function RightPanel({ children, visible, unmount }) {
    let className = 'rightPanel';
    if (!visible) {
        className += ' close';
    }

    function close(e) {
        if (e.target.closest('.rightPanel') || e.target.closest('nav')) return window.addEventListener('click', close, { once: true, capture: true });
        if (document.getElementsByClassName('rightPanel')[0]) {
            return unmount(false);
        }
    }

    window.addEventListener('click', close, { once: true, capture: true });

    // useEffect(() => {
    // window.onresize = () => {
    //     if (window.innerWidth > 500) {
    //         console.log(window.innerWidth);
    //         document.getElementsByClassName('rightPanel')[0].classList.add('desktop');
    //     }else{

    //     }
    // };

    // }, []);
    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => {
                unmount();
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [visible, unmount]);

    // useEffect(() => {
    //     return () => {
    //         window.removeEventListener('click', close);
    //     };
    // }, []);

    return (
        console.log('rendre_panel'),
        (
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
                    margin-right: ${userOnMobile() ? '-75vw' : '-25vw'};
                }
            }
            `}</style>
                <div className={`${className} sm:flex sm:mr-[-25vw] bg-gray-200 text-black h-screen z-[1] sm:w-[25vw] overflow-hidden justify-center w-[75vw]  mr-[-75vw] `}>
                    {children}

                    {/* {showChlidren && children} */}
                </div>
            </>
        )
    );
}
