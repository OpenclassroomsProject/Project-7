import {  useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import {  UserContext  } from "../../App";
import { socket } from "../../App";


const InputMessage = ({message,first, className, to}) =>{
  const _className = className? className: '';

  const userContext = useContext(UserContext);
    const [allMessage, setAllMessage] = message;

    const inputRef = useRef();
    const { idConversation, userID } = useParams();



    const handleSubmitMessage=()=>{
      alert('click');
      if(!inputRef.current.value) return console.log('Message vide !');

      let recipient =  to.conversationId || to.recipientId ;
      // console.log(userContext);
      // if(!userID && userContext[0] ){
      //   userContext[0].conversation.forEach(element => {
      //     if(element.conversation_ID === idConversation) recipient = element.with_id;
      //   });
      // }

      

      allMessage.push({sendBy: userContext[0]._id ,message: inputRef.current.value, date: Date.now() })
      setAllMessage([...allMessage])
      socket.emit('message', recipient,inputRef.current.value);
      // socket.emit('send message',inputRef.current.value , recipient, idConversation);
      inputRef.current.value= ''
    }
    return (
      <div className={_className}>
        <input type='text' ref={inputRef} className='border-2 w-full ' onKeyDown={(e)=> e.key === 'Enter'? handleSubmitMessage() : false} ></input>
        <button type='submit' onClick={handleSubmitMessage}>Envoyer un message</button>
      </div>
    )
  }

  export default InputMessage