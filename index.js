const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session=require('express-session');

const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy'); 
const paspportJWT = require('./config/passport-jwt-strategy');
const paspportGoogle =  require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5001);
console.log('chat server is listening on port 5001');


app.use(express.json());


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

// make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.static('./assets'));

app.use(expressLayouts); 
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//mongoStore is used to store the session cookie in the db

app.use(session({
    name: 'codial',
    //TODO change the secret before deployement
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:  MongoStore.create(
        {
        
            mongoUrl: 'mongodb://0.0.0.0:27017/codeial_development' ,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
