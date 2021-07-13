// controller callback functions for the users

// this is callback function used by users route file
module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title: "Profile"
    });
};
