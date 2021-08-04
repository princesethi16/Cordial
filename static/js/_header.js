

let friendRequest_Btn = $('#friendRequest-btn');

friendRequest_Btn.click(function(e){
    e.preventDefault();
    $(' #friendRequestBadge').hide();
    let toggleDivId = $(this).attr('href');
    toggleDiv = $(` #${toggleDivId}`);
    toggleDiv.toggleClass('show');
    friendRequest_Btn.toggleClass('no-focus blued');

}) ;

//Make the friendrequest reply dynamic

let friendRequestReplyBtns = $(' .friendRequestReplyBtn');
for(let i = 0; i<friendRequestReplyBtns.length; i++ ){
    let btn = friendRequestReplyBtns.eq(i);
    btn.click(function(e){
        e.preventDefault();
        replyToFriendRequest($(this));
    });
}

function replyToFriendRequest(btn){
    let reply = btn.attr('data-reply');
    console.log(reply);
        friendRequestAjax(btn,reply);
    return;
}

function friendRequestAjax(btn,reply){
    let url = btn.attr('href');
    let htmlString;
    if(reply == 'accept'){
        htmlString = 'Request Accepted!'
    }else{
        htmlString = 'Request Deleted'
    }
    $.ajax({
        type: 'Post',
        url: url,
        success: function (data){
            let div = $(` #friendReqReplyDiv-${data.friendshipId}`);
            div.html(htmlString);
            let wholeElement = $(` #FriendRequestElement-${data.friendshipId}`);
            wholeElement.css('background-color','rgb(218, 233, 247)');
            if(reply == 'accept'){
                addFriendToFriendsDiv(data.from_user);
            }
        },
        error: function(error){
            console.log(error.responseText);
        }
    })
}

function addFriendToFriendsDiv(from_user){
    let targetDiv = $(' #right-friends-div');
    targetDiv.append(`
        <h6 class="text-start p-2 mt-3" >
            <p class="mb-0">
                <a class="text-decoration-none" href="profile/${from_user._id}" >
                    <img src="${from_user.avatar}" style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt="">
                    ${from_user.name}
                </a>
            </p>
        </h6>
    `);
}
