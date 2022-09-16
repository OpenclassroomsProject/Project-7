import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { socket, UserContext } from "../../App";
import { server } from "../../server";
import { addHeaderJWT } from "../fetch/addHeaderJWT";
import InputMessage from "./_Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MessagingContext } from "./_NavMessaging";
import Avatar from "../avatar/_Avatar";
// import socket from "../socket/socket";



export const PrivateConversation =({data,conversationId, New, closeConversation})=>{
  // console.log(data);
  const _userContext= useContext(UserContext);
  const userContext = _userContext[0];
  const recipientId = data ? data.with_id : false;

  // const messagingContext = userContext.conversation
  // console.log(userContext);

  const [allMessage, updateAllMessage] = useState([]);
  // console.log(data);
  const Data = data? data.dataRecipient : false;
  const {pseudo,avatar}=Data? Data.recipientInfo:false;
  const {msg, date} = Data? Data.conversationPreview:false;

  
  useEffect(()=>{
      if(conversationId && !New && allMessage.length===0){
          fetch(server+'/api/conversation/'+conversationId, {headers: addHeaderJWT()})
              .then(res=> res.ok && res.json() )
              .then(allMsg=>{
                  updateAllMessage(allMsg)

                  // socket.on('connection',_socket=>{
                  
                 
                   
                  // })
                  // console.log('ici');
                  // socket.
                  // cacheContext.socketIO.emit("joinPrivateRoom", conversationId)
                  // console.log(cacheContext.socketIO);
                  // cacheContext.socketIO.join(conversationId)
                  // cacheContext.socketIO.to(conversationId).emit('dfsdfsdf')
              })
      }
  })
  useEffect(()=>{
    if(!New){
      socket.on('message',( messageReceive,conversationID)=>{
        const conversationProps = conversationId;
        // console.log(conversationID);
        if(conversationID === conversationProps ){
          console.log('ici');
          // alert(messageReceive);
          // console.log(allMessage);
          allMessage.push({sendBy: "recipient",message: messageReceive, date: Date.now() })
          updateAllMessage([...allMessage])
        }

        // allMessage.push({})
      })
    }
    return()=>{
      socket.off('message');

    }
  })

  // const NewConversation=()=>{
  //     return (
  //     <div className="flex justify-between p-4 border-b "> 
  //         <div className=" text-center">  Nouveau Message</div>

  //         <div className="flex justify-end h-6 ">
  //             <FontAwesomeIcon icon={faXmark} className='h-full w-ful'/>
  //         </div>
  //     </div>
  //     );
  // }
  // console.log(index);
  // console.log(messagingContext[index].conversation_ID);

  return (
      <div className=" w-[26rem] h-full bg-white border border-b-none mr-6 flex   flex-col rounded-t-xl">
          {/* <Avatar src={server+'/images/fddsf'}/> */}
          {/* {(New || (!conversationId && recipientId))?   
            <NewConversation/>
            :
            
          } */}
          {/* <Avatar src={server +userContext.userData.Avatar} wrapper={{className:'w-8 h-8 mr-4 '}}/>
          <span >User</span> */}
          <div className="flex justify-between p-2 border-b items-center "> 
            {!New && 
            <div className="h-8">
              <Avatar src={server+avatar}/>
            </div>
            }
            <div className=""> {New ? ' Nouveau Message': pseudo}</div>
            <div className="flex justify-end h-6 cursor-pointer " onClick={closeConversation}>
                  <FontAwesomeIcon icon={faXmark} className='h-full w-ful'/>
            </div>
         </div>

          <div className=" text-center">  {recipientId} </div>

          <div className={"h-full flex flex-col justify-end"}>

              {allMessage && allMessage.length !==0 && allMessage.map((message,index)=> {return message.sendBy === userContext._id? 
                  <MessageSend data={message} key={message.date}/>
                  :
                  <MessageReceive data={message} key={message.date}/>
                  })
              }
              <InputMessage message={[allMessage, updateAllMessage]} className={'flex'} to={{recipientId, conversationId}}/>
          </div>
      </div>
  )
}
export const MessageSend = ({data}) =>{
    const date=data.date;
    const value=data.message;

    return(
      <>
        <span className=' text-center '>{date}</span>
        <div className={styles.message.send}>
          <span className={styles.message.content}>{value}</span>
        </div>
      </>
    )
}
export const MessageReceive = ({data}) =>{
    // const date=data.date;
    const value=data.message;
    return( 
      <div className={styles.message.receive}> 
        <span className={styles.message.content}>{value}</span>
      </div>
    )
}
const styleMessage = 'flex mr-4 ml-8 '
const styles ={
  message:{
    send: styleMessage+' justify-end',
    receive:styleMessage+'',
    content:'border px-3 py-1 rounded bg-gray-200',
  },
}
// export default PrivateConversation;