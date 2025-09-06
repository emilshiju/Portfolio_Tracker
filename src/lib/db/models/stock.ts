import { Schema, model, models, Types } from 'mongoose';

const StockSchema = new Schema({
  particulars: { type: Types.ObjectId, required: true },
  purchasePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  exchange: { type: String }, 
  sectorId: { type: Schema.Types.ObjectId, ref: 'sectors' }, 
  portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolio' }, 
  createdAt: { type: Date }, 
});


const Stock = models.stocks || model("stocks", StockSchema);

export default Stock;
