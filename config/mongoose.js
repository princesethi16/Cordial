const mongoose = require('mongoose');
const environment = require('../config/environment');

console.log(environment.db);
console.log(process.env.CORDIAL_ENVIRONMENT);

mongoose.connect(`mongodb://localhost:27017/${environment.db}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to the MongoDB'));

db.once('open',()=>{
    console.log('Successfully connected to the Database :: MongoDB');
});

module.exports = db;