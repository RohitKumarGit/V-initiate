const mongoose = require('mongoose')
const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    desc:{
        type:String ,
        required:true
    },
    solution:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    tags:[{
        type:String,
        required:true
    }],
    photo:{
        type:String,
      //  required:true  do it 
    }
    ,
    inter_count:{
        type:Number,
        default:0
    },
    interested:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }],
},{timestamps:true})
module.exports = mongoose.model("Problems",problemSchema)