// controller callback functions for the users

const UserDb = require('../models/userSchema');

// this is callback function used by users route file
module.exports.profile = (req, res) => {
    return res.render('profile', {
        title: "Profile"
    });
};

// create new account of user
module.exports.create = (req, res) => {
    var userDetails = req.body;
    UserDb.findOne({ email: userDetails.email }, (err, user) => {
        if (err) { console.log("error in finding the user in signing up;", error); return; }

        if (!user) {
            UserDb.create(userDetails, (err, user) => {
                if (err) { console.log("error in creating user during sign up:", err); return; }
                return res.redirect('/authentication/sign-in')
            });
        }

        else {
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
                res.cookie('user_id',user._id);
                // console.log(req.cookies);

                //4. redirect to their profile page
                return res.redirect('/users/profile');
            }
        }

        else{
            //** if email not found redirect to sign-in
            return res.redirect('back');
        }

    });
};
