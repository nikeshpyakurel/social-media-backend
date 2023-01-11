const Post = require("../models/Post");
const User = require("../models/User")
const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

const updatePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({ msg: "Post has been updated" })
        }
        else {
            res.status(403).json({ msg: "You can update only your post" })
        }
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}
const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json({ msg: "Post has been deleted" })
        }
        else {
            res.status(403).json({ msg: "You can delete only your post" })
        }
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json({ msg: "The Post has been liked" })
        }
        else {
            await post.userId({ $pull: { likes: req.body.userId } })
            res.status(200).json({ msg: "The Post has been disliked" })
        }
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}
const timelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({ userId: currentUser._id });
        const friendPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )
        res.json(userPost.concat(...friendPost))
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}



module.exports = { createPost, updatePost, deletePost, likePost, getPost, timelinePost }