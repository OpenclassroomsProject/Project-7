import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import Modal from '../../components/modal/Modal';

export default function EditPost({ contentToEdit }) {
    const modalConfirm = useRef();
    const description = useRef();

    const Button = ({ children }) => {
        return <button className='bg-secondary-pink text-black text-sm font-semibold rounded-full  pl-4 pr-4 pt-1 pb-1'>{children}</button>;
    };
    useEffect(() => {
        if (description.current) {
            // @ts-ignore
            description.current.focus();
        }
    }, []);
    return (
        <Modal>
            <div ref={modalConfirm} className=' relative top-1/4 bg-white h-36 m-6 flex flex-col justify-end p-2 rounded'>
                <FontAwesomeIcon icon={faSquareXmark} className='absolute top-0 right-0 p-1' />
                {/* Supprimer Certaines modifications n’ont pas été enregistrées. Les modifications que vous avez effectuées ne seront pas */}
                {/* enregistrées. */}
                <textarea
                    ref={description}
                    defaultValue={contentToEdit}
                    className='focus:bg-gray-200 focus:outline-none focus:border border-gray-400'
                ></textarea>
                <div className='flex justify-end'>
                    <Button> Enregistrer</Button>
                </div>
            </div>
        </Modal>
    );
}
