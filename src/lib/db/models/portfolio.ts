import { Schema, model, models } from 'mongoose';

const PortfolioSchema = new Schema({
  userName: { type: String, required: true },
  createdAt: { type: Date }, 
});

export default models.Portfolio || model('portfolio', PortfolioSchema);
