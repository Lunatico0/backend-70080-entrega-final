import { Router } from 'express';
import ProductManager from '../dao/db/productManagerDb.js';
const manager = new ProductManager();
const router = Router();

router.get('/products', async (req, res) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 15;
  const { prodRender, productsList } = await manager.getProducts(page, limit);

  res.render('home', {
    products: prodRender,
    hasPrevPage: productsList.hasPrevPage,
    hasNextPage: productsList.hasNextPage,
    prevPage: productsList.prevPage,
    nextPage: productsList.nextPage,
    currentPage: productsList.page,
    totalPages: productsList.totalPages,
    limit: limit
  });
});

router.get('/', async (req, res) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 15;
  const { prodRender, productsList } = await manager.getProducts(page, limit);

  res.render('home', {
    products: prodRender,
    hasPrevPage: productsList.hasPrevPage,
    hasNextPage: productsList.hasNextPage,
    prevPage: productsList.prevPage,
    nextPage: productsList.nextPage,
    currentPage: productsList.page,
    totalPages: productsList.totalPages,
    limit: limit
  });
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await manager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;