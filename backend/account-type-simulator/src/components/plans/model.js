const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: String,
    free: Number,
    pro: Number,
    extra: String,
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('features', FeatureSchema, 'features');
