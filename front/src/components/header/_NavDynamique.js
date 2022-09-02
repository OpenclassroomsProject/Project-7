import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import {  UserContext } from '../../App';

import NavConnected from "./_NavConnected";




export function Logo({className}){
        return (
          <Link
            to="/"
            className={"flex mr-10 sm:m-0 sm:p-0 h-full  "+ className}
            onClick={() => {
              // @ts-ignore
            //   setPageActive({ home: true });
            }}>
            <svg
              className="cursor-pointer "
              data-v-5f19e91b=""
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 485 78">
              <g
                data-v-5f19e91b=""
                id="35fa3215-a46c-2dc7-0ca7-44149903aade"
                fill="currentColor"
                transform="matrix(4.569687698175228,0,0,4.569687698175228,96.32992012448554,-2.2310693714669583)">
                <path d="M5.41 12.67L5.41 12.67Q3.23 12.67 1.76 11.20L1.76 11.20L1.76 11.20Q0.29 9.73 0.29 7.53L0.29 7.53L0.29 7.53Q0.29 5.37 1.76 3.89L1.76 3.89L1.76 3.89Q3.23 2.42 5.41 2.42L5.41 2.42L5.41 2.42Q7.60 2.42 9.17 3.79L9.17 3.79L7.81 5.28L7.81 5.28Q6.76 4.46 5.41 4.46L5.41 4.46L5.41 4.46Q4.03 4.47 3.18 5.33L3.18 5.33L3.18 5.33Q2.34 6.18 2.34 7.51L2.34 7.51L2.34 7.51Q2.34 8.94 3.19 9.78L3.19 9.78L3.19 9.78Q4.04 10.62 5.42 10.62L5.42 10.62L5.42 10.62Q6.53 10.62 7.12 10.19L7.12 10.19L7.12 8.43L5.76 8.44L5.76 6.52L9.17 6.52L9.17 11.31L9.17 11.31Q7.61 12.67 5.41 12.67L5.41 12.67ZM12.84 5.83L12.84 6.59L12.84 6.59Q13.58 5.84 14.63 5.84L14.63 5.84L14.63 5.84Q14.96 5.84 15.26 5.89L15.26 5.89L14.96 7.78L14.96 7.78Q14.63 7.48 14.01 7.46L14.01 7.46L14.01 7.46Q13.31 7.51 12.84 8.47L12.84 8.47L12.84 12.67L10.93 12.67L10.93 6.04L12.84 5.83ZM19.61 12.74L19.61 12.74Q18.12 12.74 17.12 11.74L17.12 11.74L17.12 11.74Q16.13 10.74 16.13 9.26L16.13 9.26L16.13 9.26Q16.13 7.77 17.12 6.77L17.12 6.77L17.12 6.77Q18.12 5.77 19.61 5.77L19.61 5.77L19.61 5.77Q21.10 5.77 22.10 6.77L22.10 6.77L22.10 6.77Q23.10 7.77 23.10 9.26L23.10 9.26L23.10 9.26Q23.10 10.75 22.10 11.74L22.10 11.74L22.10 11.74Q21.10 12.74 19.61 12.74L19.61 12.74ZM19.61 11.09L19.61 11.09L19.61 11.09Q20.38 11.09 20.87 10.56L20.87 10.56L20.87 10.56Q21.36 10.04 21.36 9.26L21.36 9.26L21.36 9.26Q21.36 8.48 20.87 7.96L20.87 7.96L20.87 7.96Q20.38 7.43 19.60 7.43L19.60 7.43L19.60 7.43Q18.83 7.43 18.34 7.96L18.34 7.96L18.34 7.96Q17.86 8.48 17.86 9.26L17.86 9.26L17.86 9.26Q17.86 10.04 18.34 10.56L18.34 10.56L18.34 10.56Q18.83 11.09 19.61 11.09ZM28.52 10.25L28.52 10.25L28.52 5.83L30.43 5.83L30.43 12.67L28.52 12.67L28.52 12.05L28.52 12.05Q27.83 12.67 26.88 12.67L26.88 12.67L26.88 12.67Q25.58 12.67 24.90 11.88L24.90 11.88L24.90 11.88Q24.21 11.09 24.21 10.07L24.21 10.07L24.21 5.83L26.13 5.83L26.13 9.59L26.13 9.59Q26.13 10.27 26.47 10.65L26.47 10.65L26.47 10.65Q26.81 11.03 27.50 11.05L27.50 11.05L27.50 11.05Q28.10 11.01 28.52 10.25ZM33.97 15.55L32.06 15.54L32.06 6.04L33.97 5.83L33.97 6.38L33.97 6.38Q34.74 5.83 35.48 5.83L35.48 5.83L35.48 5.83Q37.05 5.83 37.97 6.86L37.97 6.86L37.97 6.86Q38.90 7.88 38.90 9.25L38.90 9.25L38.90 9.25Q38.90 10.62 37.97 11.64L37.97 11.64L37.97 11.64Q37.05 12.67 35.48 12.67L35.48 12.67L35.48 12.67Q34.45 12.60 33.97 12.11L33.97 12.11L33.97 15.55ZM33.97 8.63L33.97 8.63L33.97 9.74L33.97 9.74Q34.11 10.89 35.41 11.09L35.41 11.09L35.41 11.09Q37.05 10.96 37.26 9.39L37.26 9.39L37.26 9.39Q37.19 7.47 35.41 7.40L35.41 7.40L35.41 7.40Q34.11 7.61 33.97 8.63ZM43.35 12.74L43.35 12.74Q41.86 12.74 40.87 11.74L40.87 11.74L40.87 11.74Q39.87 10.74 39.87 9.26L39.87 9.26L39.87 9.26Q39.87 7.77 40.87 6.77L40.87 6.77L40.87 6.77Q41.86 5.77 43.35 5.77L43.35 5.77L43.35 5.77Q44.84 5.77 45.84 6.77L45.84 6.77L45.84 6.77Q46.84 7.77 46.84 9.26L46.84 9.26L46.84 9.26Q46.84 10.75 45.84 11.74L45.84 11.74L45.84 11.74Q44.84 12.74 43.35 12.74L43.35 12.74ZM43.35 11.09L43.35 11.09L43.35 11.09Q44.13 11.09 44.61 10.56L44.61 10.56L44.61 10.56Q45.10 10.04 45.10 9.26L45.10 9.26L45.10 9.26Q45.10 8.48 44.61 7.96L44.61 7.96L44.61 7.96Q44.13 7.43 43.34 7.43L43.34 7.43L43.34 7.43Q42.57 7.43 42.08 7.96L42.08 7.96L42.08 7.96Q41.60 8.48 41.60 9.26L41.60 9.26L41.60 9.26Q41.60 10.04 42.08 10.56L42.08 10.56L42.08 10.56Q42.57 11.09 43.35 11.09ZM50.03 8.30L50.03 8.30L50.03 12.67L48.11 12.67L48.11 6.04L50.03 5.83L50.03 6.44L50.03 6.44Q50.67 5.84 51.67 5.84L51.67 5.84L51.67 5.84Q52.96 5.84 53.65 6.62L53.65 6.62L53.65 6.62Q54.40 5.84 55.90 5.84L55.90 5.84L55.90 5.84Q57.20 5.84 57.89 6.62L57.89 6.62L57.89 6.62Q58.57 7.41 58.57 8.44L58.57 8.44L58.57 12.67L56.66 12.67L56.66 8.91L56.66 8.91Q56.66 8.23 56.35 7.85L56.35 7.85L56.35 7.85Q56.04 7.48 55.35 7.46L55.35 7.46L55.35 7.46Q54.78 7.50 54.37 8.21L54.37 8.21L54.37 8.21Q54.33 8.42 54.33 8.64L54.33 8.64L54.33 12.67L52.42 12.67L52.42 8.91L52.42 8.91Q52.42 8.23 52.11 7.85L52.11 7.85L52.11 7.85Q51.80 7.48 51.11 7.46L51.11 7.46L51.11 7.46Q50.48 7.50 50.03 8.30ZM61.14 7.82L60.39 6.66L60.39 6.66Q61.69 5.84 63.40 5.84L63.40 5.84L63.40 5.84Q64.63 5.84 65.34 6.52L65.34 6.52L65.34 6.52Q66.06 7.21 66.06 8.57L66.06 8.57L66.06 12.67L64.15 12.67L64.15 12.13L64.15 12.13Q63.31 12.67 62.64 12.67L62.64 12.67L62.64 12.67Q61.28 12.67 60.59 12.09L60.59 12.09L60.59 12.09Q59.91 11.51 59.91 10.49L59.91 10.49L59.91 10.49Q59.91 9.53 60.56 8.78L60.56 8.78L60.56 8.78Q61.20 8.03 62.64 8.03L62.64 8.03L62.64 8.03Q63.31 8.03 64.15 8.44L64.15 8.44L64.15 8.23L64.15 8.23Q64.13 7.48 63.05 7.41L63.05 7.41L63.05 7.41Q61.82 7.41 61.14 7.82L61.14 7.82ZM64.15 10.62L64.15 10.62L64.15 9.85L64.15 9.85Q63.88 9.32 62.85 9.32L62.85 9.32L62.85 9.32Q61.62 9.46 61.55 10.28L61.55 10.28L61.55 10.28Q61.62 11.09 62.85 11.16L62.85 11.16L62.85 11.16Q63.88 11.16 64.15 10.62ZM69.69 8.33L69.69 8.33L69.69 12.67L67.77 12.67L67.77 6.04L69.69 5.83L69.69 6.45L69.69 6.45Q70.38 5.84 71.33 5.84L71.33 5.84L71.33 5.84Q72.63 5.84 73.31 6.62L73.31 6.62L73.31 6.62Q73.99 7.41 73.99 8.44L73.99 8.44L73.99 12.67L72.08 12.67L72.08 8.91L72.08 8.91Q72.08 8.23 71.74 7.85L71.74 7.85L71.74 7.85Q71.39 7.48 70.70 7.46L70.70 7.46L70.70 7.46Q70.11 7.50 69.69 8.33ZM77.51 12.67L75.60 12.67L75.60 5.83L77.51 5.83L77.51 12.67ZM75.53 4.20L75.53 4.20L75.53 4.20Q75.53 4.61 75.80 4.88L75.80 4.88L75.80 4.88Q76.08 5.15 76.56 5.15L76.56 5.15L76.56 5.15Q77.03 5.15 77.31 4.88L77.31 4.88L77.31 4.88Q77.58 4.61 77.58 4.20L77.58 4.20L77.58 4.20Q77.58 3.79 77.31 3.51L77.31 3.51L77.31 3.51Q77.03 3.23 76.54 3.23L76.54 3.23L76.54 3.23Q76.08 3.23 75.80 3.51L75.80 3.51L75.80 3.51Q75.53 3.79 75.53 4.20ZM80.06 7.82L79.31 6.66L79.31 6.66Q80.61 5.84 82.32 5.84L82.32 5.84L82.32 5.84Q83.55 5.84 84.27 6.52L84.27 6.52L84.27 6.52Q84.98 7.21 84.98 8.57L84.98 8.57L84.98 12.67L83.07 12.67L83.07 12.13L83.07 12.13Q82.24 12.67 81.57 12.67L81.57 12.67L81.57 12.67Q80.20 12.67 79.52 12.09L79.52 12.09L79.52 12.09Q78.83 11.51 78.83 10.49L78.83 10.49L78.83 10.49Q78.83 9.53 79.48 8.78L79.48 8.78L79.48 8.78Q80.12 8.03 81.57 8.03L81.57 8.03L81.57 8.03Q82.23 8.03 83.07 8.44L83.07 8.44L83.07 8.23L83.07 8.23Q83.06 7.48 81.98 7.41L81.98 7.41L81.98 7.41Q80.75 7.41 80.06 7.82L80.06 7.82ZM83.07 10.62L83.07 10.62L83.07 9.85L83.07 9.85Q82.80 9.32 81.77 9.32L81.77 9.32L81.77 9.32Q80.54 9.46 80.47 10.28L80.47 10.28L80.47 10.28Q80.54 11.09 81.77 11.16L81.77 11.16L81.77 11.16Q82.80 11.16 83.07 10.62Z"></path>
              </g>
              <g
                data-v-5f19e91b=""
                id="c3a0a99d-5b99-a49f-d46f-4168a2d07e26"
                transform="matrix(0.9288891262478298,0,0,0.9288891262478298,183.17781124538936,-199.52452538383787)"
                stroke="none"
                fill="currentColor">
                <switch>
                  <g>
                    <path d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"></path>
                  </g>
                </switch>
              </g>
            </svg>
          </Link>
        )
}



export default function NavDynamique(){
    const userContext = useContext(UserContext);


    const NavVisitors = ()=>{
        const Button = ({to, children,className})=>{
            return  <Link className={"py-2 px-4  rounded-full mr-2 "+ className} to={to}>{children}</Link>
        }
        return  (
        <>
            <Logo className={' h-full w-[50%] sm:p-3'}/>
            <div>
              <Button to='Login'>Login</Button>
              <Button to="SignIn" className='border'>SignIn</Button>
            </div>
        </>)
    }

    return (<> 
        <nav className="flex flex-row-reverse sm:flex-row items-center h-full w-full justify-between ">
            {userContext.userData?
                  <NavConnected userContext={userContext}/>
            :
                <NavVisitors/>
            }
        </nav>
        </>
    )
}