const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const warnSchema = mongoose.Schema({
  _id: {
    reqString,
  },
  user: {
    reqString,
  },
  reason: {
    reqString,
  },
  time: {
    reqString,
  },
  moderator: {
    reqString
  },
  warnNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Warns", warnSchema);
