import { PrivateConversation } from "../../components/messaging/_PrivateConversation"
import { useState ,useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { MessageReceive, MessageSend } from "../../components/messaging/_PrivateConversation";
import InputMessage from "../../components/messaging/_Input";
import { useEffect } from "react";
import { server } from "../../server";
import { addHeaderJWT } from "../../components/fetch/addHeaderJWT";
import { Nav, NavMobile } from "./Messaging";
const Private = ()=>{
    // const [FetchConversation, setFetchConversation] = useState(null);
    // if( FetchConversation === null ){
        
    // }
    const {idConversation} = useParams()
    const userContext = useContext(UserContext)
    const [allMessage, updateAllMessage] = useState(null);

    let i;
  
    userContext[0].conversation.forEach((element,index) => {
        if(element.conversation_ID){
            // const {pseudo, avatar} = element.dataRecipient.recipientInfo;
            i=index;
        }
    });
    const RecipientInfo = userContext[0].conversation[i].dataRecipient|| false;


    useEffect(()=>{
        if(idConversation && allMessage === null){
           console.log("fetch messages");
            fetch(server+'/api/conversation/'+idConversation, {headers: addHeaderJWT()})
            .then(res=> res.ok && res.json() )
            .then(allMsg=>{ updateAllMessage(allMsg) }
        )
    }


        
    })

    const {pseudo} = RecipientInfo.recipientInfo;

    return <>
        <NavMobile privateConv title={pseudo}/>
        <div className={"h-full w-full flex flex-col justify-end pb-2"}>

            {allMessage && allMessage.length !==0 && allMessage.map((message,index)=> {return message.sendBy === userContext._id? 
                <MessageSend data={message} key={message.date}/>
                :
                <MessageReceive data={message} key={message.date}/>
                })
            }
            <InputMessage message={[allMessage, updateAllMessage]} className={'flex'} />
        </div>
        {/* <PrivateConversation data={userContext[0].conversation[i]}conversationId={idConversation}/> */}
    </>
}
export default Private