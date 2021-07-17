// controller callback functions for the users



// this is callback function used by users route file
module.exports.feed = (req,res)=>{
    return res.render('feed',{
        title: "Feed"
    });
};

