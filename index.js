const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const UserDb = require('./models/userSchema');

const app = express();

//setting up the view engine to ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// set up the middleware for the static files like css images frontend javascript and images 
app.use(express.static('./static'));
 

//middleware for the layouts
app.use(expressEjsLayouts);
// to extract the style and script and place in appropriate place in html document
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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