const router = require("express").Router();
const { newMessage, getMessage } = require("../controllers/message")

router.post("/", newMessage);
router.get("/:conversationId", getMessage);

module.exports = router;