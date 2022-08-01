// import Header from "../App";
// import React, { useContext } from 'react';
import React, { useEffect, useState } from 'react';
// import { UserContext } from '../App';
// import { ThemeContext } from '../App';
import { addHeaderJWT } from '../components/fetch/addHeaderJWT';
import { server } from '../server';
import PostTemplate from '../components/pages/post/PostTemplate';
// import Page from './../components/templates/_page';
// import _theme from '../components/pages/home/_theme';

export default function Home ({ title }) {
  // const theme = _theme(useContext(ThemeContext));
  // console.log(theme);

  useEffect(() => {
    document.title = title;
  }, [title]);
  const [AllArticles, setArticles] = useState();

  const findAllPost = async (cb) => {
    const res = await fetch(server + 'api/post/', { headers: addHeaderJWT() });
    const data = await res.json();

    const { hash } = window.location;
    if (hash !== '') {
      const idPost = hash.replace('#', '');
      const element = document.getElementById(idPost);
      if (element) {
        element.scrollIntoView();
      }
    }
    cb(data);
  };

  useEffect(() => {
    findAllPost((data) => {
      const Articles = [];
      if (data[0]) {
        data.forEach((post) => {
          Articles.push(<PostTemplate {...post} key={post._id} />);
        });
        // @ts-ignore
        setArticles(Articles);
      }
    });
  }, []);

  // const heightTitle = 3.5;
  // const marginTopTitle = 1;
  // const marginBottomTitle = 0.5;
  // const total = heightTitle + marginTopTitle + marginBottomTitle;

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
        <main className="mb-12 pb-2   ">{AllArticles}</main>
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
