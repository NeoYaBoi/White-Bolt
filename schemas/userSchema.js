const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const userSchema = mongoose.Schema({
  _id: {
    reqString,
  },
  warns: {
    type: Number,
    required: true,
  },
  money: {
    type: Number,
    required: true
  },
  xp: {
    type: Number,
    required: true
  },
  level: {
    type: Number, 
    required: true
  },
  levelbadge: {
    reqString
  }
});

module.exports = mongoose.model("Users", userSchema);
