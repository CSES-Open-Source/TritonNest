import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, maxlength: 120 },
    description: { type: String, maxlength: 5000 },
    rent: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    // GeoJSON point: [lng, lat]
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    leaseStart: { type: Date, required: true },
    leaseEnd: { type: Date, required: true },
    bedrooms: Number,
    bathrooms: Number,
    furnished: Boolean,
    photos: [String],
    // Cached commute info (filled by the Maps service)
    commuteMinutes: { walk: Number, bike: Number, transit: Number, drive: Number },
    status: { type: String, enum: ['active', 'pending', 'closed'], default: 'active' },
  },
  { timestamps: true },
);

listingSchema.index({ location: '2dsphere' });

export const Listing = mongoose.model('Listing', listingSchema);
