import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: String,
  category: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  color: String,
  material: String,
  type: String,
  description: String,
  tags: [String],
  availability: {
    type: String,
    enum: ['both', 'swap', 'points'],
    default: 'both',
  },
  pointsValue: { type: Number, default: 0 },
  images: [String], // URLs from Cloudinary
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'swapped', 'redeemed'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
