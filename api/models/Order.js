import mongoose from "mongoose";
import BasketItemModel from "./BasketItem.js";
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: {
    type: [{}],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  addInfo: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
});

export default orderSchema;
