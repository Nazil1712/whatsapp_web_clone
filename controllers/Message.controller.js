const Message = require("../models/Message.model");
const User = require("../models/User.model");

exports.fetchMessagesByUserId = async (req, res) => {
  const { userId } = req.params;

  // console.log(userId);
  try {
    const userMessages = await Message.find({ wa_id: userId });
    // console.log("User Messages from backend", userMessages);
    res.status(200).json(userMessages);
  } catch (error) {
    res.status(400).json(error);
  }
};
