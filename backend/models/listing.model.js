const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },

  description: {
    type: String,
    required: true,
    minlength: 3,
  },

  owner: {
    type: String,
    required: true,
  },

  condition: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  listingId: {
    type: String
  }

}, {
  timestamps: true,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;