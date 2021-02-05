import { Document, Schema, Model, model } from 'mongoose';

import { BranchInterface } from './interfaces';

export interface BranchModel extends BranchInterface, Document {}

const BranchSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
});

BranchSchema.index({ location: '2dsphere' });

export const Branch: Model<BranchModel> = model<BranchModel>(
  'Branch',
  BranchSchema
);
