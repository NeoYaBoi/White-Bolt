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
  },
  confessionToggle: {
    reqString
  },
  welcomeToggle: {
    reqString
  }
});

module.exports = mongoose.model("Server", serverSchema);
