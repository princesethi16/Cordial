// controller callback functions for the users

// this is callback function used by users route file
module.exports.profile = (req,res)=>{
    return res.end('<h1>User Profile page loaded!</h1>')
};
