const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new conversation

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const saveConversation = await newConversation.save();
        res.status(200).json(saveConversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get user conversation

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({ members: { $in: [req.params.userId] } })
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})
// get user conversation by both id sender and receiver

router.get("/find/:firstId/:secondId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [req.params.firstId, req.params.secondId] } })
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})




module.exports = router;