const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const checkJwtTOken = async (req,res,next) =>{
    try {
        const {authorization} = req.headers
        
        if(!authorization) throw {message:'Please Sign in'}
        var token = authorization.replace('Bearer ','');
        var result = jwt.verify(token,config.jwt_secret)
        if(!result) throw {message:'User Not verified'};
        var userData = await User.findById(result._id);
        if(!userData) throw {message:'User Not verified'};
        req.user = userData;
        next();
    } catch (error) {
        res.status(400).send(error)
    }
 
}

module.exports = {
    checkJwtTOken
}