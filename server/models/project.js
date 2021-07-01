const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String ,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    when : {
        type:Date,
      //  required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    tags:[{
        type:String,
        required:true
    }],
    isCompleted:{
        type:Boolean,
        default:false,
    },
    interested:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }],
    photo:{
        type:String,
      //  required:true  do it 
    }
},{timestamps:true})
module.exports = mongoose.model("Projects",projectSchema)