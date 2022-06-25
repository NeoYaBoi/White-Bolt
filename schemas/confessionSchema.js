const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const serverSchema = mongoose.Schema({
  _id: {
    reqString
  }, 
  author: {
    reqString
  },
  confession: {
    reqString
  }
});

module.exports = mongoose.model("Confession", serverSchema);
