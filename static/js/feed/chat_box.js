class ChatBoxBody{
    constructor(chatBox,user){
        this.chatBox = chatBox;
        this.user = user;
    }
    closeChatBox(){
        let closeBtn = this.chatBox.find('.chat-box-close');
        console.log(closeBtn);
        closeBtn.click((e)=>{
            
            e.preventDefault();
            console.log('close btn');
            this.chatBox.toggleClass('show')
        });
    }
}

let allChatBoxes = $('.chat-box');
for(let i=0;i<allChatBoxes.length;i++){
    let chatBox = new ChatBoxBody(allChatBoxes.eq(i));
    chatBox.closeChatBox();
}