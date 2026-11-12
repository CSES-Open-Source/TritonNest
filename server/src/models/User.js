import mongoose from 'mongoose';

const preferencesSchema = new mongoose.Schema(
  {
    sleepSchedule: { type: String, enum: ['early', 'flexible', 'late'] },
    cleanliness: { type: Number, min: 1, max: 5 },
    studyHabits: { type: String, enum: ['quiet', 'moderate', 'social'] },
    petsAllowed: Boolean,
    guestsPolicy: { type: String, enum: ['rarely', 'sometimes', 'often'] },
    budgetMax: Number,
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    displayName: String,
    avatarUrl: String,
    major: String,
    year: String,
    bio: { type: String, maxlength: 1000 },
    preferences: { type: preferencesSchema, default: {} },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
