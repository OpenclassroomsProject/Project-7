/* eslint-disable camelcase */
/* eslint-disable multiline-ternary */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUpLiked } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
  faShare,
  faEllipsisVertical,
  faThumbsUp as faThumbsUpLiked,
  faTrashCan,
  faPencil,
  faFlag
} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import { addHeaderJWT } from '../../fetch/addHeaderJWT';
import EditPost from '../../../pages/post/Edit';

// const { Link } = require('react-router-dom');
const { server } = require('../../../server');
const UnixToDate = require('../../date/UnixToDate').default;

// @ts-ignore
function PostTemplate ({
  title,
  description,
  _id,
  createBy,
  createByPseudo,
  imagesUrl,
  date,
  likes,
  usersLiked
}) {
  // eslint-disable-next-line camelcase
  const ref_description = useRef();
  const userContext = useContext(UserContext);
  console.log(userContext);
  // @ts-ignore

  const headerFetch = addHeaderJWT();
  const [Unmount, setUnmount] = useState(false);

  // const { title, textArea, _id, createBy, createByPseudo, imagesUrl, date, likes, usersLiked } = props;
  // console.log(likes);

  const [clickOption, setClickOption] = useState(false);
  const [clickEdit, setClickEdit] = useState(false);

  const [allLikes, setAllLikes] = useState(likes);
  // @ts-ignore
  const [userLiked, setUserLike] = useState(
    // @ts-ignore
    usersLiked.indexOf(userContext.userData.id) !== -1
  );
  const [currentDescritpion, setCurrentDescription] = useState(description);
  const [openDescritpion, setOpenDescritpion] = useState(false);
  const [image, setImage] = useState(imagesUrl);

  const [btnMore, setBtnMore] = useState(false);
  const [admin, setAdmin] = useState(false);

  //     let admin = false;
  // if (userData.id === createBy) {
  //     admin = true;
  //   }
  useEffect(() => {
    // @ts-ignore
    if (userContext.userData.id === createBy || userContext.userData.admin) {
      console.log(userContext);
      setAdmin(true);
    } else {
      if (admin) setAdmin(false);
    }
  }, [userContext, createBy, admin]);

  useEffect(() => {
    function convertRemToPixels (rem) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    // @ts-ignore
    if (ref_description.current) {
      // @ts-ignore
      const hauteurDiv = ref_description.current.offsetHeight;
      // @ts-ignore
      const hauteurLigne = convertRemToPixels(parseFloat(ref_description.current.style.lineHeight));
      const nombreLignes = hauteurDiv / hauteurLigne;
      if (nombreLignes > 3) setBtnMore(true);
    }
  }, []);

  useEffect(() => {
    if (clickEdit) {
      // @ts-ignore
      ref_description.current.focus();
    }
  }, [clickEdit]);

  const submitVote = (like = true) => {
    // eslint-disable-next-line default-case
    const action = like ? 'like' : 'dislike';

    return fetch(server + 'api/post/' + action + '/' + _id, {
      headers: headerFetch
    });
  };

  const handleClicklike = () => {
    let like = 0;
    switch (userLiked) {
      case true:
        console.log('click userDislike');
        like--;
        break;

      case false:
        console.log('click user like');
        like++;
        break;
      default:
        break;
    }
    const tmp = allLikes;
    setAllLikes(allLikes + like);
    setUserLike(!userLiked);

    submitVote().then((res) => {
      if (!res.ok) {
        setAllLikes(tmp);
        setUserLike(!userLiked);

        return false;
      }
    });
  };
  const handleClickDeletePost = () => {
    console.log('Suppression en cours ... ');
    fetch(server + 'api/post/delete/' + _id, { headers: headerFetch, method: 'delete' }).then(
      (res) => {
        if (!res.ok) return false;
        setUnmount(true);
      }
    );
  };
  if (Unmount) return <></>;
  return (
    <>
      <section
        className={'relative bg-white flex flex-col mb-2  text-[#5d5c5c]  sm:rounded-xl sm:w-[500px] '}
        id={_id}
        key={_id}>
        <div>
          <div className=" relative pt-3 pl-4 pr-4 text-base">
            <div className="flex items-center ">
              <Link to={'/profil/' + createBy}>
                <img
                  className=" h-10 w-10 mr-2 rounded-full"
                  src="https://media-exp1.licdn.com/dms/image/C4E22AQGYKtm-Dhi1aA/feedshare-shrink_800/0/1658424335481?e=1661990400&v=beta&t=pKYu09XEQppk-vsKaj9Ch1m1maya7m0SasWRafRUbOg"
                  alt="member profil"></img>
              </Link>
              <div className="mr-auto">
                <Link to={'/profil/' + createBy}>
                  <div className=" text-sm font-serif font-semibold text-black">
                    {createByPseudo}
                  </div>
                </Link>
                <div className=" text-xs text-[#aaa]"> {UnixToDate(date)}</div>
              </div>
            </div>

            {btnMore ? (
              <div
                className={` w-fit absolute leading-5  right-0  ${
                  openDescritpion ? 'bottom-0' : 'bottom-[3%]'
                }
                                } z-10  bg-red-600 h-auto`}>
                <button
                  className=" cursor-pointer bg-white  text-[#666]  font-medium   pl-2  pr-6 "
                  // @ts-ignore
                  onClick={() => {
                    setOpenDescritpion(!openDescritpion);
                  }}>
                  {openDescritpion ? 'moins' : '... plus'}
                </button>
              </div>
            ) : (
              false
            )}
            {/* ====================================================   Descritpion   ==================================================== */}
            <Link to={clickEdit ? '/' : '/post/' + _id} className="  ">
              <p
                // eslint-disable-next-line camelcase
                ref={ref_description}
                className={`relative overflow-hidden text-left text-sm mt-4 mb-2  ${
                  !openDescritpion && 'max-h-16  '
                }`}
                style={{ lineHeight: '1.25rem' }}>
                {currentDescritpion}
              </p>
            </Link>
            {/* ==================================================== End Descritpion ==================================================== */}
          </div>
        </div>

        {/* =======================================================  BUTTON  OPTION  ======================================================= */}
        <button
          className="absolute right-2 top-2 text-[#aaa] cursor-pointer p-2 pl-4 pr-4  "
          onClick={() => setClickOption(!clickOption)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>

        {clickOption ? (
          <div className="absolute bg-white  z-10  right-0 top-14 flex   flex-col shadow-2xl items-start  font-semibold pt-2 pb-2 border-[1px] ">
            {admin ? (
              <>
                <button
                  className="pr-8 pl-4 leading-[3rem] mr-auto"
                  onClick={() => {
                    setClickEdit(!clickEdit);
                    setClickOption(!clickOption);
                    // window.addEventListener('click', function () {
                    //     console.log('click');
                    // });
                  }}>
                  <FontAwesomeIcon icon={faPencil} className="mr-4" />
                  <span>Éditer</span>
                </button>
                <button
                  className="pr-8 pl-4 leading-[3rem] mr-auto"
                  onClick={handleClickDeletePost}>
                  <FontAwesomeIcon icon={faTrashCan} className="mr-4" />
                  <span>Supprimer</span>
                </button>
              </>
            ) : (
              <>
                {/* <button className='pr-8 pl-4 leading-[3rem] mr-auto'>
                                    <FontAwesomeIcon icon={faShareNodes} className='mr-4' />
                                    Ne plus suivre
                                </button> */}
                <button className="pr-8 pl-3 leading-[3rem] flex items-center ">
                  <svg
                    className="mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    fill="currentColor">
                    <path
                      d="M18 3A2 2 0 1 0 18 7 2 2 0 1 0 18 3zM18 17A2 2 0 1 0 18 21 2 2 0 1 0 18 17zM6 10A2 2 0 1 0 6 14 2 2 0 1 0 6 10z"
                      opacity="0"
                    />
                    <path d="M18 8c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C21 6.7 19.7 8 18 8zM18 4c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C19 4.4 18.6 4 18 4zM18 22c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C21 20.7 19.7 22 18 22zM18 18c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C19 18.4 18.6 18 18 18zM6 15c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3C9 13.7 7.7 15 6 15zM6 11c-.6 0-1 .4-1 1 0 .6.4 1 1 1 .6 0 1-.4 1-1C7 11.4 6.6 11 6 11z" />
                    <path d="M7.1 7.5H17V9.5H7.1z" transform="rotate(-30.243 11.997 8.501)" />
                    <path d="M11 10.6H13V20.5H11z" transform="rotate(-59.748 11.992 15.496)" />
                  </svg>
                  <span>Partager via</span>
                </button>
                <button className="pr-8 pl-4 leading-[3rem] mr-auto">
                  <FontAwesomeIcon icon={faFlag} className="mr-4" />
                  <span>Signaler ce post</span>
                </button>
              </>
            )}
          </div>
        ) : (
          false
        )}

        {/* ====================================================== END BUTTON OPTION ====================================================== */}

        {imagesUrl[0] ? (
          <img
            className="border-b-[1px]"
            src={server + 'images/' + createBy + '/' + image}
            alt="post"></img>
        ) : (
          false
        )}

        {/* ============= module like / share/ coments ============= */}
        <div className="flex justify-between items-center pl-4 pr-4 h-8 border-w-1 border-#f2f2f2 border-b-[1px]  text-xs text-[#aaa] ">
          <div className="flex">
            <div className=" bg-blue-500 rounded-full flex h-fit mr-1 mt-auto mb-auto">
              <FontAwesomeIcon
                icon={faThumbsUpLiked}
                className="text-blue-100 p-1 text-[0.5rem] "
              />
            </div>
            {allLikes}
          </div>
          <span className=" ">0 commentaires</span>
        </div>

        <div className="flex  justify-between h-10  pt-2 pb-2 pl-4 pr-4 ">
          <button className=" text-tertiary-black cursor-pointer h-full">
            <FontAwesomeIcon
              className="h-full"
              // @ts-ignore
              icon={userLiked ? faThumbsUpLiked : faThumbsUp}
              // icon={faThumbsUp}

              onClick={handleClicklike}
            />
          </button>
          <button className="flex justify-center">
            {/* <FontAwesomeIcon className='h-5 text-[#666]' icon={faCommentDots} /> */}
            <svg viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="">
              <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
            </svg>
          </button>
          <button>
            <FontAwesomeIcon className="h-5 text-[#666]" icon={faShare} />
          </button>
        </div>

        {clickEdit && admin && (
          // @ts-ignore
          <EditPost
            contentToEdit={{ description: { current: currentDescritpion, update: setCurrentDescription }, image: { current: image[0], update: setImage } }}

            post_id={_id}
            unmount={() => {
              setClickEdit(false);
            }}
          />
        )}
      </section>
    </>
  );
}

export default PostTemplate;
