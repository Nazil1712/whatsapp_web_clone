const express = require('express');
const router = express.Router();
const Message = require('../models/Message.model');

// Grouped chats
router.get('/conversations', async (req, res) => {
  const conversations = await Message.aggregate([
    {
      $group: {
        _id: "$wa_id",
        name: { $first: "$name" },
        messages: {
          $push: {
            message: "$message",
            timestamp: "$timestamp",
            status: "$status",
            meta_msg_id: "$meta_msg_id"
          }
        }
      }
    },
    {
      $sort: { "_id": 1 } // Optional: sort contacts alphabetically
    }
  ]);
  res.json(conversations);
});


// Messages of selected user
router.get('/messages/:wa_id', async (req, res) => {
  const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
  res.json(messages);
});

// Send message
router.post('/send', async (req, res) => {
  const { wa_id, name, message } = req.body;
  const newMessage = new Message({
    wa_id,
    name,
    message,
    timestamp: new Date(),
    status: 'sent',
    meta_msg_id: 'custom_' + Date.now()
  });
  await newMessage.save();
  res.json(newMessage);
});

module.exports = router;
