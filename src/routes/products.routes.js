import { Router } from "express";
import ProductManager from '../dao/db/productManagerDb.js';
const manager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit
  try {
    const products = await manager.getProducts();
    limit ? res.send(products.slice(0, limit)) : res.send(products);
  } catch (error) {
    console.log(error)
  }
});

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  try {
    const product = await manager.getProductsById(id);
    !product ? res.send("No se encuentra el producto deseado") : res.send({ product });
  } catch (error) {
    console.log(error)
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    await manager.addProduct(newProduct);
    res.status(201).send({ message: "Producto agregado exitosamente", newProduct });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const newData = req.body;
  try {
    const updatedProduct = await manager.updateProduct(id, newData);
    !updatedProduct ? res.status(404).send({ message: "Error al actualizar el producto" }) : res.status(200).send(`Se ha actualizado el producto ${newData.title} correctamente`);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  try {
    const deletedProd = await manager.deleteProduct(id);
    !deletedProd ? res.status(404).send({ message: "Error al eliminar el producto", error: "Producto no encontrado" }) : res.status(200).send(`Se ha eliminado ${deletedProd.title} correctamente`);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

export default router;