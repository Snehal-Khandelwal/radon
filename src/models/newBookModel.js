const mongoose = require('mongoose');

const newbookSchema = new mongoose.Schema( {
    bookName: String, 
    author_id: {
        type:Number, 
        require:true
    }, 
    price: Number,
    ratings: Number
}, { timestamps: true });


module.exports = mongoose.model('newBook', newbookSchema)