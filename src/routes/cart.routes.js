import { Router } from "express";
import CartManager from "../dao/db/cartManagerDb.js";
const manager = new CartManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await manager.getCarts();
    carts ? res.status(200).send({ message: "Todos los carritos", carts }) : res.status(404).send({ message: "No se encontraron carritos" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await manager.getCartById(cid);
    !cart ? res.status(404).send({ message: "Carrito no encontrado" }) : res.status(200).send({ message: "Carrito encontrado", cart });
  } catch (error) {
    return res.status(500).send({ message: "Error al buscar el carrito" });
  };
});

router.post("/", async (req, res) => {  
  try {
    const newCart = await manager.addCart();
    res.status(201).send({ message: "Carrito creado exitosamente", newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
  
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    const result = await manager.addProductToCart(cid, pid, quantity);
    !result ? res.status(400).send({ message: "Error al agregar producto al carrito" }) : res.status(200).send({ message: "Producto agregado al carrito exitosamente", result });
  } catch (error) {
    console.log("Error al agregar producto al carrito: ", error);
    return res.status(500).send({ status: "error", error: error.message });
  };
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    const result = await manager.addProductToCart(cid, pid, quantity);
    !result ? res.status(400).send({ message: "Error al agregar producto al carrito" }) : res.status(200).send({ message: "Producto agregado al carrito exitosamente", result });
  } catch (error) {
    console.log("Error al agregar producto al carrito: ", error);
    return res.status(500).send({ status: "error", error: error.message });
  };  
})

router.delete('/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const result = await manager.deleteProductFromCart(cid, pid);
    !result ? res.send({ message: "No se pudo encontrar el producto en el carrito" }) : res.send({ message: "Producto eliminado exitosamente", result });
  } catch (error) {
    console.log("Error al eliminar producto del carrito: ", error);
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await manager.deleteCart(cid);
    !result ? res.send({ message: "No se pudo encontrar el carrito" }) : res.send({ message: "Carrito eliminado exitosamente", result });
  } catch (error) {
    console.log("Error al eliminar carrito: ", error);
  }
})

export default router;