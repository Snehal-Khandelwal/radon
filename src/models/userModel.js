const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balance: {
        type:Number,
        Default:100 
    },
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] 
    },
    isFreeAppUser: Boolean
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) 


