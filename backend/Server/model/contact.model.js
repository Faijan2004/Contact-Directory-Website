
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Contact = new Schema(
  {
    userid: { type: String, required: true },
    name: { type: String},
    phone: { type: Number},         
    email: String,
    altPhone: Number,
    cimage: String,
    
    
  },
  {
    collection: "Contact",
  }
);

module.exports = mongoose.model('Contact', Contact);
