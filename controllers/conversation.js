const Conversation = require("../models/Conversation");

// New Conversation
const newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.reciverId],
    })
    try {
        const saveConversation = await newConversation.save();
        res.status(200).json(saveConversation);
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// User Converstation
const userConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json({ msg: err.message })

    }
}

// Get Conversation which include two user id
const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
        })
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = { newConversation, userConversation, getConversation }