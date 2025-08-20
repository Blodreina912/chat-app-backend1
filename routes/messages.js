// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Middleware for authentication
const auth = require('../middleware/auth'); 

// @route   GET /messages/:recipientId
// @desc    Get all messages between current user and a recipient
router.get('/:recipientId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.user.id },
      ],
    }).sort('timestamp');

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;