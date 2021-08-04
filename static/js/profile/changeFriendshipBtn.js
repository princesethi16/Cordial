class ChangeBtnClass{
    constructor(btn){
        this.btn = btn;
    }

    addClick(){
        this.btn.click((e)=>{
            e.preventDefault();
            this.ajaxCallForChangingFriendship();
        });
    }

    changeBtn(data,action){
        console.log(action);
        let btnDiv = $(' #friendshipBtnDiv');
        btnDiv.html('');
        if(action== 'accept' || action== 'reject'){
            console.log(action);
            let notificationElement = $(` #FriendRequestElement-${data.friendshipId}`);
            notificationElement.remove();
            if(action == 'accept'){
                return btnDiv.append(`
                    <a href="/users/send-friend-request/unfriend/?friendship=${data.friendshipId}" data-action="unfriend" class="friendshipActionBtn"><button type="button" class="btn btn-outline-danger" ><i class="fas fa-user-times me-2"></i><span> Unfriend</span></button></a>
                `);
            }
            else{
                return btnDiv.append(`
                <a href="/users/send-friend-request/?from_user=${data.to_user._id}&to_user=${data.from_user._id}" data-action="add friend" class="friendshipActionBtn"><button type="button" class="btn btn-info" ><i class="fas fa-user-plus me-2"></i><span> Add Friend</span></button></a>

                `);
            }
        }
        else if(action == 'cancel'){
            return btnDiv.append(`
            <a href="/users/send-friend-request/?from_user=${data.from_user._id}&to_user=${data.to_user._id}" data-action="add friend" class="friendshipActionBtn"><button type="button" class="btn btn-info" ><i class="fas fa-user-plus me-2"></i><span> Add Friend</span></button></a>

            `);
        }
        else if(action == 'add friend'){
            return btnDiv.append(`
            <a href="/users/send-friend-request/reply/?friendship=${data.friendshipId}&reply=reject&to_user=${data.to_user}" class="friendshipActionBtn" data-action="cancel"><button type="button" class="btn btn-secondary"><i class="fas fa-user-times me-2"></i><span> Cancel Request</span></button></a>
            `);
        }
        else if(action == 'unfriend'){
            return btnDiv.append(`
            <a href="/users/send-friend-request/?from_user=${data.locals_userId}&to_user=${data.currUserId}" class="friendshipActionBtn" data-action="add friend"><button type="button" class="btn btn-info"><i class="fas fa-user-plus me-2"></i><span> Add Friend</span></button></a>

            `);
        }
    }


    ajaxCallForChangingFriendship(){


        let url = this.btn.attr('href');
        let action = this.btn.attr('data-action');
    
        $.ajax({
            type: 'Post',
            url: url,
            success: (data)=>{
                
                let new_btnDiv = this.changeBtn(data,action);
                let new_btn = new_btnDiv.find('a');
                console.log(new_btn);
                console.log(data);
                new_btn = new ChangeBtnClass($(new_btn));
                new_btn.addClick();
                
            },
            error: function(error){
                console.log(error.responseText);
            }
        })
    }

    
}

let changeFriendshipBtns = $(' .friendshipActionBtn');
for(let i = 0 ;i<changeFriendshipBtns.length; i++){
    let btn = changeFriendshipBtns.eq(i);
    let classBtn = new ChangeBtnClass(btn);
    classBtn.btn.click(function(e){
        e.preventDefault();
        
        classBtn.ajaxCallForChangingFriendship();
    });
}