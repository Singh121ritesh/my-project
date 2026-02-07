require('dotenv').config();
const mongoose = require('mongoose');


function connectToDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected kar diya databse');

    })
    .catch((error)=>{
        console.error('database connection error:', error.message);
    });
}

module.exports = connectToDatabase;










