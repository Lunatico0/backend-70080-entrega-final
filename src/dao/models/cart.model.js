import mongoose from "mongoose";

const cartSchemma = new mongoose.Schema({
  products:[
    {
      product: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

const CartModel = mongoose.model("carts", cartSchemma);

export default CartModel;