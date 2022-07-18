const express = require('express');
const app = express();
// const helmet = require("helmet");

const UserRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// app.use(helmet());


const mongoose = require('mongoose');
const db = {
    username: 'admin',
    password: '33HmJt6pjklLDZG8',
}
// const uriMongodb = `mongodb+srv://${db.username}:${db.password}@Cluster0.xe73p.mongodb.net/${db.Name}?retryWrites=true&w=majority`
const MONGODB_URI = `mongodb+srv://${db.username}:${db.password}@cluster0.flrds.mongodb.net/?retryWrites=true&w=majority`;
// console.log(process.env);

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    const corsWhitelist = [
        'http://localhost:3000',
        'https://localhost:3000'
    ];

    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    }
    next();
});
app.use(express.json());

const bodyParser = require('body-parser')



//==================== Routes =======================
app.use('/api/auth', UserRoutes);
// app.use('/api/sauces', saucesRoutes);
app.use('/api/Post/',postRoutes);
app.use('/images', express.static(__dirname + '/images'));





module.exports = app;