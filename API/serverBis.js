// const {Server} = require('socket.io');
require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const path = require('path');

const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const server = http.createServer(app)

app.use(cors());
app.use(express.json());


const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI
    mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
        console.log('====================================');
    })
    .catch(() => {
        console.log('Connexion à MongoDB échouée !');
        // console.log(process.env.MONGODB_LOCAL);
        // mongoose.connect(MONGODB_LOCAL)
        //  .then(()=>{
        //     console.log('ici');
        //  })
    })

    
//==================== Routes =======================
const UserRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const profilRoutes = require('./routes/profil');
const conversationRoutes = require('./routes/conversation')
const auth = require("./middleware/auth");
const Conversation = require("./models/Conversation");
const { off } = require("process");
// app.use(bodyParser.urlencoded({
//     extended: true
//   }))


app.use('/api/auth', UserRoutes);
app.use('/api/post/',auth,  postRoutes);
app.use('/api/profil/',auth, profilRoutes);
app.use('/api/conversation/',auth, conversationRoutes);
app.use('/images', express.static(__dirname + '/images'));

const io  =new Server(server,{
    cors:{
        origin:["http://localhost:3000","http://192.168.1.50:3000"],
        methods:["GET", "POST"]
    }
})
let connectedUsers = []

// io.use((socket, next) => {
//     console.log(socket);
    // if (isValid(socket.request)) {
//       next();
//     } else {
//       next(new Error("invalid"));
//     }
//   });

io.on('connect', (socket)=>{
    socket.idConversation=[];

    socket.on('userId',(userID)=>{
        // console.log('connexion');
            socket.userID = userID;
            connectedUsers.push({socket:socket,userID:userID })
    })
    socket.on('message',async(idConversation, msg)=>{
        if(!socket.userID) return false
        console.log("send message");

        const conversationFound = await Conversation.findById(idConversation)
        // console.log(conversationFound);
        if(!conversationFound) return false

        const {recipientID, startByID} = conversationFound;
            // console.log(socket.userID);
            // console.log(conversationFound);
        if(recipientID === socket.userID) socket._tmpRecipient= startByID;
        if(startByID === socket.userID) socket._tmpRecipient = recipientID;

        if(!socket._tmpRecipient) return false;
            // console.log(socket._tmpRecipient);
            // const socketRecipient = connectedUsers.find(socket=> socket.userID === socket._tmpRecipient)

        const updateBDD = await Conversation.findByIdAndUpdate(idConversation,{$push:{
                                            messages:{
                                                sendBy: socket.userID,
                                                message:msg,
                                                date:Date.now()
                                                }
                                            }
                                        })

        console.log(updateBDD);
            
        connectedUsers.forEach(sock=>{
            if(sock.userID === socket._tmpRecipient){
                sock.socket.emit('message', msg, idConversation )
            }
        })
            // console.log(socketRecipient);

            // socket.emit('message',msg)

        // if(socket.idConversation.indexOf(idConversation) !== -1){
        //     console.log('already exist');
        //     console.log(socket.idConversation.indexOf(idConversation))
        // }else{
        //     socket.idConversation.push(idConversation)
        // }
    })
    socket.on('disconnect', ()=>{
        const index = connectedUsers.indexOf(socket);
        if(index > -1){
            connectedUsers.splice(index,1)
        }
    })
    // socket.on('')
    socket.on('send message',function (msg, recipient , idConversation = false ) {
        if(!socket.userID && recipient) return false;
        console.log('ixixi');
        // console.log(('ici'));

        const user = require('./models/User');
        const conversation = require("./models/Conversation")
        let error = false;
        if(!idConversation ){
            const newConversation = new conversation({startByID: socket.userID , recipientID: recipient});
            newConversation.messages.push({sendBy:socket.userID, message: msg, date: Date.now()});
            newConversation.save()
                .then(conversation=>{
                    const idConversation = conversation._id
                    socket.emit('new conversation', {conversation_ID: idConversation, with_id: recipient })
                    
                    let update = {}

                    update.$push = {conversation: {conversation_ID: idConversation, with_id: recipient  } };
                    user.findByIdAndUpdate(socket.userID, update, (err, res)=>{
                        if(err) return error = true, console.log(err);;
                    } )

                    update.$push = {conversation: {conversation_ID: idConversation, with_id: socket.userID  } };
                    user.findByIdAndUpdate(recipient, update, (err, res)=>{
                        if(err) return error = true, console.log(err);;
                    } )
                })
                .catch(err=>{
                    console.log("User not found",err);
                    error = true;
                })
        }else{
            console.log(idConversation);
            conversation.findByIdAndUpdate(idConversation,{$push:{messages:{sendBy:socket.userID, message: msg, date: Date.now()}}}, (err, result)=>{
                if(err) return error = true, console.log(err);
            })
        }
        

        const socketRecipient = connectedUsers.find(socket=> socket.userID === recipient)

        if(socketRecipient && !error){
            socketRecipient.emit('notification', {message:{sender: socket.userID, message: msg}})
        }
    })

    // socket.idConversation.forEach(idConv =>{
    //     socket.join(idConv, (e)=>{
    //         console.log('connected to room '+ idConversation);
    //     })
    // })


})



server.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON PORT 3001");
})