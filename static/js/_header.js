

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
                let chatBox = addFriendToFriendsDiv(data.from_user,data.friendshipId);
                new ChatEngine(`user-chat-box-${data.friendshipId}`,`${data.to_user.email}`,`${data.friendshipId}`);
            }
        },
        error: function(error){
            console.log(error.responseText);
        }
    })
}

function addFriendToFriendsDiv(from_user,friendshipId){
    let targetDiv = $(' #right-friends-div');
    return targetDiv.append(`
        <div class="text-start p-2 pe-3 mt-1 container d-flex justify-content-between" >
            <p class="mb-0 d-inline-block " style="max-width: 150px;">
                <a class="text-decoration-none" href="profile/${from_user._id}" >
                    <img src="${from_user.avatar}" style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt="">
                    ${from_user.name}
                </a>
            </p>
            <div class = "Container-btn" style="display: inline-block;">
                <p class="mb-0">
                    <a class="" data-bs-toggle="collapse" href="#chat_box_collapse-${friendshipId}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fas fa-comments me-2"></i>
                    </a>
                </p>
            </div>
        </div>
        <div class="chat-box collapse" id="chat_box_collapse-${friendshipId}">
            <div class="Container" id="user-chat-box-${friendshipId}">
                <div class="chat_box">
                    <div class="head">
                        <div class="user">
                            <div class="avatar">
                                <img src="${from_user.avatar}" style="height: 50px; width: 50px;" />
                            </div>
                            <div class="name">${from_user.name}</div>
                            <div class="typing hide">
                                
                                <div class="bubble">
                                    <span>Typing</span>
                                    <div class="ellipsis dot_1"></div>
                                    <div class="ellipsis dot_2"></div>
                                    <div class="ellipsis dot_3"></div>
                                </div>
                            </div> 
                        </div>
                        <ul class="bar_tool">
                            <li><span class="alink"><i class="fas fa-phone"></i></span></li>
                            <li><span class="alink"><i class="fas fa-video"></i></span></li>
                            <li><span class="alink"><a href="close" class="chat-box-close"><i class="fas fa-window-close"></i></a></span></li>
                        </ul>
                    </div>
                    <div class="body">
                    
                        
                    </div>
                    <div class="foot">
                        <input type="text" class="msg" id="input-message-div-${friendshipId}" placeholder="Type a message..." />
                        <button type="button" id="send-message-${friendshipId}" ><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `);
}

