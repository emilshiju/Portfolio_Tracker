import { Schema, model, models,Types } from 'mongoose';

const PortfolioSchema = new Schema({
  _id: { type: Types.ObjectId },
  userName: { type: String, required: true },
  createdAt: { type: Date }, 
});

export default models.Portfolio || model('portfolio', PortfolioSchema);
