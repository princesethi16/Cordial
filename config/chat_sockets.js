const Friendship = require('../models/friendshipSchema');

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved',socket.id);
        
        socket.on('disconnect',function(){

            console.log('connection disconnected!',socket.id);
        });
    
        socket.on('join_room',function(data){
            console.log('joining request recieved',data);
            socket.join(data.chatRoom);
            io.in(data.chatRoom).emit('user_joined',data);
        });
        
        socket.on('userTyping',function(data){
        
            io.in(data.chatRoom).emit('friendTyping',data);
        });
        socket.on('userStoppedTyping',function(data){
            
            io.in(data.chatRoom).emit('friendStoppedTyping',data);
        });


        socket.on('send_message',async function(data){
                let friendship = await Friendship.findById(data.chatRoom);
                let chatObj = new Object();
                chatObj = {
                    content: data.msg,
                    sender: data.user_email
                }
                friendship.chat.push(chatObj);
                friendship.save();
                console.log(friendship.chat);
            io.in(data.chatRoom).emit('recieve_message',data);
        });

    });

}