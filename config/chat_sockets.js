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


        socket.on('send_message',function(data){
            console.log('message sent : ',data);
            io.in(data.chatRoom).emit('recieve_message',data);
        });

    });

}