// order of including library and setting up middleware is very important

const express = require('express');
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const UserDb = require('./models/userSchema');
const flash = require('connect-flash');
var cors = require('cors');
const customMiddleware = require('./config/customMiddleware');

//for adding socket.io to the app
const http = require('http');
const chatServer = http.createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chatServer is listening on port:',5000);



// mailer for notifications
const nodemailer = require('nodemailer');

// for user authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// for storting session cookie and session details in mongodb
const MongoStore = require('connect-mongo');

// to parse the cookie in req.body
const cookieParser = require('cookie-parser');

// sass package
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './static/sass',
    dest: './static/css',
    prefix: '/css',
    debug: true,
    outputStyle: 'extented' 
}));


// telling app to use urlencoder inorder to parse the req.body data
app.use(express.urlencoded());

// telling app to use cookie parser
app.use(cookieParser());

//setting up the view engine to ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// to create a log in session we use middleware of express-session just after views
app.use(session({
    name: 'Cordial',
    // TODO change the secret before deployment in production mode
    secret: 'blahblahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // set the time duration until cookie will be valid
    },
    //mongo store is used to store the session cookie and details in db 
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost:27017/cordial_development',
            autoRemove: 'disabled '
        },
        function(err){
            console.log(err || 'connect-mongo set up: ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

// set the user who is authenticated to show their relevant data in views
app.use(passport.setAuthenticatedUser);

// set up the middleware for the static files like css images frontend javascript and images 
app.use(express.static('./static'));

// to make the uploads path available to browser for getting the uploaded files
app.use('/uploads',express.static(__dirname + '/uploads'));

//middleware for the layouts
app.use(expressEjsLayouts);
// to extract the style and script and place in appropriate place in html document
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up the flash***
app.use(flash());

// middleware for the flash***
app.use(customMiddleware.flash);

// for allowing the cross origin requests=== cors is used ***
app.use(cors());

// import the router module for use
var router = require('./routes/home');

// use the express router
app.use('/', router);


app.listen(port,(err)=>{
    if(err){
        console.error(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);

});