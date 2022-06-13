const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    user_id : {
         type:objectId,
         ref : "User"
    },
    product_id : {
        type:objectId,
        ref : "Product"
   },
   amount: Number,
   isFreeAppUser : Boolean,
    date: String

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)
