const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['Metal', 'Rock', 'Alternative', 'Indie', 'Pop Rock']
  },
  subgenre: {
    type: String,
    required: false
  },
  totalSongs: {
    type: Number,
    default: 0
  },
  popularity: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  listeners: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    required: false
  },
  formedYear: {
    type: Number,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Band', bandSchema);
