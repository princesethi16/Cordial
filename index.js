const express = require('express');
const port = 8000;

const app = express();

app.listen(port,(err)=>{
    if(err){
        console.error(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);

});