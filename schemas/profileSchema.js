const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  _id: {
    type: String,
    default: "N/A",
    required: true,
  },
  embedColor: {
    type: String,
    required: true
  },
  age: {
    type: String,
    default: "N/A",
    required: true,
  },
  ageLock: {
    type: String,
    default: "false",
    required: true
  },
  sexuality: {
    type: String,
    default: "N/A",
    required: true,
  },
  gender: {
    type: String,
    default: "N/A",
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  visible: {
    type: String,
    default: "true",
    required: true
  }
});

module.exports = mongoose.model("Profile", profileSchema);
