const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const profileSchema = mongoose.Schema({
  _id: {
    reqString
  }, 
  embedColor: {
    reqString
  },
  age: {
    type: Number,
    required: true
  },
  ageLock: {
    type: String,
    default: "false",
    required: true
  },
  sexuality: {
    reqString
  },
  gender: {
    reqString
  },
  visible: {
    reqString
  }
});

module.exports = mongoose.model("Profile", profileSchema);
