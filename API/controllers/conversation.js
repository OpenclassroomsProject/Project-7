const User = require('../models/User');
const Conversation  = require('../models/Conversation');
const { getPseudo_and_Avatar } = require('./profil');

exports.send = (req,res)=>{
    findConversation((conversation)=>{
        if(!conversation){
            console.log("creation d'une nouvelle conversation !");
            const message = {date: Date.now(), contents:req.body.message, sendBy:req._id}
            const NewConversation = new Conversation({startByID:req._id, withID: req.params.id, messages: message })
            NewConversation.save().then((data)=>{
               return res.status(200).json({status:"creation d'une nouvelle conversation !", data:data})
            })
        }
    

    })
}
exports.getPrivateConversation = (req,res) =>{
    findConversation((privateConversation)=>{
        // console.log(privateConversation);
    })
}
exports.getAllMessage = (req,res) => {
    // console.log('requetes get all message recive');

    Conversation.findById(req.params.id, (err,privateConversation)=>{
        if(err) res.json(500).json({error:err});
        
        if(privateConversation){
            if(privateConversation.startByID === req._id || privateConversation.recipientID === req._id ){
                res.status(200).json(privateConversation.messages)
            }else{
                res.status(401).json({error: 'You are trying to access a conversation that is not yours !'})
            }
        }else{

            res.status(200).json(false)
        }
    })
    // console.log(req.params.id);
    // findConversation((conversation)=>{
    //     if(conversation[0]){
    //         res.status(200).json({conversation_ID: conversation[0]._id})
    //     }
    // })
    // function findConversation (cb,err){
    
    //     Conversations.find({startByID: req._id, withID: req.params.id} , (err,result)=>{
    //         if(Object.keys(result).length !== 0){ return cb(result);}
    //     })
    
    //     Conversations.find({startByID: req.params.id , withID: req._id} , (err,result)=>{
    //         if(err) return console.log(err);
    
    //         if(Object.keys(result).length !== 0){
    //            return cb(result);
    //         }else{
    //             cb(false)
    //         }
    //     })
    // }

}
// exports.getAllPrivateConversation = (req,res) =>{
//     res.status(200).json({name:'pierre', age:14})
// }
exports.preview = async (req,res)=>{
    const conversation = await Conversation.findById(req.params.id)
    if(!conversation) return res.status(404).json({err:'not found'})

    if((conversation.startByID === req._id) ||( conversation.recipientID === req._id) ){
        // req.params.id = conversation.recipientID !== req._id?  req._id  : conversation.recipientID; 
        req.params.id = conversation.recipientID;
        // switch (conversation.recipientID || conversation.startByID) {
        //     case value:
                
        //         break;
        
        //     default:
        //         break;
        // }
        if(req._id !== conversation.recipientID ){
            req.params.id = conversation.recipientID
        }  
        if(req._id !== conversation.startByID ){
            req.params.id = conversation.startByID
        } 
        getPseudo_and_Avatar(req,res,()=>{

            const lastMessage = conversation.messages[conversation.messages.length-1];
            return res.status(200).json({recipientInfo: {...req.result}, conversationPreview: lastMessage})
        })
    } else{
        res.status(403).json({error: 'You are trying to access a conversation that is not yours !'})
    }

}