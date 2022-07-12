const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const userSchema = mongoose.Schema({
  _id: {
    reqString,
  },
  houses: {
    type: Array,
    required: true
  },
  cars: {
    type: Array,
    required: true
  },
  trophy: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model("Items", userSchema);