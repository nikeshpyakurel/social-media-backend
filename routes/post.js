const router = require("express").Router();
const { createPost, updatePost, deletePost, likePost, getPost, timelinePost } = require("../controllers/post")

// post routs

router.post("/", createPost);
router.get("/", getPost);
router.put("/:id", updatePost)

module.exports = router