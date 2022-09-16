import React, { createContext, useContext , useEffect } from 'react';
import themeDark from '../../components/setting/_themeDark';
import themeLight from '../../components/setting/_themeLight';
import themeRed from '../../components/setting/_themeRed';
import{ logOut} from '../../components/header/auth/_logout';
import { CacheContext, UserContext } from '../../App';

export const ThemeContext = createContext({ themeName: 'light', ...themeLight, setTheme: undefined });
    ThemeContext.displayName='Theme'

export default function Setting () {
  const cacheContext = useContext(CacheContext)
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext)
  // console.log(themeContext);
  document.title= 'Paramètres du compte'
  if(cacheContext.value.pageActive !== "settings") cacheContext.value.pageActive='settings'


  let theme = {};
  const switchTheme = (/** @type {{ target: { value: any; }; }} */ e) => {
    theme.themeName = e.target.value;

    switch (theme.themeName) {
      case 'dark':
        console.log('Switch theme in dark mode ! ');
        theme = { ...theme, ...themeDark };
        break;
      case 'light':
        console.log('Switch theme in  light mode !');
        theme = { ...theme, ...themeLight };

        theme.select = 'bg-white border-[1px] border-black ';
        break;
      case 'red':
        console.log('switch red theme ');
        theme = { ...theme, ...themeRed };

        theme.select = 'bg-secondary-pink ';
        break;
      default:
        break;
    }

    return themeContext.setTheme({ ...theme });
  };
  const style ={
    input:'border rounded-lg ml-2 mt-4'
  }

  return (
        <main className=' m-2 bg-white flex flex-col  p-4 border' >
          <h1 className='mx-auto text-2xl mb-4' > Paramètres</h1>
          <div className='flex text-center items-center'>
            <label> Thèmes :
              <select defaultValue={themeContext.themeName} onChange={switchTheme} className={`border  rounded-full  ml-1 p-2 ${theme.select}`} >
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
                <option value='red'>Red</option>
              </select>
            </label>
          </div>
          <h2 className='mx-auto text-xl my-4'>Sécurités</h2>
          <form className='bg-gray flex flex-col relative'>
            <label> Adresse email :
              <input type="email" defaultValue={'Test'} autoComplete='username' className={`${style.input}`} />
            </label>
            <label>Mot de passe :
              <input type='password' autoComplete='new-password' defaultValue={'      '} className={`${style.input} text-[#aaaa]`}/>
            </label>
            <label>Retappez votre mot de passe :
              <input type='password' autoComplete='new-password'  defaultValue={'      '} className={`${style.input} text-[#aaaa]`}/>
            </label>
            <button className='px-4 py-2 border rounded-full w-fit m-auto mb-4 mt-4'>Valider </button>
          </form>
          <div className='h-full flex flex-col justify-end'>
            <button onClick={()=>{logOut(userContext[1])}} className='mb-2 h-fit cursor-pointer'> 
              Déconexion
            </button>
          </div>
        </main>
  );
}
