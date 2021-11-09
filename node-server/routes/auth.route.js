const e = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/signup',async (req,res)=>{
    try {
    var data = req.body;
    console.log(req.body);
    if(!data.name || !data.email || !data.password){
        throw {message:'please send all the fields properly'};
    }
    var userData = await User.findOne({email:data.email});
    if(userData){
        throw {message:'already exists!'};
    }
    var hashedpassword = await bcrypt.hash(data.password,15)
    var newUser = new User({
        name:data.name,
        email:data.email,
        password:hashedpassword,
    })
    var savedUser = await newUser.save()
    res.send({message:'successfully created user'})
} catch (error) {
    console.log(error);
        res.status(400).send(error);
        
}})

router.post('/signin',async (req,res)=>{
    try {
    var data = req.body;
    if(!data.email || !data.password){
        throw {message:'please send all the fields properly'};
    }
    var userData = await User.findOne({email:data.email});
    console.log(userData);
    if(!userData) throw {message:'No User Found'};
    else if(userData.length > 1) throw {message:'More than one user found with this email Id'}
    var result = await bcrypt.compare(data.password,userData.password);
    var token = jwt.sign({
        _id:userData._id,
    },config.jwt_secret);
    if(result) res.send({token:token,user:userData});
    else throw{message:'wrong password'};
} catch (error) {
    console.log(error);
        res.status(400).send(error);
        
}})


router.post('/protected',async (req,res)=>{
    console.log(req.user);
    res.send({message:'user verified'})
})



module.exports = router