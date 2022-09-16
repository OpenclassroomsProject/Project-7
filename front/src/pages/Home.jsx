// import Header from "../App";
// import React, { useContext } from 'react';
import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../App';
// import { ThemeContext } from '../App';
import { addHeaderJWT } from '../components/fetch/addHeaderJWT';
import { server } from '../server';
import PostTemplate from '../components/post/PostTemplate';
import Spinner from '../components/fetch/spinner/Spinner';
import { CacheContext, UserContext } from '../App';
// import Page from './../components/templates/_page';
// import _theme from '../components/pages/home/_theme';

export default function Home ({ title }) {
  // const theme = _theme(useContext(ThemeContext));
  const [userContext, updateUserContext] = useContext(UserContext);

  const cacheContext= useContext(CacheContext)
  // console.log(cacheContext.value.header);
  const [SpinnerState, setSpinner] = useState(cacheContext.home? false:true);
  
  document.title = title;
  if(cacheContext.value.pageActive !== "home") cacheContext.value.pageActive='home'




  // useEffect(() => {
  //   if(cacheContext.pageActive !== "home") cacheContext.pageActive='home';
  // }, [cacheContext]);

  useEffect(() => {
     // FUNCTIONS

     const findAllPost = async () => {

      if(!userContext._id ) return false;
      const res = await fetch(server + '/api/post/', { headers: addHeaderJWT() });
      if(!res.ok) return false;
      const data = await res.json();
      cacheContext.value.home=data
      setSpinner(false)
    };
    // console.log(cacheContext);    
    if(!cacheContext.value.home ){
      findAllPost();
    }else{
      setSpinner(false)
    }

    const { hash } = window.location;
    if (hash !== '') {
      const idPost = hash.replace('#', '');
      const element = document.getElementById(idPost);
      if (element) {
        element.scrollIntoView();
      }
    }
  },[cacheContext , userContext]);

  // const heightTitle = 3.5;
  // const marginTopTitle = 1;
  // const marginBottomTitle = 0.5;
  // const total = heightTitle + marginTopTitle + marginBottomTitle;

  const AllPost = ()=>{
    if(SpinnerState) return <Spinner className="mt-2"/>;
    if(cacheContext.value.home.length === 0 ) return <div className=' border mt-2 bg-white w-full flex items-center justify-center h-40 text-[#aaa] '> <h2 className=''>Aucune acitivité</h2> </div>

    return cacheContext.value.home.map((data)=>(<PostTemplate {...data} key={data._id} />));
  }
  const Panel = ({ children = undefined, className = '' }) => {
    return <div className={className + ' hidden rounded-lg  ml-10 mr-10 bg-white w-56  flex-col items-center'}>{children}</div>;
  };
  return (
    <>
      <div className="flex justify-center  pt-4  ">

        <Panel className=' h-96 desktop:flex' >
          <h3 className='p-3 h-48'> Profil</h3>
          <div className=' border-t w-full'></div>
        </Panel>

        <main className="mb-28   "><AllPost/></main>

        <Panel className='h-60 tablet:flex' >
          <h2 className='p-2'>Collaborateurs</h2>
          <div className=' border-t w-full'></div>
        </Panel>

      </div>
    </>
  );
}
