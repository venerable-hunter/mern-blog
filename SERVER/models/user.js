const mongoose = require('mongoose');
const {Schema, model} = mongoose;





const UserSchema = new mongoose.Schema({
    name:{type:String, unique:true},
   phone: String,
   email: String,
   password: String
},{ timestamps: true })

const  User = new mongoose.model("User",UserSchema)

module.exports= User