import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect , useContext, useState, useCallback} from 'react';
import { CacheContext, UserContext } from '../../App';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
// import { server } from '../../server';
// import getPseudo from '../../components/fetch/profil/getPseudo'
import { server } from '../../server';
import { createRef } from 'react';
import Spinner from '../../components/fetch/spinner/Spinner';
import PostTemplate from '../../components/post/PostTemplate';
import { addHeaderJWT } from '../../components/fetch/addHeaderJWT';
import Modal from '../../components/modal/Modal';
import { useRef } from 'react';
import socket from '../../components/socket/socket';



export default function Profil ({ title, edit,refresh }) {
  const cacheContext = useContext(CacheContext);
  const [userContext, updateUserContext] = useContext(UserContext);
  
  const [dataProfil, setDataProfil] = useState({profilInfo:false,post:false});
  const [ItsYourFriend, setItsYourFriend] = useState(null);
  const Navigate = useNavigate()

  document.title= title


  let idParams = window.location.pathname.split('/')[2];
  if(!idParams || idParams === 'edit')  idParams = userContext._id
  
  if(cacheContext.value.pageActive !== "profil") cacheContext.value.pageActive='profil';

  useEffect(()=>{
    // console.log('useeffect');

    const fetchUser = ()=>{
        fetch(server+'/api/profil/preview/'+idParams, {headers: addHeaderJWT()})
          .then(res=>res.json())
          .then(data=>setDataProfil(data))      
    }
    if(!dataProfil.profilInfo  || (refresh && dataProfil.profilInfo._id !== userContext._id )){
      fetchUser()
    }
  })
  
  // useEffect(() => {

  //   if(userContext && ItsYourFriend === null  && userContext.followedUser ){
  //     userContext.followedUser.forEach((element) => {
  //       if(element === idParams) setItsYourFriend(true)
  //     });
  //   } 
  // }, [ItsYourFriend,idParams, userContext]);
    
  if(!dataProfil.profilInfo) return false


  const ButtonEditPicture = ({className, profil, banner})=>{
    const fileAvatarRef = createRef();
    const fileBannerRef = createRef();
    const [image, setImage] = useState(false);
    const [createObjectURL, setCreateObjectURL] = useState(false);
    let path;
    if(profil) path = "avatar";
    if(banner) path = "banner";
    const actuallyUseRef = profil? fileAvatarRef:fileBannerRef;

    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
    function uploadToServer(){
      const body = new FormData();
      body.append(path, image);

      fetch(server+'/api/profil/update/'+path, {method:'POST', headers: addHeaderJWT(),body})
      .then(data=>console.log(data))

    };

    const PreviewFile = ()=>{
      if(!createObjectURL) return false

      const Button = ({children,className,onClick})=>{
        return(
          <button className={`p-2 ${className}`} onClick={(e)=>{
            e.preventDefault(); 
            if(onClick)onClick();
             setCreateObjectURL(false)  
          }}>{children}</button>
        )
      }
      return(
        <Modal >
          <div className='bg-white  mt-[30%] mx-4'>
            <img className='pt-4' src={createObjectURL} alt={`preview new ${path}`}></img> 
            <div className='flex justify-end pb-4 mr-4'>
              <Button className='text-[#aaa] mr-4'>Annuler </Button>
              <Button className='border rounded-full' onClick={uploadToServer}>Confirmer</Button>
            </div>
          </div>
        </Modal>
    )};

    return  (
      <form className={' bg-white text-[#aaa] border-[#aaaa] hover:text-black hover:border-black rounded-full w-8 h-8 flex items-center justify-center hover:cursor-pointer '+className}>
        <FontAwesomeIcon className='' icon={faCamera} onClick={()=>{actuallyUseRef.current.click()}} />
        <input className='w-0' type="file" ref={actuallyUseRef} onChange={uploadToClient}/>
        <PreviewFile/>
      </form>
    )
  }

  const ButtonFollow = ()=>{
    const handleClickFollow= ()=>{
      let tmp = {...userContext}

      if(!ItsYourFriend) {
        fetch(server+'/api/profil/follow/'+idParams,{headers:addHeaderJWT()})
        tmp.followedUser.push(idParams)
        userContext.setDataUser(tmp)
        return setItsYourFriend(true)
      }

      let indexItsMyFollowedList;

      if(tmp.followedUser){
        tmp.followedUser.forEach((element,index)=>{
          if(element=== idParams) {
            indexItsMyFollowedList= index;
          }
        })
        delete tmp.followedUser[indexItsMyFollowedList]

        fetch(server+'/api/profil/unFollow/'+idParams,{headers:addHeaderJWT()})
        .then(res=>{
          if(res.ok){
            userContext.setDataUser(tmp);
            setItsYourFriend(false)
          }
        })
      }

    }
    return(
      <button className='hover:cursor-pointer border pl-3 pr-4 py-1 rounded-full bg-blue-600 text-white h-fit' onClick={handleClickFollow}> 
        {ItsYourFriend?
          <>
            <div className='flex items-center '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="" width="16" height="16" focusable="false">
                <path d="M12.57 2H15L6 15l-5-5 1.41-1.41 3.31 3.3z"></path>
              </svg>
              <span className='ml-1'>Suivi</span>
            </div>
          </>
        :
          <>
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            Suivre
          </>
        }
      </button>
    )
  }
  const ButtonContact =()=>{
    const [SendMessage, setSendMessage] = useState(false);
    // const handleClickContact =(e)=>{
    //   setSendMessage(true)
    // }
    const Conversation = ()=>{
      const inputRef = useRef();
      const [Conversation, setConversation] = useState(null);

      // useEffect(()=>{
      //   userContext.userData.conversation.find
      //   if(Conversation === null){
      //     fetch(server+'/api/conversation/find/'+idParams, {headers: addHeaderJWT()})
      //       .then(res=> res.json())
      //       .then(({conversation_ID}) => setConversation({id: conversation_ID}))
      //   }
      //   if(Conversation && Conversation.id){
        
      //   }
      // },[Conversation])
      socket.on('whisper',(data)=>{
        console.log(data);
      })



      const handleSubmitMessage=()=>{
        if(!inputRef.current.value) return
        socket.emit('send message',inputRef.current.value , Conversation.id, idParams );
      }
      const styleMessage = 'flex mr-4 ml-8 '
      const styles ={
        message:{
          send: styleMessage+' justify-end',
          receive:styleMessage+'',
          content:'border px-3 py-1 rounded bg-gray-200',
        },
      }
      const MessageSend = () =>{
        return(
          <div className={styles.message.send}>
             <span className={styles.message.content}>Message etcxc</span>
          </div>
        )
      }
      const MessageReceive = () =>{
        return( 
          <div className={styles.message.receive}> 
            <span className={styles.message.content}>Message Recu</span>
          </div>
        )
      }


      return(
        <div className='absolute bg-white h-screen w-screen top-0 left-0 z-20 flex justify-between flex-col' > 
          <div className='flex flex-col  text-black'>
            <nav className='bg-red-300 w-full h-8'>
              <span> #Destinataire</span>
            </nav>
            <span className=' text-center '>---------- date -----------</span>
            <MessageSend/>
            <MessageReceive/>
          </div>
          <div className='flex'>
            <input type='text' ref={inputRef} className='border-2 w-full h-10'></input>
            <button type='submit' onClick={handleSubmitMessage}>Envoyer un message</button>
          </div>
        </div>
      )
    }
    return (
    // <Link to={'/messagerie/newMessage/'+idParams} className='border border-blue-600 text-blue-600 h-fit pl-3 pr-4 py-1 ml-2 rounded-full'>
    //   <span>Message</span>
    // </Link>
    <div className='border border-blue-600 text-blue-600 h-fit pl-3 pr-4 py-1 ml-2 rounded-full cursor-pointer' onClick={()=>cacheContext.value.messaging.sendMessage(idParams)}>
      <span>Message</span>
    </div>
    )
  }
  const AllPost = ()=>{
    if(dataProfil.post === null) return <Spinner className="mt-2"/>;
    if( !dataProfil.post ||dataProfil.post.length === 0) return <div className=' border mt-2 bg-white w-full flex items-center justify-center h-40 text-[#aaa] '> <h2 className=''>Aucune acitivité</h2> </div>
    return dataProfil.post.map((data)=>(<PostTemplate {...data} key={data._id} avatar={dataProfil.profilInfo.avatar } createByPseudo={dataProfil.profilInfo.pseudo} />));
  }

  const BannerProfil = dataProfil.profilInfo.bannerProfil === 'false'? '/bg-profil.svg' :dataProfil.profilInfo.bannerProfil; 
  const styles = {
    banner :{
      backgroundImage:  "url('"+BannerProfil+"')"
    }
  }



  const EditProfil = ()=>{
    const [inputs, setInputs] = useState({});

    const sendUpdateToServer =(e)=>{
      e.preventDefault()
      if(!inputs.pseudo && !inputs.job && !inputs.localisation) return Navigate('/profil/');
      const obj = {
        pseudo: inputs.pseudo? inputs.pseudo : false,
        job: inputs.job? inputs.job : false,
        localisation : inputs.localisation? inputs.localisation : false
      }
      let headers= addHeaderJWT();
      headers.append('Content-Type','application/json')
      fetch(server+'/api/profil/update/bio', {method:'POST', body:JSON.stringify(obj), headers: headers })
        .then(data=>Navigate('/profil/'))
      // console.log(inputs);
    }
    const handleChange = (event)=>{
      event.preventDefault()
      const name = event.target.id;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    const style = {
      input: 'border '
    }
   return <Modal>
        <form className='relative bg-white m-4 flex flex-col p-6 ' onSubmit={sendUpdateToServer} >
          <Link to='/profil/' className='absolute right-2 top-1 '>X</Link>
          <label htmlFor='pseudo'>Pseudo :</label>
          <input id='pseudo'  onChange={handleChange} placeholder={dataProfil.pseudo} value={inputs.pseudo || ""} className={style.input}/>
          <label htmlFor='job'>Travail / Poste :</label>
          <input id='job'  onChange={handleChange} placeholder={dataProfil.job} value={inputs.job || ""} className={style.input}/>
          <label htmlFor='localisation'>Localisation :</label>
          <input id='localisation'   onChange={handleChange} placeholder={dataProfil.localisation} value={inputs.localisation || ""} className={style.input} />
          <button className={'border rounded-full p-2 px-4 m-auto mt-6 '}  type='submit'>Mettre a jour mes informations</button>
          <Link to='/profil' className='m-auto '>Annuler</Link>
        </form>
      </Modal>
  }
  return(
    <main className='flex flex-col items-center mb-28  sm:mt-2 sm:mx-4 '>    
      <div style={{...styles.banner}}  className="w-full flex justify-between bg-banner-profil px-4 ">
        <span className=' relative top-10'>
          <img className=' w-32 h-32 rounded-full' src={server+dataProfil.profilInfo.avatar } alt="profil"/>
          {dataProfil.profilInfo.editProfil && <ButtonEditPicture profil className='border absolute right-0 bottom-0'/>}
        </span>
        {dataProfil.profilInfo.editProfil  && <ButtonEditPicture banner className=' mt-6 mr-2'/>}
      </div>
      <div className=' w-full  px-4 bg-white mb-2 border-y flex justify-between'>
        <div className='flex flex-col leading-6 pt-10 pb-5 '>
          <h1 className=' text-xl font-bold -mb-1'>{dataProfil.profilInfo.pseudo}</h1>
          <span className='text-s '> {dataProfil.profilInfo.job} </span>
          <span className='text-xs text-[#aaa]'> {dataProfil.profilInfo.localisation !== 'false'? dataProfil.profilInfo.localisation :''} {!dataProfil.editProfil && <Link className='pl-2 text-blue-500 font-bold' to='/'>Coordonées</Link>}</span>
          {/* {!edit || dataProfil.editProfil? :''} */}
        </div>
        {dataProfil.profilInfo.editProfil?
            <Link to='/profil/edit'>
              <FontAwesomeIcon icon={faPencil} className="mt-4 text-[#aaa] hover:text-black cursor-pointer" /> 
            </Link>
          :
          <div className='flex mt-4'>
            <ButtonFollow/>
            <ButtonContact/>
          </div>
        }
      </div>
      <AllPost/>
      {edit? <EditProfil/>: undefined}
    </main>
  )
}
