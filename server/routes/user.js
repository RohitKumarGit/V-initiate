const Users = require("../models/user")

const Router = require('express').Router()
const {auth} = require('../helper/auth')
Router.post("/",auth,async ( req,res)=>{
    try {
        const user = await Users.create(req.body)
        
        res.send({user})
    } catch (error) {
        console.log(error)
    }
})


Router.get("/",auth,async ( req,res)=>{
    try {
        const user = await Users.findOne({uid:req.query.uid});
        res.send({user})
    } catch (error) {
        console.log(error)
    }
})
Router.post("/verify",async ( req,res)=>{
    try {
        const user = await Users.find({uid:req.body.uid});
        console.log(user)
        if(user.length === 0) {
            res.send({isThere:false})
        }
        else {
            res.send({isThere:true})
        }
        
    } catch (error) {
        console.log(error)
    }
})
module.exports = Router