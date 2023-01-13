const router = require("express").Router();
const { updateUser, deleteUser, getSingleUser, followUser, unfollowUser } = require('../controllers/user');
const auth = require("../middlewares/auth");

// user routes
router.put("/:id",auth, updateUser);
router.delete("/:id",auth, deleteUser);
router.get("/:id", getSingleUser);
router.put("/:id/follow",auth, followUser);
router.put("/:id/unfollow",auth, unfollowUser);

module.exports = router;