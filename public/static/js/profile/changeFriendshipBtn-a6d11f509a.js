class ChangeBtnClass{constructor(n){this.btn=n}addClick(){this.btn.click(n=>{n.preventDefault(),this.ajaxCallForChangingFriendship()})}changeBtn(e,s){console.log(s);let t=$(" #friendshipBtnDiv");if(t.html(""),"accept"!=s&&"reject"!=s)return"cancel"==s?t.append(`
            <a href="/users/send-friend-request/?from_user=${e.from_user._id}&to_user=${e.to_user._id}" data-action="add friend" class="friendshipActionBtn"><button type="button" class="btn btn-info" ><i class="fas fa-user-plus me-2"></i><span> Add Friend</span></button></a>

            `):"add friend"==s?t.append(`
            <a href="/users/send-friend-request/reply/?friendship=${e.friendshipId}&reply=reject&to_user=${e.to_user}" class="friendshipActionBtn" data-action="cancel"><button type="button" class="btn btn-secondary"><i class="fas fa-user-times me-2"></i><span> Cancel Request</span></button></a>
            `):"unfriend"==s?t.append(`
            <a href="/users/send-friend-request/?from_user=${e.locals_userId}&to_user=${e.currUserId}" class="friendshipActionBtn" data-action="add friend"><button type="button" class="btn btn-info"><i class="fas fa-user-plus me-2"></i><span> Add Friend</span></button></a>

            `):void 0;{console.log(s);let n=$(` #FriendRequestElement-${e.friendshipId}`);return n.remove(),"accept"==s?t.append(`
                    <a href="/users/send-friend-request/unfriend/?friendship=${e.friendshipId}" data-action="unfriend" class="friendshipActionBtn"><button type="button" class="btn btn-outline-danger" ><i class="fas fa-user-times me-2"></i><span> Unfriend</span></button></a>
                `):t.append(`
                <a href="/users/send-friend-request/?from_user=${e.to_user._id}&to_user=${e.from_user._id}" data-action="add friend" class="friendshipActionBtn"><button type="button" class="btn btn-info" ><i class="fas fa-user-plus me-2"></i><span> Add Friend</span></button></a>

                `)}}ajaxCallForChangingFriendship(){var n=this.btn.attr("href");let t=this.btn.attr("data-action");$.ajax({type:"Post",url:n,success:n=>{let e=this.changeBtn(n,t),s=e.find("a");console.log(s),console.log(n),s=new ChangeBtnClass($(s)),s.addClick()},error:function(n){console.log(n.responseText)}})}}let changeFriendshipBtns=$(" .friendshipActionBtn");for(let s=0;s<changeFriendshipBtns.length;s++){let n=changeFriendshipBtns.eq(s),e=new ChangeBtnClass(n);e.btn.click(function(n){n.preventDefault(),e.ajaxCallForChangingFriendship()})}