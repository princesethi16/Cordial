class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(` #${chatBoxId}`);
        this.userEmail = userEmail;
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
            
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatRoom: 'cordial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });

            let inputMsgDiv = $('#input-message-div');
            inputMsgDiv.keypress(function(){
            
                self.socket.emit('userTyping',{
                    
                    user_email: self.userEmail,
                    chatRoom: 'cordial',
                    isTyping: true
                });
                
            });
            self.socket.on('friendTyping',function(data){
                console.log(data.isTyping);
                if(self.userEmail != data.user_email){
                    
                    console.log('typing')
                    friendTyping(data);
                }     
            });
            inputMsgDiv.focusout(function(){
            
                self.socket.emit('userStoppedTyping',{
                    user_email: self.userEmail,
                    chatRoom: 'cordial',
                    isTyping: false
                });
            });
            self.socket.on('friendStoppedTyping',function(data){
                console.log(data.isTyping)
                if(self.userEmail != data.user_email){
                    console.log('stopped typing')

                    friendTyping(data);
                }     
            });
            
            
            let sendBtn = $('#send-message');
            sendBtn.click(function(){
                let inputMsgDiv = $('#input-message-div');
                let msg = inputMsgDiv.val();
                if(msg != ''){
                    inputMsgDiv.val('');
                    self.socket.emit('send_message',{
                        user_email: self.userEmail,
                        chatRoom: 'cordial',
                        msg: msg
                    });
                }
                
            });
        

            self.socket.on('recieve_message',function(data){
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
    let chatDiv = $('.body');
    chatDiv.prepend(`
        <li class="${msgType}">
            <div class="bubble">
                <p>${data.msg}</p>
            </div>
        </li>
    `);
}

function friendTyping(data){
    let typingDiv = $('.typing');
    if(data.isTyping){
        typingDiv.removeClass('hide');
    }
    else{
        typingDiv.addClass('hide');
    }
}