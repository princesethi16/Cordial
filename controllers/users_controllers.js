// controller callback functions for the users

const UserDb = require('../models/userSchema');
const Cookie = require('../models/cookieSchema');

// this is callback function used by users route file

// show the feed to the logged in user
module.exports.feed = (req, res) => {
    let id = req.cookies.user_id;
    
    Cookie.findOne({user_id: id},(err,results)=>{
        if (err) { console.log("error in finding the cookie in signing up;", err); return; }
        if(!results){
            return res.redirect('/authentication/sign-in');
        }
    });


    UserDb.findById(id, (err,foundUser)=>{
        if (err) { console.log("error in finding the user in signing up;", err); return; }
        
        else if(foundUser){
            return res.render('feed', {
                title: foundUser.name,
                user: foundUser
            });
        }

    });


};



// create new account of user
module.exports.create = (req, res) => {

    var userDetails = req.body;
    UserDb.findOne({ email: userDetails.email }, (err, user) => {
        if (err) { console.log("error in finding the user in signing up;", error); return; }
        
        // user not found/ register user
        if (!user) {
            UserDb.create(userDetails, (err, user) => {
                if (err) { console.log("error in creating user during sign up:", err); return; }
                return res.redirect('/authentication/sign-in')
            });
        }

        // user email already present in db/ user is already registered
        else if(user){
            return res.redirect('back');
        }

    });

};

// create new session for existing user
module.exports.createSession = (req, res) => {


    //steps to manually authenticate the user
    //1. match the email of sign in req and find user
    UserDb.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            if (err) { console.log("error in finding the user in signing up;", error); return; }

            //2. if email found, then match the password
            else if (user.password != req.body.password) {
                return res.redirect('back');
            }

            else if (user.password == req.body.password) {
                //3. create the cookie and create their session
                res.cookie('user_id',user.id);
                //store the cookie in db
                Cookie.create({user_id: user.id},(err,cookie)=>{
                    if (err) { console.log("error in finding the user in signing up;", error); return; }
                    else{
                        return;
                    }
                });
                // console.log(req.cookies);

                //4. redirect to their feed page
                return res.redirect('/users/feed');
            }
        }

        else{
            //** if email not found redirect to sign-in
            return res.redirect('back');
        }

    });
};

module.exports.endSession = (req, res) => {
    // find and delete the cookie in db
    Cookie.deleteOne({user_id: req.cookies.user_id},(err)=>{
        if(err){
            console.log('error in deleting the cookie:', err);
            return;
        }
    });
    res.cookie('user_id','1',{maxAge: -1});
    return res.redirect('/authentication/sign-in');
};
