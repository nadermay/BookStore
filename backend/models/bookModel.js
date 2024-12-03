import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Changed from `require` to `required`
    },
    author: {
      type: String,
      required: true, // Changed from `require` to `required`
    },
    publishYear: {
      type: Number,
      required: true, // Changed from `require` to `required`
    },
  },
  {
    timestamps: true, // Changed `Timestamp` to `timestamps` for proper schema options
  }
);

export const Book = mongoose.model('Book', bookSchema); // Changed model name from `Cat` to `Book`
