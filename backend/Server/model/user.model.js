// 1. Mongoose library ko import kar rahe hain (MongoDB se kaam karne ke liye)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let users = new Schema(
    {   
        userid:{type:String, required:true},
        name: { type: String, required:true},
        email: { type: String, required: true},
        password: { type: String, required: true },
        mobile: { type: Number, required: true }
    },
    {
        collection: "users"
    }
);
module.exports = mongoose.model('users', users);
