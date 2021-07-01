const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name : {
        type:String ,
        required:[true,"Name is required"]
    } ,
    uid:{
        type:String ,
        required:[true,"uid is req"]
    },
    posted_projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Projects"
    }],
    posted_problems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problems"
    }],
    photo:{
        type:String,
        required:true
    }
})
const Users  = mongoose.model("Users",UserSchema)
module.exports = Users