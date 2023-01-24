const router = require("express").Router();
const { newConversation, userConversation, getConversation } = require("../controllers/conversation")

router.post("/", newConversation);
router.get("/:userId", userConversation)
router.get("/find/:firstUserId/:secondUserId", getConversation);

module.exports = router;