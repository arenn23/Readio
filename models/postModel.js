const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },

  username: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
