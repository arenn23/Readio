const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
