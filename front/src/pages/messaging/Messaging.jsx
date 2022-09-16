import { server } from "../../server";
import { CacheContext, UserContext } from "../../App";
import React, { useContext, useState,useEffect } from "react";
import PreviewConversation from "../../components/messaging/_PreviewConversation";
import { addHeaderJWT } from "../../components/fetch/addHeaderJWT";
import Private from "./Private";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEllipsis, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";

export const NavMobile = ({privateConv,title})=>{
  const cacheContext = useContext(CacheContext)
  const [previousPath, setPreviousPath ] = useState(false);

  useEffect(()=>{
    setPreviousPath(cacheContext.value.previousPath.reverse()[0])
  },[cacheContext])
  
  const pathPrivateMessaging = window.location.pathname.split('/')[2];
  const defaultPreviousPath = pathPrivateMessaging? '/messagerie': '/'
  return (
    <nav className=" w-full flex items-center justify-between pr-2 text-[#aaa] "> 
      <Link to={previousPath || defaultPreviousPath} className="h-full w-min cursor-pointer p-2  hover:text-black flex items-center" onClick={(e)=>{
        if(previousPath === "/" || !previousPath) cacheContext.value.header.updateNav({type:'default'});
      }}>
        <FontAwesomeIcon icon={faArrowLeft} className='h-4/5  ' />
      </Link>
      <span className="text-black">{title? title :''}</span>
      <FontAwesomeIcon icon={privateConv?faEllipsis : faPenToSquare}  className='h-1/2 hover:text-black  cursor-pointer' />
    </nav>
  )
}

const Messaging = ({openMessage})=>{
  const userContext = useContext(UserContext)
  const cacheContext = useContext(CacheContext)

  const conversationContext  = userContext[0].conversation
  const [conversation, updateConversation] = useState(null);

  // console.log();
  useEffect(() => {
    if(!openMessage){
      cacheContext.value.header.updateNav({type:'messaging', title:'Messagerie'})
    }

  });
  // console.log(conversationContext);
  if(conversation === null){
    conversationContext.forEach((element,index)=>{
      fetch(server+'/api/conversation/preview/'+element.conversation_ID, {headers:addHeaderJWT()})
      .then(res=>res.ok? res.json():console.log(res) )
      .then(dataRecipient => {
        conversationContext[index]= {...conversationContext[index] ,dataRecipient};
        if(conversationContext.length-1 === index) {
          updateConversation(conversationContext)
        }
      })
    })
  }

  return <>
      {/* <div className="bg-white h-16 flex hover:bg-[#dededeaa] w-[inherit] cursor-pointer ">
                <div className="h-12 aspect-square m-auto ml-2 mr-4">
                    <Avatar src={server+avatar}/>
                </div>
      </div> */}
      <div className={"flex flex-col items-center bg-white z-20   "} > 
        {openMessage && conversation?
            <Private/>
          :
          conversation===null ?
          '':
          conversation && conversation.length !== 0? 
          conversation.map((element,index)=>{

            return (
                <React.Fragment key={'private-conversation-'+element.conversation_ID}>
                  {/* <NavMobile title='Messagerie' /> */}
                  <PreviewConversation  conversationId={element.conversation_ID} 
                   with_id={element.with_id} data={element.dataRecipient} link
                   onClick={(e)=>{
                    // e.preventDefault()
                    cacheContext.value.previousPath.push(window.location.pathname)
                    // console.log(cacheContext.value.previousPath);
                   }}
                   />
                </React.Fragment>
              )
            } )
            :
            <p className="text-[#aaa] m-auto   justify-center">Aucune conversation</p>
        }

      </div>
      
  </>
}

export default Messaging;