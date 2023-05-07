import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  publishingHouse: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    sparse: true,
  },
  reviews: [
    {
      author: String,
      body: String,
      date: Date,
    },
  ],
  rating: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
