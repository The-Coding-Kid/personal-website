const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  donations: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Charity = mongoose.model("Charity", charitySchema);

module.exports = Charity;
