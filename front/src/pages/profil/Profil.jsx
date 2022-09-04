import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect , useContext, useState, useCallback} from 'react';
import { UserContext } from '../../App';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
// import { server } from '../../server';
// import getPseudo from '../../components/fetch/profil/getPseudo'
import { server } from '../../server';
import { createRef } from 'react';
import Spinner from '../../components/fetch/spinner/Spinner';
import PostTemplate from '../../components/pages/post/PostTemplate';
import { addHeaderJWT } from '../../components/fetch/addHeaderJWT';
import Modal from '../../components/modal/Modal';


export default function Profil ({ title, edit,refresh }) {
  const idParams = window.location.pathname.split('/')[2];
  const userContext = useContext(UserContext);
  const [dataProfil, setDataProfil] = useState(null);
  const [PostProfil, setPostProfil] = useState(null);
  const [ItsYourFriend, setItsYourFriend] = useState();
  const Navigate = useNavigate()

  // console.log(userContext.id);
  // console.log(idParams);


  const fetchUser = useCallback(() => {
    if(!userContext.userData) return false;
      let param = idParams;
      // console.log(idParams);
      if(!idParams || idParams === 'edit')  param = userContext.userData.id
      
      fetch(server+'/api/profil/'+param, {headers: addHeaderJWT()})
      .then(res => {
        if(!res.ok) return Navigate('/profil');
        return res.json();
      })
      .then(data => {
        const editProfil=data._id === userContext.userData.id? true: false;
        setDataProfil({...data, editProfil: editProfil })
      })
  }, [idParams,userContext, Navigate]);
  const fetchPostUser= useCallback(()=>{
    if(!userContext.userData) return false;
    let param = idParams;
    if(!idParams || idParams === 'edit')  param = userContext.userData.id
    fetch(server+'/api/post/getAllByUserId/'+param, {headers: addHeaderJWT()})
      .then(res=>res.json())
      .then(data=>{
        setPostProfil(data)
      })
  },[idParams, userContext])

  useEffect(() => {
    if(refresh){
      fetchUser();
      fetchPostUser();
    } 
    
  }, [refresh,fetchUser, fetchPostUser]);


  useEffect(() => {
    if( dataProfil === null ) fetchUser();
  });
 
  
  useEffect(()=>{ 
    if((PostProfil === null) && dataProfil ) fetchPostUser();
  })
    
  if(!dataProfil) return false


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
  const AllPost = ()=>{
    if(PostProfil === null) return <Spinner className="mt-2"/>;
    if(PostProfil.length === 0 || !PostProfil) return <div className=' border mt-2 bg-white w-full flex items-center justify-center h-40 text-[#aaa] '> <h2 className=''>Aucune acitivité</h2> </div>
    return PostProfil.map((data)=>(<PostTemplate {...data} key={data._id} />));
  }
  // if() console.log('ici');
  const BannerProfil = dataProfil.bannerProfil === 'false'? '/bg-profil.svg' :server+"/images/"+dataProfil._id+'/asset/'+ dataProfil.bannerProfil; 
  // const bannerProfil= dataProfil.bannerProfil?   "/bg-profil.svg";
  const styles = {
    banner :{
      backgroundImage:  "url('"+BannerProfil+"')"
    }
  }

  const url = window.location.origin.split(':')
  const avatar = dataProfil.avatar === "default.png"? dataProfil.avatar : dataProfil._id + "/asset/"+dataProfil.avatar; 
  const urlAvatar = url[0]+':'+url[1]+":3001/images/"+avatar

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
          <img className=' w-32 h-32 rounded-full' src={urlAvatar} alt="profil"/>
          {dataProfil.editProfil && <ButtonEditPicture profil className='border absolute right-0 bottom-0'/>}
        </span>
        {dataProfil.editProfil  && <ButtonEditPicture banner className=' mt-6 mr-2'/>}
      </div>
      <div className=' w-full  px-4 bg-white mb-2 border-y flex justify-between'>
        <div className='flex flex-col leading-6 pt-10 pb-5 '>
          <h1 className=' text-xl font-bold -mb-1'>{dataProfil.pseudo}</h1>
          <span className='text-s '> {dataProfil.job} </span>
          <span className='text-xs text-[#aaa]'> {dataProfil.localisation !== 'false'? dataProfil.localisation :''} {!dataProfil.editProfil && <Link className='pl-2 text-blue-500 font-bold' to='/'>Coordonées</Link>}</span>
          {/* {!edit || dataProfil.editProfil? :''} */}
        </div>
        {dataProfil.editProfil?
            <Link to='/profil/edit'>
              <FontAwesomeIcon icon={faPencil} className="mt-4 text-[#aaa] hover:text-black cursor-pointer" /> 
            </Link>
          :
            <button className='hover:cursor-pointer mt-4 pl-3 pr-4 py-1 border rounded-full bg-blue-600 text-white h-fit' onClick={()=>{
              console.log(idParams);
              fetch(server+'/api/profil/follow/'+idParams,{headers:addHeaderJWT()})
            }}> 
              <FontAwesomeIcon icon={faPlus} className='mr-2' />
              <span>Suivre</span>
            </button>
        }
      </div>
      <AllPost/>
      {edit? <EditProfil/>: undefined}
    </main>
  )
}
