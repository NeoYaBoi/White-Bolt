const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const serverSchema = mongoose.Schema({
  _id: {
    reqString
  }, 
  confessions: {
    type: Number,
    required: true
  },
  confessHere: {
    reqString
  },
  confessSend: {
    reqString
  }
});

module.exports = mongoose.model("guildConfession", serverSchema);