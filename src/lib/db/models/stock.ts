import { Schema, model, models, Types } from 'mongoose';

const StockSchema = new Schema({
  _id: { type: Types.ObjectId },
  particulars: { type:String, required: true },
  purchasePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  exchange: { type: String,required: true }, 
  sectorId: { type: Schema.Types.ObjectId, ref: 'Sector' }, 
  portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolio' }, 
  createdAt: { type: Date }, 
});


const Stock = models.stocks || model("stocks", StockSchema);

export default Stock;
