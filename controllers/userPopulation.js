module.exports.popupate_user_friendRequests = async (user)=>{
    user = await user.populate(
        {
            path: 'friendRequests',
            populate: 'from_user'   
        }
    )
    .execPopulate();
    return user
};

module.exports.getFriends = async (user)=>{
    
    user = await user.populate(
        {
            path: 'friends',
            populate: 'from_user to_user'
        }
    ).execPopulate();

    let friendsArray = new Array();

    for(let friendship of user.friends){
        // console.log(friend);
        let currentFriend;
        if(friendship.from_user.id == user.id){

            if(friendship.to_user == null){
                currentFriend = {
                    id: 'not friends yet'
                }
            }
            else{
                currentFriend = friendship.to_user;
            }
            friendsArray.push({
                friend: currentFriend,
                friendshipId: friendship.id,
                friendship: friendship
            });
        }
        else {
            if(friendship.to_user == null || friendship.to_user.id == user.id){
                currentFriend = friendship.from_user;
                friendsArray.push({
                    friend: currentFriend,
                    friendshipId: friendship.id,
                    friendship: friendship
                });
            }
        }
        
    }

    console.log(friendsArray);

    return friendsArray;
};

