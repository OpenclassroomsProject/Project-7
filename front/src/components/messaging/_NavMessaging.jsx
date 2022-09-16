import { useContext , useState, useEffect} from "react"
import { CacheContext, UserContext } from "../../App"
import { ThemeContext } from "../../pages/profil/Settings"
import { server } from "../../server"
import Avatar from "../avatar/_Avatar"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faCross, faXmark } from "@fortawesome/free-solid-svg-icons"
import InputMessage from "./_Input"
import { MessageReceive, MessageSend } from "./_PrivateConversation"
import { addHeaderJWT } from "../fetch/addHeaderJWT"
// import socket from "../socket/socket"
import { socket } from "../../App"
import { PrivateConversation } from "./_PrivateConversation"
import { createContext } from "react"
import PreviewConversation from "./_PreviewConversation"

// export const MessagingContext= createContext(false)

const NavMessaging = () =>{

    const [userContext, updateUserContext]= useContext(UserContext)
    const themeContext = useContext(ThemeContext)
    const cacheContext = useContext(CacheContext);
    const [UserOnline , setUserOnline]= useState(null)
    const [lastPong , setLastPong]= useState(null)
    const [OpenNavMessaging, setOpenNavMessaging] = useState(null);
    const [Conversation , updateConversation] = useState(userContext.conversation)
    const [ConversationOpen, setConversationOpen] = useState([]);

    useEffect(() => {
        
        cacheContext.value.messaging.sendMessage = function OpenMessageWithId(recipientId,avatar,pseudo){
                let foundConv = false;

                if(Conversation.length !==0){
                    Conversation.forEach((conversation,index)=>{
                        if(conversation.with_id === recipientId){
                            foundConv = conversation.conversation_ID;
                        }
                    })
                }
                if(!foundConv) return console.log('manque le code pour cree une nouvelle conversation ');

                if(ConversationOpen.length !==0){
                    if(ConversationOpen.indexOf(foundConv) ===0){
                        console.log('conversation found');
                        return console.log(  ) ;
                    }
                }
                // const tmp = {
                //     recipientInfo:{
                //         pseudo:"User",
                //         avatar:"/images/default.png"
                //     }

                setConversationOpen([...ConversationOpen, foundConv])
        }
        cacheContext.value.messaging.closeMessaging = ()=>{
            if(OpenNavMessaging) return setOpenNavMessaging(false)
        }
    });
    useEffect(() => {
        // socket.on('send message',('fdsfds',"fdsfsd"),()=>{
        //     console.log('fdfsfd');
        // })

        // socket.on('connect', () => { 
        //   socket.emit('joinPrivateRoom', "id_sdsfd", userContext._id)
        // });
        // socket.emit("userId", userContext._id)
    
        // socket.on('disconnect', () => {
        //     setUserOnline(false);
        // });
    
        // socket.on('pong', () => {
        //   setLastPong(new Date().toISOString());
        // });
    
        return () => {
        //   socket.off('userId');
        //   socket.off('disconnect');
        //   socket.off('pong');
        };
      }, [userContext._id]);
    // useEffect(()=>{

    //     socket.on('connection',()=>{
    //         console.log("sucees");
    //     })
    //     return () => socket.disconnect();


    // },[])



    const handleClickOpenNav = () => { 
        // console.log(cacheContext);
        cacheContext.value.header.closeProfilOption();
        if( userContext.conversation.length !== 0 && OpenNavMessaging === null) {
            const conversationContext =  userContext.conversation
            // console.log(conversationContext);

           conversationContext.forEach((element,index)=>{
                fetch(server+'/api/conversation/preview/'+element.conversation_ID, {headers:addHeaderJWT()})
                    .then(res=>res.ok? res.json():console.log(res) )
                    .then(dataRecipient => {
                        conversationContext[index]= {...conversationContext[index] ,dataRecipient};
                        if(conversationContext.length-1 === index) {
                            // return userContext.setDataUser({...userContext})
                            return updateConversation([...userContext.conversation])
                        }
                    })
            })
        };
        setOpenNavMessaging(!OpenNavMessaging)
    };
    
 

    const handleClick_newConversation = ()=>{
        ConversationOpen.push(false)
        setConversationOpen([...ConversationOpen ])
    }
    
    const Button = ({children, onClick, className})=>{
        return <>
            <div className={"flex justify-center cursor-pointer h-full aspect-square rounded-full hover:bg-[#e4e2e2aa]  "+className+" "+themeContext.fontColor.secondary} onClick={onClick}>
                {children}
            </div>
        </>
    }
    // console.log(userContext);

    return (
        // <MessagingContext.Provider value={ConversationOpen} >

            <div className="fixed bottom-16 sm:bottom-0  right-0 flex flex-row-reverse items-end">

                <div className=' bg-white rounded-full sm:rounded-lg sm:rounded-t-lg border mr-4 w-min overflow-hidden'> 

                    <div className="hidden sm:flex items-center border-b pr-4 ">
                        <div className=" cursor-pointer flex  items-center  p-2 mr-16"  onClick={handleClickOpenNav}>
                            <div className="h-8 aspect-square mr-4">
                                <Avatar src={server +userContext.avatar} />
                            </div>
                            <span className="w-fit">Messagerie</span>
                        </div>


                        <Button className='' onClick={handleClick_newConversation}>
                            <FontAwesomeIcon icon={faPenToSquare} className={'m-2 w-4 h-4'} />
                        </Button>

                        <Button onClick={handleClickOpenNav} >
                            <svg className="m-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"  width="16" height="16" focusable="false">
                                {!OpenNavMessaging?
                                    <path d="M15 11L8 6.39 1 11V8.61L8 4l7 4.61z"></path>
                                :
                                    <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"></path>
                                }
                            </svg>
                        </Button>
                    </div>
                    <div className="  flex sm:hidden justify-center items-center cursor-pointer "  > 
                        <FontAwesomeIcon icon={faPenToSquare} className='aspect-square h-6 p-2  text-[#aaa] '/>
                    </div>

                    {OpenNavMessaging && 
                        <div className={" hidden  w-full sm:flex flex-col items-center h-[75vh]   "}> 

                            {Conversation && Conversation.length !== 0? 
                                Conversation.map((element,index)=>{
                                    return <PreviewConversation key={index} conversationId={element.conversation_ID}  with_id={element.with_id} data={element.dataRecipient} ConversationOpen={ConversationOpen} updateConversationOpen={setConversationOpen} />
                                } )
                                :
                                <p className="text-[#aaa] m-auto   justify-center">Aucune conversation</p>
                            }

                        </div>
                    }
                    
                </div>

                {ConversationOpen.length !== 0?
                    <div className=" flex items-end  h-[50vh]">
                        { ConversationOpen.map((conversationId,index)=>{
                            function closeConversation(){
                                delete ConversationOpen[index];
                                ConversationOpen.length--;
                                setConversationOpen([...ConversationOpen])
                            }
                            if(conversationId === false) return <PrivateConversation New key={index} index={index} closeConversation={closeConversation}  />
                            return <PrivateConversation conversationId={conversationId} data={Conversation[index]} key={index} index={index} closeConversation={closeConversation}  />
                        })}
                    </div>
                :false}
            
            </div>

        // </MessagingContext.Provider>

    )
}

export default NavMessaging