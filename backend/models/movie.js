import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    
    type: { type: String,trim: true ,default:""},
    description: { type: String, required: true },
    genre: { type: [String], default: [] },
    releaseDate: { type: Date },
    duration: { type: Number }, // in minutes
    language: { type: String, default: 'English' },
    poster: { type: String, default: '' },
    backdrop: { type: String, default: '' },
    trailerUrl: { type: String, default: '' },
    cast: [
      {
        name: String,
        role: String,
        image: String,
      },
    ],
    rating: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Movie = mongoose.model('Movie', movieSchema);
