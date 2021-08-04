const Friendship = require('../models/friendshipSchema');
const User = require('../models/userSchema');

module.exports.sendRequest = async (req,res)=>{

    
    // get the both users Id
    let from_userId = req.query.from_user;
    let to_userId = req.query.to_user;
    let friendship = await Friendship.create({
        from_user: from_userId,
        to_user: null
    });
    // get the users from db
    let from_user = await User.findById(from_userId);
    let to_user = await User.findById(to_userId);
    // add the friendship to the friends of from-user
    from_user.friends.push(friendship._id);
    from_user.save();
    // add the friendship in both friend and friendrequest arrays of to_user
    to_user.friendRequests.push(friendship._id);
    to_user.friends.push(friendship._id);
    to_user.save();
    // send the friendship in json res to extract the from user
    if(req.xhr){
        return res.status(200).json({
            message: 'friendship post successfully',
            friendshipId: friendship._id,
            friendship: friendship,
            to_user: to_user._id
        });
    }

    return res.redirect('back');
};

module.exports.replyToRequest = async (req,res)=>{
    // /users/send-friend-request/?friendship=<%= friendRequest.id %>&reply=accept&to_user=to_userId if cancel req else null
    try{
        let req_user = req.user;
        let friendshipId = req.query.friendship;
        let reply = req.query.reply;

        let friendship = await Friendship.findById(friendshipId);
        if(friendship){
            let from_userId = friendship.from_user;
            let from_user = await User.findById(from_userId);
            let to_user;

            if(req.query.to_user){
                to_user = req.query.to_user;
                to_user = await User.findById(to_user);
                console.log('cancel rqst');
            }
            else{
                to_user = await User.findById(req_user._id);
                console.log('delete reqst')
            }
            
            if(reply == 'accept'){
                friendship.to_user = to_user._id;
                friendship.save();
                // only delete the frndrqst in to_user
                to_user.friendRequests.pull(friendshipId);
                to_user.save();
                
            }
            else{
                

                // if type is reject then req.user will be to_user of friendship
                // if type is cancel then req.user will be from_user of friendship hence swapping is necessary

                
                

                friendship.remove();
                
                from_user.friends.pull(friendshipId);
                to_user.friendRequests.pull(friendshipId);
                to_user.friends.pull(friendshipId);
                to_user.save();
                from_user.save();
            }
            if(req.xhr){
                return res.status(200).json({
                    message: 'replied post successfully',
                    friendshipId: friendshipId,
                    from_user: from_user,
                    to_user: to_user
                });
            }
        }
        return res.redirect('back');
    }
    catch(err){
        console.log('error in repling the frndship rqst:',err);
        if(req.xhr){
            return res.status(500).json({
                message: 'error in posting the reply of friend request at server side!'
            });
        }
        return res.redirect('back');
    }
};

module.exports.unfriend = async (req,res)=>{
    let friendshipId = req.query.friendship;

    try{
        let friendship = await Friendship.findById(friendshipId);
        let from_user = await User.findById(friendship.from_user);
        let to_user = await User.findById(friendship.to_user);
        from_user.friends.pull(friendship._id);
        to_user.friends.pull(friendship._id);
        from_user.save();
        to_user.save();
        let currUser;
        if(from_user.id == req.user.id){
            currUser = to_user;
        }
        else{
            currUser = from_user;
        }
        friendship.remove();
        if(req.xhr){
            return res.status(200).json({
                message: 'Friendship Deleted Successfully',
                locals_userId: req.user._id,
                currUserId: currUser._id
            });
        }
        return res.redirect('back');
    }
    catch(err){
        console.log('error in unfriending:',err);
        return res.redirect('back');
    }
}