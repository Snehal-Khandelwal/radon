const mongoose = require('mongoose');
const objectId = mongoose.schema.type.objectId

const orderSchema = new mongoose.Schema( {
    user_id : {
         type:objectId,
         ref : "User"
    },
    user_id : {
        type:objectId,
        ref : "Product"
   },
   amount: Number,
   isFreeAppUser : Boolean,
    date: String

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)
