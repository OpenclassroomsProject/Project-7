import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { server } from '../../server';
import { addHeaderJWT } from '../../components/fetch/addHeaderJWT';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../App';
import ImageDelete from '../../components/img/ImageDelete';
// import postTemplate from './post/_template';
import UnixToDate from '../../components/date/UnixToDate';
// import Page from '../../components/templates/_page';
import LikedCounter from '../../components/pages/post/_like&dislikeCounter';
import Description from './../../components/pages/post/_description';
import { ThemeContext } from '../profil/Setting';

export default function GetFormId() {
    const themeContext = useContext(ThemeContext);
    // @ts-ignore
    const { userData } = useContext(UserContext);
    const [Post, setPost] = useState(null);
    const [ClickEditPost, setClickEditPost] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (!Post) {
            const myHeaders = addHeaderJWT();
            let init = { method: 'GET', headers: myHeaders, mode: 'cors' };

            // @ts-ignore
            fetch(server + 'api/post/' + id, init)
                .then((res) => {
                    return res.json();
                })
                .then((post) => {
                    if (post.error) window.location.href = '/';
                    if (post) {
                        if (post.createBy === userData.id) post.admin = true;

                        const userAlreadyLike = () => {
                            let result = null;
                            const like = post.usersLiked;
                            const dislike = post.usersDisliked;
                            if (Array.isArray(like) && Array.isArray(dislike)) {
                                like.forEach((idLiked) => {
                                    if (idLiked === userData.id) {
                                        // console.log('ici');
                                        result = 1;
                                    }
                                });

                                dislike.forEach((idDislike) => {
                                    console.log(idDislike);
                                    console.log(userData.id);
                                    if (idDislike === userData.id) {
                                        console.log('ici');
                                        result = -1;
                                    }
                                });
                            }

                            return result;
                        };
                        post.userLike = userAlreadyLike();
                        setPost(post);
                    }
                });
        } else {
            switch (Post.userLike) {
                case 1:
                    console.log('User like');
                    break;
                case -1:
                    console.log('user dislike');

                    break;
                default:
                    console.log('user no vote');

                    break;
            }
        }
    }, [Post, id, userData]);
    const style = {
        icon: 'h-full w-10  flex sm:w-8 items-center cursor-pointer',
        RightBtn: 'h-7 cursor-pointer',
    };
    const HandleForm = ({ className, children, style }) => {
        if (ClickEditPost)
            return (
                <form className={className} style={style}>
                    {children}
                </form>
            );
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    };

    return (
        <>
            <div
                className={` title ${themeContext.header.background} text-${themeContext.header.fontColor} `}
                style={{ justifyContent: 'space-between' }}
            >
                {ClickEditPost ? (
                    <div className={style.icon + ''}>
                        <FontAwesomeIcon
                            className='h-[60%]'
                            icon={faXmark}
                            onClick={() => {
                                setClickEditPost(false);
                            }}
                        />
                    </div>
                ) : (
                    <Link to={'/#' + id} className={style.icon}>
                        <FontAwesomeIcon className='h-8 ' icon={faArrowLeft} />
                    </Link>
                )}

                <h1 className=''>{Post && Post.title}</h1>
                <div className={style.icon + ' justify-end'}>
                    {Post && Post.admin ? (
                        <FontAwesomeIcon
                            className={style.RightBtn}
                            icon={ClickEditPost ? faCheck : faPenToSquare}
                            onClick={() => setClickEditPost(!ClickEditPost)}
                        />
                    ) : (
                        false
                    )}
                </div>
            </div>

            <HandleForm className=' body' style={undefined}>
                <ImageDelete
                    className=' w-80 sm:20vw'
                    edit={ClickEditPost}
                    src={Post ? server + 'images/' + Post.createBy + '/' + Post.imagesUrl : undefined}
                    alt='post'
                />
                <span className='text-xs mb-2'>
                    « Crée par {Post && Post.createByPseudo}, le  {Post && UnixToDate(Post.date)}»
                </span>
                <LikedCounter Post={Post} setPost={setPost} />
                <Description edit={ClickEditPost}> {Post && Post.textArea}</Description>
            </HandleForm>
        </>
    );
}
