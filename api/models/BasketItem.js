import mongoose from "mongoose";
const { Schema } = mongoose;

const basketItemSchema = new Schema({
  book: {
    type: {},
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
});

export default basketItemSchema;
