import { useState,useEffect, useContext, memo, createRef, useLayoutEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContext, UserContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouseChimney, faBell, faPlus, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../auth/_logout';
import { Logo } from "../Header";

import { ThemeContext } from "../../../pages/profil/Settings";
import { CacheContext } from "../../../App";
import Avatar from "../../avatar/_Avatar";
import NavMessaging from "../../messaging/_NavMessaging";
import { NavMobile } from "../../../pages/messaging/Messaging";


const initialState = {nav:false};

function reducer(state, action) {
  switch (action.type) {
    case 'messaging':
      // const messaging = !state.messaging? <NavMessaging/> : false
      console.log(action);
      return {...state , nav: "messaging",title : action.title}
    case 'default':
      return {initialState}
    default:
      throw new Error();
  }
}

const Connected = () => {
    const [states , dispatch] = useReducer(reducer,initialState)
    

    const [Nav, setNav] = useState(false);

    const [userContext, updateConntext] = useContext(UserContext)
    const cacheContext = useContext(CacheContext);
    const [ClickProfil, setClickProfil] = useState(false);
    const [ClickBell, setClickBell] = useState(false);

    
    // const responsiveContext = useContext(ResponsiveContext)
  // if(cacheContext){
  //   console.log(cacheContext);
  //   cacheContext
  // }

    const ButtonRef = createRef()
    const cssButton ='  cursor-pointer w-10  h-10 sm:border-[2px] sm:flex justify-center items-center  rounded-full overflow-hidden ';
    const style = {
      button: cssButton,
      buttonPush: cssButton + 'border-primary-red text-secondary-pink shadow-xl sm:border-[4.01px]',
      // hover:[shadow-xl, p-1.5, border-[4px]]
      buttonHover:
        'sm:hover:border-[3px] hover:shadow-xl  hover:border-secondary-pink hover:text-secondary-pink ',
      iconButton: 'p-2'
    };
    function closeProfilOption (){
      if(ClickProfil) return setClickProfil(false)
    }
    cacheContext.value.header = {closeProfilOption : closeProfilOption, updateNav: dispatch  }

    const PreviewAvatar = ()=>{
      
      // useLayoutEffect(()=>{
      //   console.log("resfds");
      // },[])
      return(
        <button ref={ButtonRef}
        className={` flex sm:desktop sm:w-24  items-center justify-between  ${
          ClickProfil ? style.buttonPush : style.button + style.buttonHover
        } `}
        onClick={() => {
          // if(!responsiveContext.state.mobile)
          cacheContext.value.messaging.closeMessaging();
          return setClickProfil(!ClickProfil)

        }}
        >

            <div className="h-full aspect-square p-[0.1rem]">
              <Avatar src={urlAvatar} />
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
            <Link to='/post/create' className={`${style.button} ${style.buttonHover} `} onClick={closeProfilOption}>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
            <Link to='/profil' className={`${style.button} ${style.buttonHover}`} onClick={closeProfilOption}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link to='/profil/settings' className={`${style.button} ${style.buttonHover}`} onClick={closeProfilOption}>
              <FontAwesomeIcon icon={faGear} />
            </Link>
            {/* </div> */}
          </div>
          <button className="bg-white text-tertiary-black h-10 p-2  rounded-sm border-t" onClick={(e)=>{ logOut(updateConntext,e)}}>
            Déconexion
          </button>
        </div>
      )
    }
    const NavBottom = ()=>{
      const themeContext = useContext(ThemeContext);
      const class_buttonMobile = 'cursor-pointer w-10 h-10  flex justify-center items-center';
      const[ active , setPageActive] = useState(null)
      const pageActive = cacheContext.value.pageActive;
      useEffect(() => {
          setPageActive(pageActive);
      }, [pageActive])
      return(
      <>
                {/* ============================ Nav mobile bottom ============================== */}
           {userContext?
          <nav
            className={`fixed z-20 bottom-0 left-0  w-full h-12 border-t-[1px] flex items-center justify-around sm:hidden 
                  ${themeContext.header.background + ' ' + themeContext.header.fontColor.secondary}`}>
            <Link
              to="/"
              // @ts-ignore
              className={`${class_buttonMobile} ${active==="home"? themeContext.header.fontColor.main:themeContext.header.fontColor.secondary}`}
              onClick={() => {
                // @ts-ignore
                // setPageActive({ home: true });
              }}>
              <FontAwesomeIcon icon={faHouseChimney} height="60%" />
            </Link>

            <Link
              to={
                !userContext
                  ? '/login'
                  : '/profil/'
              }
              className={`${class_buttonMobile} ${active==="profil"? themeContext.header.fontColor.main:themeContext.header.fontColor.secondary}`}
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
              to={!userContext ? '/login' : '/post/create'}
              className={`${class_buttonMobile}  `} onClick={()=>{
                cacheContext.value.previousPath.push(window.location.pathname)
              }}>
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
            <Link to={'/notifications'} className={`${cacheContext.value.pageActive==="notifications"? themeContext.header.fontColor.main:themeContext.header.fontColor.secondary}`}>
              <FontAwesomeIcon icon={faBell}/>
            </Link>
            <Link
              // @ts-ignore
              to={!userContext? '/login' : './profil/settings'}
              // @ts-ignore
              className={`${class_buttonMobile} ${cacheContext.value.pageActive==="settings"? themeContext.header.fontColor.main:themeContext.header.fontColor.secondary}`}
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

    const DefaultNav = ()=>{
      return(
        <>
          <Logo className={'hidden sm:flex sm:w-52 '}/>
          
          <Link to={!userContext ? '/login' : '/messagerie'}
            className={`text-black w-10 h-10 sm:hidden`} onClick={(e)=>{
              cacheContext.value.previousPath.push(window.location.pathname)
              // cacheContext.value.previousPath.push(window.location.pathname)
            }}>
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
          {/* {states.Nav&& states.Nav.map(V=><V/></>} */}
          <div className="flex">
              <Link to="/" className={style.button + 'hidden'} onClick={closeProfilOption}>
                  <FontAwesomeIcon className={style.iconButton} icon={faHouseChimney} height="100%" width="100%" />
              </Link>

              <button
                    className={`${
                      ClickBell ? style.buttonPush : style.button + style.buttonHover
                    } mr-2 ml-2 hidden sm:flex' `}
                    onClick={closeProfilOption}>
                    <FontAwesomeIcon className={style.iconButton} icon={faBell} height="100%" />
              </button>
                
              <PreviewAvatar>Profil</PreviewAvatar>
          </div>

          {/* ================ OTION WHEN CLICK PROFIL ON DESKTOP ================*/}
          {ClickProfil ? <Option/>: false }
        </>
      )
    }

    // const ProfilPicture = memo(function ProfilPicture({ src }) {
    //   return <img src={src} className="rounded-full h-full"   height={'100%'} alt="user profil" />;
    // });
    // console.log(userContext);
    const url = window.location.origin.split(':')
    const urlAvatar = url[0]+':'+url[1]+":3001"+userContext.avatar

    function switchNav(state){
      switch (state.nav) {
        case 'messaging':
          console.log(state);
          return <NavMobile title={state.title}/>     
        default:
          break;
      }
    }
    return (
        // ========================================== Nav top  =================================================
    <nav className="flex flex-row-reverse sm:flex-row justify-between w-full h-10">
      {!states.nav?
        <DefaultNav/>
        :
        switchNav(states)
      }
      {states.nav !== 'messaging'?
        <NavBottom/>
      :false
      }
    </nav>
      // ========================================== End nav top  =================================================
      );
    };
export default Connected 