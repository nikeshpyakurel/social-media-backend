const router = require("express").Router();
const { createPost, updatePost, deletePost, likePost, getPost, timelinePost } = require("../controllers/post");
const auth = require("../middlewares/auth");


// post routs

router.post("/",auth,  createPost);
router.put("/:id",auth, updatePost)
router.delete("/:id",auth, deletePost);
router.put("/:id/like",auth, likePost);
router.get("/:id", getPost);
router.get("/timeline/:userId", timelinePost);

module.exports = router