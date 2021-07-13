// controller for the home path************

//syntax:= module.exports.actionName = func(req,res){.......code.....};

module.exports.home = (req,res)=>{
    return res.end('<h1>Cordial is Up and Running</h1>');
};