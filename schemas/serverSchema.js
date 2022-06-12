const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const serverSchema = mongoose.Schema({
  _id: {
    reqString
  }, 
    animeToggle: {
    reqString,
  },
  nsfwToggle: {
    reqString,
  }
});

module.exports = mongoose.model("Server", serverSchema);
