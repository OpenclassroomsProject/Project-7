import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { server } from '../../server';
import { addHeaderJWT } from '../fetch/addHeaderJWT';
import React from 'react';
export default function LikedCounter ({ Post, setPost }) {
  if (!Post && setPost) return;
  let { likes, userLike } = Post;

  const changeLikes = () => {
    let Likes = likes;
    switch (userLike) {
      case 1:
        Likes--;
        userLike--;
        break;
        // case -1:

        //   break;

      default:
        Likes++;
        userLike++;

        break;
    }
    // console.log(Likes);
    return setPost({ ...Post, likes: Likes, userLike });
  };

  const submitVote = (like = false) => {
    // eslint-disable-next-line default-case
    const action = like ? 'like' : 'dislike';

    return fetch(server + 'api/post/' + action + '/' + Post._id, {
      headers: addHeaderJWT()
    });
  };
  // eslint-disable-next-line no-unused-vars
  const handleClickLike = () => {
    submitVote(true).then((data) => {
      if (data.status === 200) {
        changeLikes();
      }
    });
  };
  // eslint-disable-next-line no-unused-vars
  const handleClickDislike = () => {
    submitVote().then((data) => {
      console.log('ici');
      console.log(data);
    });
  };
  return (
  // <div>
  //     <FontAwesomeIcon
  //         icon={userLike === 1 ? faLike : faThumbsUp}
  //         className=' text-tertiary-black cursor-pointer '
  //         onClick={handleClickLike}
  //     />
  //     <span> {likes}</span>

        //     <FontAwesomeIcon
        //         icon={userLike === -1 ? faDislike : faThumbsDown}
        //         className='  cursor-pointer'
        //         onClick={handleClickDislike}
        //     />
        //     <span>{dislikes} </span>
        // </div>
        <div className='flex  justify-between h-10  pt-2 pb-2 pl-4 pr-4 '>
            <button className=''>
                <FontAwesomeIcon className='h-6 text-[#666]' icon={faThumbsUp} />
            </button>
            <button>
                <FontAwesomeIcon className='h-5 text-[#666]' icon={faCommentDots} />
            </button>
            <button>
                <FontAwesomeIcon className='h-5 text-[#666]' icon={faShare} />
            </button>
        </div>
  );
}
