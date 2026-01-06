const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DessertsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'No description provided.'
    },
    rating: {
      type: Number,
      default: 'No rating provided.'
    }
  },
  { collection: 'Desserts' }
);

module.exports = mongoose.model('Desserts', DessertsSchema);