const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true
    },

    tags: [String],

    category: {
        type: String,
        required: true
    },

    subcategory: [String],

    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        // default : null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        // default : null
    },

}, { timestamps: true })

module.exports = mongoose.model("Blog", blogsSchema)
