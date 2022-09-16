import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { addHeaderJWT } from '../../components/fetch/addHeaderJWT';
import ImageDelete from '../../components/img/ImageDelete';
import Modal from '../../components/modal/Modal';
import ChoseIMG from '../../components/post/_choseIMG';
import { server } from '../../server';

// eslint-disable-next-line camelcase
export default function EditPost ({ contentToEdit, unmount, post_id }) {

  const currentDescritption = contentToEdit.description.current;
  const updateDescritpion = contentToEdit.description.update;
  const updateImage = contentToEdit.image.update;

  const modalEdit = useRef();
  //   const modalConfirm = useRef();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [onChangeDescription, setOnChangeDescription] = useState(false);
  const [Image, setImage] = useState(false);
  const description = useRef();

  useEffect(() => {
    if (description.current) {
      // @ts-ignore
      description.current.focus();
    }
  }, []);

  const Title = ({ children }) => {
    return (
      <div className="h-10 flex border-b-[1px] justify-between items-center p-2 pr-0">
        <h1 className="text-black font-semibold ">{children} </h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-2xl text-[#aaa] p-2 hover:text-black cursor-pointer "
          onClick={() => {
            if (onChangeDescription) return setModalConfirm(true);
            unmount();
          }}
        />
      </div>
    );
  };
  const Button = ({ children, className = null, onClick = null }) => {
    let style;
    if (className) {
      style = className;
    }
    return (
      <button
        className={
          style +
          ' text-white text-sm font-semibold rounded-full  pl-4 pr-4 pt-1 pb-1 h-fit border '
        }
        onClick={onClick}>
        {children}
      </button>
    );
  };
  const handleClickSubmit = () => {
    if (Image || onChangeDescription) {
      const body = new FormData();
      if (onChangeDescription) {
        // @ts-ignore
        body.append('description', description.current.value);
      }
      if (Image) {
        // @ts-ignore
        // body.append('picture', true);
        body.append('file', Image.File);
      }

      // @ts-ignore

      // const header = addHeaderJWT();
      // header.append('Content-Type','multipart/form-data')

      // eslint-disable-next-line camelcase
      fetch(server + 'api/post/edit/' + post_id, {
        headers: addHeaderJWT(),
        method: 'PUT',
        body
      }).then(res => {
        if (res.ok) {
          return res.json();
        };
        alert('Error during update form.');
      }).then(data => {
        unmount();
        // @ts-ignore
        if (onChangeDescription) updateDescritpion(description.current.value);
        if (Image) updateImage([data.imageName]);
      });
    } else {
      unmount();
    }
  };

  return (
    <Modal>
      <div
        ref={modalEdit}
        className=" relative top-[20%] bg-white  m-6 flex flex-col rounded-lg max-h-[80%] ">
        <Title>Modification</Title>

        <div className="flex flex-col justify-between">
          <textarea
            ref={description}
            defaultValue={currentDescritption}
            className={
              ' focus:outline-none focus:bg-gray-100  resize-none m-2 text-black  p-1 mb-4 font-serif h-screen max-h-32'
            }
            onChange={() => {
              setOnChangeDescription(true);
            }}></textarea>
          {Image && (
            <ImageDelete
              className="p-2  h-32 overflow-scroll "
              edit
              // @ts-ignore
              src={Image.URL}
              closeIMG={() => {
                setImage(false);
              }}
            />
          )}
          <div className="flex justify-between items-center border-t">
            <ChoseIMG setImage={setImage} />

            <Button onClick={handleClickSubmit} className="bg-black border-black mr-4">
              Enregistrer
            </Button>
          </div>
        </div>
        {modalConfirm && (
          <Modal className="absolute rounded-lg flex justify-center">
            <div className="relative bg-white  top-20 w-8/12 h-fit rounded-xl">
              <Title>Supprimer les modifications</Title>

              <p className="border-b p-2">
                Certaines modifications n’ont pas été enregistrées. Les modifications que vous avez
                effectuées ne seront pas enregistrées.
              </p>
              <div className=" flex justify-center p-2 ">
                <Button
                  className="bg-white  border-black text-black m-auto  "
                  onClick={() => {
                    setModalConfirm(false);
                  }}>
                  Revenir
                </Button>
                <Button onClick={unmount} className="m-auto bg-black border-black ">
                  Supprimer
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Modal>
  );
}
