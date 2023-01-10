const Post = require("../models/Post");

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

}
const deletePost = async (req, res) => {
    res.send("delete a post")
}
const likePost = async (req, res) => {
    res.send("like a post")
}
const getPost = async (req, res) => {
    res.send("get post");
}
const timelinePost = async (req, res) => {
    res.send("timeline  post")
}



module.exports = { createPost, updatePost, deletePost, likePost, getPost, timelinePost }