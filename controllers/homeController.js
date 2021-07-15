// controller for the home path************

//syntax:= module.exports.actionName = func(req,res){.......code.....};

module.exports.home = (req,res)=>{

    console.log(req.cookies);
    res.cookie('user_id',32);

    return res.render('home',{
        title: "Home"
    });
};