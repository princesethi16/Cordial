// controller for the sign in and sign up

// this is callback function used by signInUp route file
module.exports.signIn = (req,res)=>{
    return res.render('sign_in',{
        title: "Sign In"
    });
};
module.exports.signUp = (req,res)=>{
    return res.render('sign_up',{
        title: "Sign Up"
    });
};