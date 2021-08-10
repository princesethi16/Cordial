let friendRequest_Btn=$("#friendRequest-btn");friendRequest_Btn.click(function(e){e.preventDefault(),$(" #friendRequestBadge").hide();e=$(this).attr("href");toggleDiv=$(` #${e}`),toggleDiv.toggleClass("show"),friendRequest_Btn.toggleClass("no-focus blued")});let friendRequestReplyBtns=$(" .friendRequestReplyBtn");for(let s=0;s<friendRequestReplyBtns.length;s++){let e=friendRequestReplyBtns.eq(s);e.click(function(e){e.preventDefault(),replyToFriendRequest($(this))})}function replyToFriendRequest(e){var s=e.attr("data-reply");friendRequestAjax(e,s)}function friendRequestAjax(e,a){e=e.attr("href");let t;t="accept"==a?"Request Accepted!":"Request Deleted",$.ajax({type:"Post",url:e,success:function(s){let e=$(` #friendReqReplyDiv-${s.friendshipId}`);e.html(t);let i=$(` #FriendRequestElement-${s.friendshipId}`);if(i.css("background-color","rgb(218, 233, 247)"),"accept"==a){let e=addFriendToFriendsDiv(s.from_user,s.friendshipId);console.log("frnd added to list"),new ChatEngine(`user-chat-box-${s.friendshipId}`,`${s.to_user.email}`,`${s.friendshipId}`),console.log("chatbox added"),console.log(e),console.log($(e)),e=new ChatBoxBody($(e)),e.closeChatBox()}},error:function(e){console.log(e.responseText)}})}function addFriendToFriendsDiv(e,s){let i=$(" #right-friends-div");return i.append(`
        <div class="text-start p-2 pe-3 mt-1 container d-flex justify-content-between" >
            <p class="mb-0 d-inline-block " style="max-width: 150px;">
                <a class="text-decoration-none" href="/users/profile/${e._id}" >
                    <img src="${e.avatar}" style="height: 30px;width: 30px; border-radius: 50%; margin-right: 10px;" alt="">
                    ${e.name}
                </a>
            </p>
            <div class = "Container-btn" style="display: inline-block;">
                <p class="mb-0">
                    <a class="" data-bs-toggle="collapse" href="#chat_box_collapse-${s}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fas fa-comments me-2"></i>
                    </a>
                </p>
            </div>
        </div>
        <div class="chat-box collapse" id="chat_box_collapse-${s}">
            <div class="Container" id="user-chat-box-${s}">
                <div class="chat_box">
                    <div class="head">
                        <div class="user">
                            <div class="avatar">
                                <img src="${e.avatar}" style="height: 50px; width: 50px;" />
                            </div>
                            <div class="name">${e.name}</div>
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
                        <input type="text" class="msg" id="input-message-div-${s}" placeholder="Type a message..." />
                        <button type="button" id="send-message-${s}" ><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `)}