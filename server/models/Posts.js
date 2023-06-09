const mongoose = require('mongoose')
const { Schema } = mongoose

//this is our schema for storing blog post information
//using timestamps to get createdAt and updatedAt info for user accounts
//setting title to unique to prevent posts from having duplicate titles.
//setting categories to type Arraya since users can add multiple categories to their posts.

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    }
}, { timestamps: true } )

module.exports = mongoose.model('Post', PostSchema)