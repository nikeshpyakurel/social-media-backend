const router = require("express").Router();
const { createUser, loginUser } = require("../controllers/auth");

router.post('/register', createUser);
router.post('/login', loginUser)

module.exports = router;