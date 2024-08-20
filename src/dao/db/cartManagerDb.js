import CartModel from '../models/cart.model.js'

class CartManager {

  async addCart() {    
    try {
      const newCart = new CartModel({products:[]});
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log('Error adding new cart:', error);
    };
  };

  async getCarts() {
    try {
      const allCarts = await CartModel.find(); 
      if(!allCarts) throw new Error('No carts found');
      return allCarts;
    } catch (error) {
      throw new Error('Error getting all carts:', error);
    }
  };

  async getCartById(id) {
    try {
      const foundCart = await CartModel.findById(id);
      if(!foundCart) throw new Error('Cart not found');
      return foundCart;
    } catch (error) {
      throw new Error('Error getting cart by ID:', error);
    }
  };

  async addProductToCart(idCart, idProduct, quantity = 1) {
    try {
      const cart = await this.getCartById(idCart);
      const productfound = cart.products.find((prod) => prod.product.toString() === idProduct);
      if(productfound) {
        productfound.quantity += quantity;
      } else {
        cart.products.push({ product: idProduct, quantity });
      }
      cart.markModified();
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error adding product to cart:', error);
    }
  };

  async deleteProductFromCart(idCart, idProduct) {
    try {
      let cart = await this.getCartById(idCart);
  
      if(cart){
        const productIndex = cart.products.findIndex(product => product._id.toString() === idProduct);
  
        if (productIndex > -1) {
          cart.products.splice(productIndex, 1);
          await cart.save();
          return cart;
        } else {
          throw new Error("No se encontró el producto en el carrito");
        }
      } else {
        throw new Error("No se encontró el carrito");
      }
    } catch (error) {
      throw new Error('Error deleting product from cart:', error);
    }
  };

  async deleteCart(idCart) {
    try {
      const result = await CartModel.deleteOne({ _id: idCart });
      if(!result) throw new Error('Error deleting cart');
      return result;
    } catch (error) {
      console.log('Error deleting cart:', error);
      throw error;
    }
  }
};

export default CartManager;