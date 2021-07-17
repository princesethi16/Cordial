// callback function for the posts

module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title: "Profile"
    });
};