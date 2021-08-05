class ChatEngine{
    constructor(chatBoxId,userEmail,userFriendshipId){
        this.chatBox = $(` #${chatBoxId}`);
        this.userEmail = userEmail;
        this.userFriendshipId = userFriendshipId;
        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        // in "function" syntax this will change hence we store this in self
        // or we can use the arrow func syntax
        let self = this;


        this.socket.on('connect',function(){
            console.log('connection established using sockets...!')
            
            self.socket.emit(`join_room`,{
                user_email: self.userEmail,
                chatRoom: `${self.userFriendshipId}`
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });

            let inputMsgDiv = $(`#input-message-div-${ self.userFriendshipId }`);
            inputMsgDiv.keypress(function(){
            
                self.socket.emit('userTyping',{
                    
                    user_email: self.userEmail,
                    chatRoom: `${self.userFriendshipId}`,
                    isTyping: true
                });
                
            });
            self.socket.on('friendTyping',function(data){
                console.log('friend typing');
                if(self.userEmail != data.user_email){
                    
            
                    friendTyping(data);
                }     
            });
            inputMsgDiv.focusout(function(){
            
                self.socket.emit('userStoppedTyping',{
                    user_email: self.userEmail,
                    chatRoom: `${self.userFriendshipId}`,
                    isTyping: false
                });
            });
            self.socket.on('friendStoppedTyping',function(data){
                console.log('frind typing stoppped')
                if(self.userEmail != data.user_email){
                    

                    friendTyping(data);
                }     
            });
            
            
            let sendBtn = $(`#send-message-${self.userFriendshipId}`);
            sendBtn.click(function(){
                let inputMsgDiv = $(`#input-message-div-${self.userFriendshipId}`);
                let msg = inputMsgDiv.val();
                if(msg != ''){
                    inputMsgDiv.val('');
                    self.socket.emit('send_message',{
                        user_email: self.userEmail,
                        chatRoom: `${self.userFriendshipId}`,
                        msg: msg
                    });
                }
                
            });
        

            self.socket.on('recieve_message',function(data){
                console.log(data);
                addMsgToChat(self.userEmail,data);
            });


        });
    }
}

function addMsgToChat(thisUserEmail,data){
    let msgType = 'incoming';
    if(thisUserEmail == data.user_email){
        msgType = 'outgoing';
    }
    // append the li in chat
    let chatBox = $(`#chat_box_collapse-${data.chatRoom}`);
    console.log(chatBox);
    let chatDiv = chatBox.find('.body');
    chatDiv.prepend(`
        <li class="${msgType}">
            <div class="bubble">
                <p>${data.msg}</p>
            </div>
        </li>
    `);
}

function friendTyping(data){
    let chatBox = $(`#chat_box_collapse-${data.chatRoom}`);
    let typingDiv = chatBox.find('.typing');
    if(data.isTyping){
        typingDiv.removeClass('hide');
    }
    else{
        typingDiv.addClass('hide');
    }
}