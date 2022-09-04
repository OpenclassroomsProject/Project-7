import { useState, useContext, memo } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouseChimney, faBell, faPlus, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../auth/_logout';
import { Logo } from "../Header";

import { ThemeContext } from "../../../pages/profil/Settings";


const Connected = ({userContext}) => {
    const [ClickProfil, setClickProfil] = useState(false);
    const [ClickBell, setClickBell] = useState(false);
    const responsiveContext = useContext(ResponsiveContext)
    
    const cssButton ='  cursor-pointer w-10  h-10 sm:border-[2px] sm:flex justify-center items-center  rounded-full overflow-hidden ';
    const style = {
      button: cssButton,
      buttonPush: cssButton + 'border-primary-red text-secondary-pink shadow-xl sm:border-[4.01px]',
      // hover:[shadow-xl, p-1.5, border-[4px]]
      buttonHover:
        'sm:hover:border-[3px] hover:shadow-xl  hover:border-secondary-pink hover:text-secondary-pink ',
      iconButton: 'p-2'
    };
    const PreviewAvatar = ()=>{
      return(
        <button
        className={` flex sm:w-24  items-center justify-between  ${
          ClickProfil ? style.buttonPush : style.button + style.buttonHover
        } `}
        onClick={() => {
          if(!responsiveContext.state.mobile)
          return setClickProfil(!ClickProfil)}}
          >
          <div className={'h-full w-full sm:w-[40%] p-[1px] sm:p-1'}>
          <ProfilPicture src={urlAvatar}/>
          </div>
          <div className="mr-auto hidden sm:block">Profil</div>
       </button>
      )
    }
    const Option = ()=>{
      return(
        <div className=" hidden sm:flex absolute bg-white w-60 h-28 top-16 right-10 rounded   flex-col  shadow-2xl z-10 border border-black border-opacity-[15%]">
          <div className="w-full  h-full flex justify-around items-center ">
            {/* <div className="flex"> */}
            <Link to='/post/create' className={`${style.button} ${style.buttonHover} `}>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
            <Link to='/profil' className={`${style.button} ${style.buttonHover}`}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link to='/profil/settings' className={`${style.button} ${style.buttonHover}`}>
              <FontAwesomeIcon icon={faGear} />
            </Link>
            {/* </div> */}
          </div>
          <button className="bg-white text-tertiary-black h-10 p-2  rounded-sm border-t" onClick={(e)=>{ logOut(userContext)}}>
            Déconexion
          </button>
        </div>
      )
    }

    const NavBottom = ()=>{
      const [pageActive, setPageActive] = useState(false);

      const themeContext = useContext(ThemeContext);
      const class_buttonMobile = 'cursor-pointer w-10 h-10  flex justify-center items-center';

      return(
      <>
                {/* ============================ Nav mobile bottom ============================== */}
           {userContext.userData?
          <nav
            className={`fixed z-20 bottom-0 left-0  w-full h-12 border-t-[1px] flex items-center justify-around sm:hidden 
                  ${themeContext.header.background + ' ' + themeContext.header.fontColor.secondary}`}>
            <Link
              to="/"
              // @ts-ignore
              className={`${class_buttonMobile} ${pageActive.home && 'text-black'}`}
              onClick={() => {
                // @ts-ignore
                // setPageActive({ home: true });
              }}>
              <FontAwesomeIcon icon={faHouseChimney} height="60%" />
            </Link>

            <Link
              to={
                !userContext.userData
                  ? '/login'
                  : '/profil/'
              }
              className={`${class_buttonMobile} ${pageActive.profil && 'text-black'}`}
              onClick={() => {
                // @ts-ignore
                // setPageActive({ profil: true });
              }}>
              <div className={`${class_buttonMobile}`}>
                <FontAwesomeIcon icon={faUser} height="60%" />
              </div>
            </Link>

            <Link
              // @ts-ignore
              to={!userContext.userData ? '/login' : '/post/create'}
              className={`${class_buttonMobile} `}>
              {/* <FontAwesomeIcon className='text-tertiary-black h-8' icon={faPlus} height='90%' /> */}
              <svg
                className=" h-[70%]  "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="post-fill-medium"
                data-supported-dps="24x24"
                fill="currentColor">
                <path d="M18 3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3zm-5 8h4v2h-4v4h-2v-4H7v-2h4V7h2z"></path>
              </svg>
            </Link>

          {/*  */}
            <Link to={'/notifications'}>
              <FontAwesomeIcon icon={faBell}/>
            </Link>
            <Link
              // @ts-ignore
              to={!userContext.userData ? '/login' : './profil/settings'}
              // @ts-ignore
              className={`${class_buttonMobile} ${pageActive.settings ? 'text-black' : ''}  `}
              // onClick={() => {
              //   // @ts-ignore
              //   setPageActive({ settings: true });
              // }}
              >
              <FontAwesomeIcon icon={faGear} height="100%" />
            </Link>
          </nav>
         :false}
         
        {/* ============================== End nav mobile  ============================== */}
      </>
      )
    }
    const SearchBar = ()=>{
      return (
        <div className="flex items-center justify-center h-full max-w-[60%] w-full sm:max-w-[25%]">
          <FontAwesomeIcon icon={faSearch} className='relative  left-6'/>
          <input type="text absolute" className="bg-[#CBD5E1] bg-opacity-30 h-full p-1 w-full px-8"></input>
        </div>
      )
    }




    const ProfilPicture = memo(function ProfilPicture({ src }) {
      return <img src={src} className="rounded-full h-full"   height={'100%'} alt="user profil" />;
    });

    const url = window.location.origin.split(':')
    const urlAvatar = url[0]+':'+url[1]+":3001"+userContext.userData.Avatar

    return (
        // ========================================== Nav top  =================================================
    <>
      <Logo className={'hidden sm:flex sm:w-52 '}/>
      {/* <ButtonNotif className='flex sm:hidden border-[#e5e7eb] border-2'/> */}
      <Link
              // @ts-ignore
              to={!userContext.userData ? '/login' : '/messagerie'}
              // @ts-ignore
              className={`text-black w-[10vw]`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="messages-medium"
                data-supported-dps="24x24"
                fill="#aaaa"
                >
                <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
              </svg>
      </Link>

      <SearchBar/>
      <div className="flex">
        <Link to="/" className={style.button + 'hidden'}>
            <FontAwesomeIcon className={style.iconButton} icon={faHouseChimney} height="100%" width="100%" />
        </Link>

        <button
              className={`${
                ClickBell ? style.buttonPush : style.button + style.buttonHover
              } mr-2 ml-2 hidden sm:flex' `}
              onClick={() => setClickBell(!ClickBell)}>
              <FontAwesomeIcon className={style.iconButton} icon={faBell} height="100%" />
        </button>
          
        <PreviewAvatar>Profil</PreviewAvatar>
      </div>
      {/* ================ OTION WHEN CLICK PROFIL ON DESKTOP ================*/}
      {ClickProfil ? <Option/>: false }

      <NavBottom/>
    </>
      // ========================================== End nav top  =================================================
      );
    };
export default Connected 