const Message = require("../models/Message");


// New Message
const newMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Get Message
const getMessage = async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { newMessage, getMessage };