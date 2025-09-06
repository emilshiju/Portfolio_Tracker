import { Schema, model, models } from 'mongoose';

const StockSchema = new Schema({
  particulars: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  exchange: { type: String }, 
  sectorId: { type: Schema.Types.ObjectId, ref: 'sectors' }, 
  portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolio' }, 
  createdAt: { type: Date }, 
});

export default models.Stock || model('stocks', StockSchema);
