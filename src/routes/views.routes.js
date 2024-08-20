import { Router } from 'express';
import ProductManager from '../dao/db/productManagerDb.js';
const manager = new ProductManager();
const router = Router();

router.get('/products', async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 15;
  const querySort = req.query.sort || "defa";
  let sort = {}; 

  switch (querySort) {
    case "price_asc":
      sort = { price: 1 }; 
      break;
  
    case "price_desc":
      sort = { price: -1 }; 
      break;

    case "alpha_asc":
      sort = { title: 1 }; 
      break;

    case "alpha_desc":
      sort = { title: -1 }; 
      break;
  
    case "defa":
      sort = { createdAt: 1 }; 
      break;
  
    default:
      break;
  }

  const { prodRender, productsList } = await manager.getProducts(page, limit, sort);

  const maxPagesToShow = 5;
  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(startPage + maxPagesToShow - 1, productsList.totalPages);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  res.render('home', {
    products: prodRender,
    hasPrevPage: productsList.hasPrevPage,
    hasNextPage: productsList.hasNextPage,
    prevPage: productsList.prevPage,
    nextPage: productsList.nextPage,
    currentPage: productsList.page,
    totalPages: pages,
    lastPage: productsList.totalPages,
    limit: limit,
    sort: querySort
  });
});

router.get('/', async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 15;
  const querySort = req.query.sort || "defa";
  let sort = {}; 

  switch (querySort) {
    case "price_asc":
      sort = { price: 1 }; 
      break;
  
    case "price_desc":
      sort = { price: -1 }; 
      break;

    case "alpha_asc":
      sort = { title: 1 }; 
      break;

    case "alpha_desc":
      sort = { title: -1 }; 
      break;
  
    case "defa":
      sort = { createdAt: 1 }; 
      break;
  
    default:
      break;
  }

  const { prodRender, productsList } = await manager.getProducts(page, limit, sort);

  const maxPagesToShow = 5;
  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(startPage + maxPagesToShow - 1, productsList.totalPages);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  res.render('home', {
    products: prodRender,
    hasPrevPage: productsList.hasPrevPage,
    hasNextPage: productsList.hasNextPage,
    prevPage: productsList.prevPage,
    nextPage: productsList.nextPage,
    currentPage: productsList.page,
    totalPages: pages,
    lastPage: productsList.totalPages,
    limit: limit,
    sort: querySort,
    id: productsList.docs._id
  });
});

router.get("/realTimeProducts", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 15;
  const querySort = req.query.sort;
  let sort = {}; 

  switch (querySort) {
    case "asc":
      sort = { price: 1 }; 
      break;
  
    case "desc":
      sort = { price: -1 }; 
      break;
  
    default:
      break;
  }

  const { prodRender, productsList } = await manager.getProducts(page, limit, sort);

  res.render("realTimeProducts", {
    products: {
      prodRender,
      productsList
    },
    hasPrevPage: productsList.hasPrevPage,
    hasNextPage: productsList.hasNextPage,
    prevPage: productsList.prevPage,
    nextPage: productsList.nextPage,
    currentPage: productsList.page,
    totalPages: productsList.totalPages,
    limit: limit,
    sort: querySort
  });
});

export default router;