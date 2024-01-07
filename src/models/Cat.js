const mongoose = require('mongoose');

const catSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  {
    versionKey: false, // Disable the __v field
  }
);

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
