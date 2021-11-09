const express =require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const Post = mongoose.model('Post');
const auth_middleware = require('../middleware/auth.middleware');
const { uploadSingleFile } = require('../services/UploadService');
const uploadObj = uploadSingleFile();

router.use(auth_middleware.checkJwtTOken);

router.post('/create',uploadObj.single('post-image'),async (req,res)=>{
    try {
        console.log('hello');
        var data = req.body;
        const url = req.protocol + '://' + req.get('host') + '/public/images/' + req.file.filename
        console.log(url);
        if(!data.title || !data.body) throw {message:'Please send all the fields'}
        req.user.password = undefined;
        var newPost = new Post({
            title:data.title,
            body:data.body,
            photo:url,
            postedBy:req.user
        })
        var savedPost = await newPost.save()
        res.send(savedPost)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/fetch/all',async (req,res) => {
    try {
        var posts = await Post.find().populate('postedBy' , '_id name').populate("comments.postedBy","_id name");
        res.send(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/fetch/user/all',async (req,res) => {
    try {
        console.log(req.user._id);
        var posts = await Post.find({postedBy:req.user._id}).populate('postedBy' , '_id name');
        res.send(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/like',async (req,res) => {
    try {
        var updatedPost = await Post.findByIdAndUpdate(req.body.post_id,{
            $push:{likes:req.user._id},
        },{new:true});
        res.send(updatedPost)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/unlike',async (req,res) => {
    try {
        var updatedPost = await Post.findByIdAndUpdate(req.body.post_id,{
            $pull:{likes:req.user._id},
        },{new:true});
        res.send(updatedPost)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/comment',async (req,res) => {
    try {
        console.log(req.body.text);
        console.log(req.user._id);
        var updatedPost = await Post.findByIdAndUpdate(req.body.post_id,{
            $push:{
                comments:{
                    text:req.body.text,
                    postedBy:req.user._id
                }
            },
        },{new:true}).populate("comments.postedBy","_id name").populate('postedBy' , '_id name');
        res.send(updatedPost)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.post('/delete',async (req,res) => {
    try {
        var findPost = await Post.findOne({_id:req.body.post_id});
        if(!findPost) throw {message:'Post Not found'}
        if(findPost.postedBy.toString()!=req.user._id.toString()) throw {message:'Can not perform the operation'}
        var deletedPost = await findPost.remove();
        res.send(deletedPost)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router