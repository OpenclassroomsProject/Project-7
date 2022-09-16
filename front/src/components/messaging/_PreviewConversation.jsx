import Avatar from "../avatar/_Avatar";
import { server } from "../../server";
import { Link } from "react-router-dom";
const PreviewConversation = ({conversationId, link, data,updateConversationOpen, ConversationOpen}) => {
    const idConversation= conversationId;
    // const recipient = with_id;
    

    const {pseudo, avatar} = data?data.recipientInfo:false; 
    const {message} = data? data.conversationPreview : false;
    const Wrapper =({children , className})=>{
        if(link) return(
            <Link to={'./'+idConversation} className={className}>
                {children}
            </Link>
        )
        return (
            <div className={className}>
            {children}    
            </div>
        )
    }

    return ( 
        <Wrapper className='bg-white h-16 flex hover:bg-[#dededeaa] w-[inherit] cursor-pointer'>

            <div className="h-12 aspect-square m-auto ml-2 mr-4">
                <Avatar src={server+avatar}/>
            </div>


            <div className=" flex flex-col justify-center border-b w-full" onClick={()=>{ 
                if(link){
                    return 
                }
                if(ConversationOpen.indexOf(idConversation)=== 0 ) return console.log('conversation already open ')
                updateConversationOpen([...ConversationOpen , idConversation])
            }}>
            <span> {pseudo}</span>
            <p>{message}</p>
            </div>
        </Wrapper>
    )
}

export default PreviewConversation