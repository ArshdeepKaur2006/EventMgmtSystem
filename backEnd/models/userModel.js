const {Schema, model}= require("mongoose");
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength: 50
    },
    age:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
const userModel = model("test",userSchema)
model.exports = userModel