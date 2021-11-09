const express =require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User')
const auth_middleware = require('../middleware/auth.middleware');
const { uploadSingleFile } = require('../services/UploadService');
const uploadObj = uploadSingleFile();

router.use(auth_middleware.checkJwtTOken);

router.get('/:id',async (req,res) => {
    try {
        console.log(req.params.id);
        var user = await User.findOne({_id:req.params.id}).select('-password');
        if(!user) throw {message:'User Not found'};
        var posts = await Post.find({postedBy:user._id}).populate('postedBy','_id name email');
        res.send({posts:posts,user:user});
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/follow',async (req,res) => {
    try {
        var updatedPartnerUser = await User.findByIdAndUpdate(req.body.user_id,{
            $push:{followers:req.user._id},
        },{new:true}).select('-password');
        var updatedCurrentUser = await User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.user_id},
        },{new:true}).select('-password');
        res.send({updatedPartnerUser,updatedCurrentUser})
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/unfollow',async (req,res) => {
    try {
        var updatedPartnerUser = await User.findByIdAndUpdate(req.body.user_id,{
            $pull:{followers:req.user._id},
        },{new:true}).select('-password');
        var updatedCurrentUser = await User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.user_id},
        },{new:true}).select('-password');
        res.send({updatedPartnerUser,updatedCurrentUser})
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router