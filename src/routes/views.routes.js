import { Router } from 'express';
import ProductManager from '../dao/db/productManagerDb.js';
const manager = new ProductManager();
const router = Router();

router.get('/products', async (req, res) => {
  const products = await manager.getProducts();
  res.render('home', {products});
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await manager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;