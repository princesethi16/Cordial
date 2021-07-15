// controller callback functions for the users

// this is callback function used by users route file
module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title: "Profile"
    });
};

// create new account of user
module.exports.create = (req,res)=>{
    // to do later :=> logic
    // create route later
};

// create new session for existing user
module.exports.createSession = (req,res)=>{
    // to do later :=> logic
    // create route later
};
