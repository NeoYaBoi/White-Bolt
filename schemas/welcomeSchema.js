const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const welcomeSchema = mongoose.Schema({
  _id: reqString,
  welcomeChannel: {
    type: String,
    default: "null",
    required: true
  },
  embedTitle: reqString,
  embedDesc: reqString,
});

module.exports = mongoose.model("Welcome", welcomeSchema);