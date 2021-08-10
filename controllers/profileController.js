// callback function for the posts
const User = require('../models/userSchema');
const Post = require('../models/postSchema');
const fs = require('fs');
const path = require('path');
const userPopulation = require('./userPopulation');
const Friendship = require('../models/friendshipSchema');



module.exports.profile = async (req,res)=>{
    let loggedInUser = req.user;
    let userId = req.params.user;
    try{
        let user =await User.findOne({_id: userId});
        user = await user.populate('friendRequests').execPopulate();

        loggedInUser = await userPopulation.popupate_user_friendRequests(loggedInUser);    

        let friendships_Of_LoggedInUser = await userPopulation.getFriends(loggedInUser);

        let currFriendship;
        let currFriend;
        for(let friendship of friendships_Of_LoggedInUser){
            if(user.id == friendship.friend.id || friendship.friend.id == 'not friends yet'){
                currFriendship = friendship.friendship;
                currFriend = friendship.friend;
            }
        }
        let friendshipStatus;
        if(currFriendship){

            if(currFriendship.from_user.id == loggedInUser.id){
                if(currFriend.id == user.id){
                    friendshipStatus = 'Friends';
                }
                else{
                    friendshipStatus = 'Request sent';
                }
            }
            else{
                if(currFriendship.from_user.id == user.id){
                    if(currFriendship.to_user && currFriendship.to_user.id == loggedInUser.id){
                        friendshipStatus = 'Friends';
                    }
                    else{
                        friendshipStatus = 'Confirm Request'
                    }
                }
            }
        }
        else{
            friendshipStatus = 'Not Friend';
            
        }

        let posts = await Post.find({user: user._id})
        .populate('user')
        .populate(
            {
                path: 'comments', // populate each comment in comments array
                populate: // populate each specified field of comment
                {
                    path: 'user',// populate user field of comment
                    

                }
            }
        )
        .populate(
            {
                path: 'comments',
                populate:
                {
                    path: 'likes',
                    populate: {
                        path: 'user'
                    }
                }
            }
        )
        .populate(
            {
                path: 'likes',
                populate: {
                    path: 'user'
                }
            }
        );

        
        return res.render('profile',{
            title: "Profile",
            user: loggedInUser,
            currUser: user,
            friendships_Of_LoggedInUser: friendships_Of_LoggedInUser,
            currFriendship: currFriendship,
            currFriendshipStatus: friendshipStatus,
            posts: posts
        });
    }catch(err){
        console.log('error in loading the profile page',err);
        return res.redirect('back');
    }
};

module.exports.editProfile = async (req,res)=>{
    let userId = req.params.user;
    if(req.user.id == userId){
        try{
            let user = await User.findById(userId);
        
        // since enctpe is multiformat hence req.body can only be parsed by the multer
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('********Multer error:',err); return; }
            let userName = req.body.name;
            let userEmail = req.body.email;

            user.name = userName;
            user.email = userEmail;
            if(req.file){
                
                // if user's avatar is already present then remove the existing and then save new
                if(fs.existsSync(path.join(__dirname,'..',user.avatar)) && path.join(user.avatar) != path.join('/uploads/users/avatars/default/default-avatar.png'))
                {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                // path of uploaded image should be stored in user's db
                user.avatar = User.AvatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
            
        });

        }catch(err){
            console.log('error in editing the user profile',err);
            return res.redirect('back');
        }

    }
    else{
        return res.redirect('back');
    }
};

