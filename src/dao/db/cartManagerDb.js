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
      !allCarts ? console.log('No carts found') : console.log(allCarts);
      return allCarts;
    } catch (error) {
      console.log('Error getting all carts:', error);
    }
  };

  async getCartById(id) {
    try {
      const foundCart = await CartModel.findById(id);
      if(!foundCart) throw new Error('Cart not found');
      return foundCart;
    } catch (error) {
      console.log('Error getting cart by ID:', error);
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
      cart.markModified(); // Marcar el documento como modificado para guardar los cambios en MongoDB
      await cart.save();
      return cart;
    } catch (error) {
      console.log('Error adding product to cart:', error);
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
          console.log("No se encontró el producto en el carrito");
          return null;
        }
      } else {
        console.log("No se encontró el carrito");
        return null;
      }
    } catch (error) {
      console.log('Error deleting product from cart:', error);
      throw error;
    }
  };

  async deleteCart(idCart) {
    try {
      const result = await CartModel.deleteOne({ _id: idCart });
      !result ? console.log('Error deleting cart') : console.log('Cart deleted successfully');
      return result;
    } catch (error) {
      console.log('Error deleting cart:', error);
      throw error;
    }
  }
};

export default CartManager;