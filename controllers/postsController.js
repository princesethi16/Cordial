// callback function for the posts

module.exports.posts = (req,res)=>{
    return res.render('posts',{
        title: "Posts"
    });
};