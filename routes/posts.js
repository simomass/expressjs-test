const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post'); //importing the model

router.get('/', (req, res, next) => {
    //returning all the posts
    Post.find((error, posts) => {
        if(error) return res.status(500).json({error: error});
        return res.status(200).json({
            posts: posts
        });
    });
});

router.get('/:postId', (req, res, next)=> {
    //finding the post by id and returning with the response
    Post.findById(req.params.postId, (error, post) => {
        if(error) return res.status(500).json({error: error});
        return res.status(200).json({
            post: post
        });
    });
});


router.post('/', (req, res, next) => {
    //creating new post object
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body
    });
    //method provides by the mongoose for saving the object
    post.save((error, result) => {
        if(error) return res.status(500).json({error: error});
        return res.status(200).json({
            message: 'New post created',
            createdPost: post
        })
    });
});

router.put('/:postId', (req, res, next) => {
    //updating a post by id
    Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title, body: req.body.body}}, (error, post) => {
        if(error) return res.status(500).json({error: error});
        return res.status(200).json({
            message: 'Post updated',
            updatedPost: post
        });
    });
});

router.delete('/:postId', (req, res, next) => {
    //deleting a post by id
    Post.deleteOne({_id: req.params.postId}, (error, post) => {
        if(error) return res.status(500).json({error: error});
        return res.status(200).json({
            message: 'Post removed',
            removedPost: post
        });
    });
});

module.exports = router;