import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouseChimney, faBell, faPlus, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { logOut } from './auth/_logout';
import { Logo } from "./_NavDynamique";


const NavConnected = ({userContext}) => {
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

    const DynamiqueTagProfilPicture = ({children, className, onClick})=>{
      if( responsiveContext.state && responsiveContext.state.mobile ) {
        return <Link to="/profil/options" className={className}>
                {children}
              </Link>
      }
      return <button className={className} onClick={onClick}>
        {children}
      </button>
    }
    const ButtonNotif = ({className})=>{
      return <button
              className={`${
                ClickBell ? style.buttonPush : style.button + style.buttonHover
              } mr-2 ml-2 ${className} `}
              onClick={() => setClickBell(!ClickBell)}>
              <FontAwesomeIcon className={style.iconButton} icon={faBell} height="100%" />
            </button>
    }
    return (
        // ========================================== Nav top  =================================================
      <>
        <Logo className={'hidden sm:flex w-min min-w-[30%] sm:mr-auto'}/>
        {/*=============== Nav top desktop ================*/}
        <ButtonNotif className='flex sm:hidden border-[#e5e7eb] border-2'/>
        {/*=================      Search bar     ================*/}
        <div className="flex items-center justify-center h-full max-w-[60%] w-full sm:max-w-[30%]">
          <FontAwesomeIcon icon={faSearch} className='relative  left-6'/>
          <input type="text absolute" className="bg-[#CBD5E1] bg-opacity-30 h-full p-1 w-full px-8"></input>
        </div>
        {/*=================    End search bar   ================*/}
          <Link to="/" className={style.button + 'hidden'}>
            <FontAwesomeIcon className={style.iconButton} icon={faHouseChimney} height="100%" width="100%" />
          </Link>
          <ButtonNotif className='hidden sm:flex'/>

          
          {/* ================ End nav top desktop ============= */}


          {/*================ Preview Picture ================*/}
            <DynamiqueTagProfilPicture
              className={` flex sm:w-24  items-center justify-between  ${
                ClickProfil ? style.buttonPush : style.button + style.buttonHover
              } `}
              onClick={() => {
                if(!responsiveContext.state.mobile)
                return setClickProfil(!ClickProfil)}}
                >
              <div className={'h-full w-full sm:w-[40%] p-[1px] sm:p-1'}>
                <img
                  className="rounded-full h-full"
                  src="/code.jpg"
                  height={'100%'}
                  alt="user profil"
                  />
              </div>
              <div className="mr-auto hidden sm:block">Profil</div>
            </DynamiqueTagProfilPicture>
          {/* ============= End Preview Picture ============= */}




        
        {/* ================ OTION WHEN CLICK PROFIL ON DESKTOP ================*/}
          {ClickProfil ? (
            <div className=" hidden sm:flex absolute bg-white w-60 h-28 top-16 right-10 rounded   flex-col  shadow-2xl z-10">
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
          ) : (
            false
          )}
          {/* {ClickBell ? <div> ClickBell</div> : false} */}
        {/* ============== END OTION WHEN CLICK PROFIL ON DESKTOP ===============*/}
      </>
      // ========================================== End nav top  =================================================
    );
};
export default NavConnected