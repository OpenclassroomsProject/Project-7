import { useState, useEffect, useRef, useContext, createRef } from 'react';
import { addHeaderJWT } from '../../components/fetch/addHeaderJWT';
import { server } from '../../server';
import ImageDelete from '../../components/img/ImageDelete';
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// @ts-ignore
import { faCamera, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { UserContext } from '../../App';
import { Link    } from 'react-router-dom';

// import { confirm } from "./../../components/modal/Confirm";

// import Footer from './components/Footer'

export default function CreatePost({ title }) {
    const [postIsValid, setPostIsValid] = useState(false);
    // @ts-ignore
    const { userData } = useContext(UserContext);

    const textArea = useRef();
    useEffect(() => {
        document.title = title;
    }, [title]);
    useEffect(() => {
        // @ts-ignore
        if (textArea.current) textArea.current.focus();
    }, [textArea]);
    const fileRef = createRef();
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    // @ts-ignore
    const uploadToServer = async (event) => {
        if (!postIsValid) return false;
        // @ts-ignore
        if (!textArea.current.value) return false;

        // @ts-ignore
        // const textArea = document.getElementById('textArea').value;

        const body = new FormData();

        // @ts-ignore
        body.append('textArea', textArea.current.value);

        body.append('file', image);

        fetch(server + 'api/post/create', {
            method: 'POST',
            mode: 'cors',
            headers: addHeaderJWT(),
            body,
        }).then((data, err) => {
            console.log(data);
            if (err) console.log(err);
            window.location.href = '/';
        });
    };
    const avatarURI = `${server}images/${
        userData.avatar === 'default.png' ? userData.avatar : userData.id + '/' + userData.avatar
    }`;
    return (
        <main className='absolute h-screen top-0 right-0 w-screen bg-white z-50 flex flex-col '>
            <nav className='flex items-center h-12 border-b-[1px]'>
                <Link to={'/'} className='p-3 text-gray-500    '>
                    <svg viewBox='0 0 24 24' data-supported-dps='24x24' fill='currentColor' className='h-6'>
                        <path d='M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z'></path>
                    </svg>
                </Link>
                <h1 className='w-full text-xl font-extrabold ml-4 '>Partager</h1>
                <button className={`p-3 text-${postIsValid ? 'gray-300' : 'gray-500'} text-sm`} onClick={uploadToServer}>
                    Publier
                </button>
            </nav>
            <div className='p-4 flex flex-col  border-b-[1px]'>
                <div className='flex flex-row mb-4'>
                    <img src={avatarURI} className='rounded-full h-10 w-10 mr-4' alt='profil'></img>
                    <div>
                        <span> {userData.pseudo}</span>
                    </div>
                </div>
                <textarea
                    className=' p-1 focus:outline-none placeholder:text-gray-500 '
                    placeholder={'Partager un post avec ou sans photos.'}
                    ref={textArea}
                    onChange={(e) => {
                        if (e.target.value) {
                            if (!postIsValid) setPostIsValid(true);
                            console.log(e.target.value);
                        } else {
                            setPostIsValid(false);
                        }
                    }}
                ></textarea>
            </div>
            <button
                className='p-4 cursor-pointer'
                onClick={() => {
                    fileRef.current.click();
                }}
            >
                <svg viewBox='0 0 24 24' data-supported-dps='24x24' className='icon fill-gray-600 h-6 w-6 '>
                    <path d='M16 13a4 4 0 11-4-4 4 4 0 014 4zm6-4v11H2V9a3 3 0 013-3h1.3l1.2-3h9l1.2 3H19a3 3 0 013 3zm-5 4a5 5 0 10-5 5 5 5 0 005-5z'></path>
                </svg>
            </button>
            <input type='file' className={'w-0'} ref={fileRef} onChange={uploadToClient}></input>
            {image ? (
                // @ts-ignore<
                <div className=' max-h-24 h-full'>
                    <ImageDelete
                        className='flex p-2 '
                        edit
                        src={createObjectURL}
                        closeIMG={() => {
                            setCreateObjectURL(false);
                            setImage(false);
                        }}
                    />
                </div>
            ) : (
                false
            )}
        </main>
    );
}
