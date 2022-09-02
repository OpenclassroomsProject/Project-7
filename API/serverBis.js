// const {Server} = require('socket.io');
require("dotenv").config()
var express = require('express');
var app = express();
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
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    
//==================== Routes =======================
const UserRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const profilRoutes = require('./routes/profil');
const auth = require("./middleware/auth");

app.use('/api/auth', UserRoutes);
app.use('/api/post/',auth,  postRoutes);
app.use('/api/profil/',auth, profilRoutes);
app.use('/images', express.static(__dirname + '/images'));

const io =new Server(server,{
    cors:{
        origin:["http://localhost:3000","http://192.168.1.50:3000"],
        methods:["GET", "POST"]
    }
})
io.on('connection', (socket)=>{
    console.log(`User Connected: ${socket.id}`);
})

server.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON PORT 3001");
})