import { Schema, model, models, Types } from 'mongoose';

const SectorSchema = new Schema({
  _id: { type: Types.ObjectId },
  name: { type: String, required: true }, 
  createdAt: { type: Date }, 
});

const Sector = models.Sector || model('Sector', SectorSchema, 'sectors');

export default Sector;