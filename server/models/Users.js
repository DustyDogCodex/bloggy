const mongoose = require('mongoose')
const { Schema } = mongoose

//this is our schema for storing user account information
//using timestamps to get createdAt and updatedAt info for user accounts
//setting avatar default value to '' to allow users to creat accounts without avatars/profile pics.

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    avatar: {
        type: String,
        default: ''
    },
    aboutMe: {
        type: String,
        default: ''
    }
}, { timestamps: true } )

module.exports = mongoose.model('User', UserSchema)