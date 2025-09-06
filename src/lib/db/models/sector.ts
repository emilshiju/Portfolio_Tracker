import { Schema, model, models } from 'mongoose';

const SectorSchema = new Schema({
  name: { type: String, required: true }, 
  createdAt: { type: Date }, 
});

export default models.Sector || model('sectors', SectorSchema);
