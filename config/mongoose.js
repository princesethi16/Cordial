const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cordial_development', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to the MongoDB'));

db.once('open',()=>{
    console.log('Successfully connected to the Database :: MongoDB');
});

module.exports = db;