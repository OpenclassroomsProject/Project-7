// import Header from "../App";
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { UserContext } from '../App';
// import { ThemeContext } from '../App';
import { addHeaderJWT } from '../components/fetch/addHeaderJWT';
import { server } from '../server';
import PostTemplate from '../components/pages/post/PostTemplate';
// import Page from './../components/templates/_page';
// import _theme from '../components/pages/home/_theme';

export default function Home({ title }) {
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
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView();
            }
        }
        cb(data);
    };

    useEffect(() => {
        findAllPost((data) => {
            let Articles = [];
            if (data[0])
                data.forEach((post) => {
                    Articles.push(<PostTemplate {...post} key={post._id} />);
                });
            // @ts-ignore
            setArticles(Articles);
        });
    }, []);

    // const heightTitle = 3.5;
    // const marginTopTitle = 1;
    // const marginBottomTitle = 0.5;
    // const total = heightTitle + marginTopTitle + marginBottomTitle;

    return (
        <>
            {/* <div className='pageSecondaryPink  '>
        <main className='mainContent'> */}

            <div className='mb-12 pb-2'>{AllArticles}</div>

            {/* </main>
      </div> */}
        </>
    );
}
