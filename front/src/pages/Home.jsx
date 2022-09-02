// import Header from "../App";
// import React, { useContext } from 'react';
import React, { useEffect, useState } from 'react';
// import { UserContext } from '../App';
// import { ThemeContext } from '../App';
import { addHeaderJWT } from '../components/fetch/addHeaderJWT';
import { server } from '../server';
import PostTemplate from '../components/pages/post/PostTemplate';
import Spinner from '../components/fetch/spinner/Spinner';
// import Page from './../components/templates/_page';
// import _theme from '../components/pages/home/_theme';

export default function Home ({ title }) {
  // const theme = _theme(useContext(ThemeContext));
  // console.log(theme);

  useEffect(() => {
    document.title = title;
  }, [title]);
  const [AllArticles, setArticles] = useState(null);

  const findAllPost = async () => {
    const res = await fetch(server + '/api/post/', { headers: addHeaderJWT() });
    const data = await res.json();
    setArticles(data)
  };

  useEffect(() => {
    findAllPost();
    const { hash } = window.location;
    if (hash !== '') {
      const idPost = hash.replace('#', '');
      const element = document.getElementById(idPost);
      if (element) {
        element.scrollIntoView();
      }
    }

  }, []);

  // const heightTitle = 3.5;
  // const marginTopTitle = 1;
  // const marginBottomTitle = 0.5;
  // const total = heightTitle + marginTopTitle + marginBottomTitle;

  const AllPost = ()=>{
    if(AllArticles === null) return <Spinner className="mt-2"/>;
    if(AllArticles.length === 0) return <div className=' border mt-2 bg-white w-full flex items-center justify-center h-40 text-[#aaa] '> <h2 className=''>Aucune acitivité</h2> </div>
    return AllArticles.map((data)=>(<PostTemplate {...data} key={data._id} />));

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

      {/* </main>
      </div> */}
    </>
  );
}
