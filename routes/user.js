const router = require("express").Router();
const { updateUser, getFriend, deleteUser, getSingleUser, followUser, unfollowUser } = require('../controllers/user');

// user routes
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getSingleUser);
router.get("/friends/:userId", getFriend);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;