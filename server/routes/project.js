const Projects = require("../models/project")
const Users = require('../models/user')
const Router = require('express').Router()
const {auth} = require('../helper/auth')
Router.post("/",auth,async ( req,res)=>{
    try {
       
        const project = await Projects.create(req.body)
        const user = await Users.findById(req.body.user)
        user.posted_projects.push(project._id)
        await user.save()
        res.send({project})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/",async ( req,res)=>{
    try {
        
        const project = await Projects.findById(req.query.id)
       
        res.send({project})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/byuser",auth,async ( req,res)=>{
    try {
        const projects = await Projects.find({user:req.query.user_id}).populate('user');
      //  console.log(projects)
        res.send({projects})
    } catch (error) {
        console.log(error)
    }
})
Router.get('/popular',async (req,res)=>{
    try {
        const projects = await Projects.find().populate('user').sort({inter_count:-1}).limit(8);
        res.send({projects})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/bytags",async ( req,res)=>{
    try {
      
        const projects = await Projects.find({tags:{
            $in:req.query.tags
        },isCompleted:req.query.completed}).populate("user");
        res.send({projects})
    } catch (error) {
        console.log(error)
    }
})
Router.get("/interested",auth,async ( req,res)=>{
    try {
        const projects = await Projects.find({interested:{
            $in:[req.query.user_id]
        }}).populate("user");
        //console.log(projects)
        res.send({projects})
    } catch (error) {
        console.log(error)
    }
})
Router.post('/complete',auth,async (req,res)=>{
    try {
        const project = await Projects.findById(req.body.id)
        project.isCompleted = true;
        await project.save()
        res.send({success:true})
    } catch (error) {
        console.log(error)
        res.status(400).send({success:false})
    }
})
Router.get("/bycity",async ( req,res)=>{
    try {
      
        const problems = await Projects.find({city:{
            $in:[req.query.city]
        },isCompleted:req.query.completed}).populate("user");
        res.send({problems})
    } catch (error) {
        console.log(error)
    }
})
Router.post("/interest",auth,async ( req,res)=>{
    try {
        const problem = await Projects.findById(req.body.id)
        if(!problem.interested.includes(req.body.user_id)){
            problem.interested.push(req.body.user_id)
            problem.inter_count++;
            await problem.save()
            res.send({problem,there:false})
        }
        else {
            res.send({problem,there:true})
        }
        
    } catch (error) {
        console.log(error)
    }
})
Router.post("/delete",auth,async ( req,res)=>{
    try {
        const problems = await Projects.findByIdAndDelete(req.body.id)
        res.send({done:true})
    } catch (error) {
        console.log(error)
    }
})
module.exports = Router