import mongoose from "mongoose";
import basketItemSchema from "./BasketItem.js";
import orderSchema from "./Order.js";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favorites: {
    type: [{}],
    sparse: true,
  },
  basket: {
    type: [basketItemSchema],
    sparse: true,
  },
  orders: {
    type: [orderSchema],
    sparse: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
