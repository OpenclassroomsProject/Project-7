import React, { createContext, useContext } from 'react';
import themeDark from '../../components/pages/setting/_themeDark';
import themeLight from '../../components/pages/setting/_themeLight';
import themeRed from '../../components/pages/setting/_themeRed';

export const ThemeContext = createContext({ themeName: 'light', ...themeLight, setTheme: undefined });

export default function Setting () {
  const themeContext = useContext(ThemeContext);
  console.log(themeContext);
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

  return (
        <>
            <div className='title'>
                <h1> Paramètres </h1>
            </div>
            <div className='flex text-center items-center'>
                <h2> Thèmes : </h2>
                <select
                    defaultValue={themeContext.themeName}
                    onChange={switchTheme}
                    className={` rounded-full  ml-1 p-2 ${theme.select}`}
                >
                    <option value='light'>Light</option>
                    <option value='dark'>Dark</option>
                    <option value='red'>Red</option>
                </select>
            </div>
        </>
  );
}
