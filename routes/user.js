const router = require("express").Router();
const { updateUser, deleteUser, getSingleUser, followUser, unfollowUser } = require('../controllers/user');

// user routes
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getSingleUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;