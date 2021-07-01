const Problems = require("../models/probem")
const Users = require('../models/user')
const Router = require('express').Router()
const {auth} = require('../helper/auth')
Router.post("/",auth,async ( req,res)=>{
    try {
        const problem = await Problems.create(req.body)
        const user = await Users.findById(req.body.user)
        user.posted_problems.push(problem._id)
        await user.save()
        res.send({problem})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/",async ( req,res)=>{
    try {
        
        const problem = await Problems.findById(req.query.id).populate('user')
       
        res.send({problem})
    } catch (error) {
        console.log(error)
    }
})
Router.post("/interest",auth,async ( req,res)=>{
    try {
        const problem = await Problems.findById(req.body.id)
        problem.interested.push(req.body.user_id)
        await problem.save()
        res.send({problem})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/byuser",auth,async ( req,res)=>{
    try {
        const problems = await Problems.find({user:req.query.user_id}).populate('user');
      
        res.send({problems})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/bytags",async ( req,res)=>{
    try {
        const problems = await Problems.find({tags:{
            $in:req.query.tags
        }}).populate('user');
        res.send({problems})
    } catch (error) {
        console.log(error)
    }
})
Router.get('/recent',async (req,res)=>{
    try {
        const problems = await Problems.find().sort({createdAt:-1}).populate('user').limit(8);
        res.send({problems})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/interested",auth,async ( req,res)=>{
    try {
        const problems = await Problems.find({interested:{
            $in:[req.query.user_id]
        }}).populate('user');
       
        res.send({problems})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/bycity",async ( req,res)=>{
    try {
        const problems = await Problems.find({city:{
            $in:[req.query.city]
        }}).populate("user");
        res.send({problems})
    } catch (error) {
        console.log(error)
    }
})
Router.post("/delete",auth,async ( req,res)=>{
    try {
        const problems = await Problems.findByIdAndDelete(req.body.id)
        res.send({done:true})
    } catch (error) {
        console.log(error)
    }
})
module.exports = Router