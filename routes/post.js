const router = require("express").Router();
const { createPost, userPost, updatePost, deletePost, likePost, getPost, timelinePost } = require("../controllers/post")

// post routs

router.post("/", createPost);
router.put("/:id", updatePost)
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/:userId", timelinePost);
router.get("/profile/:username", userPost);

module.exports = router