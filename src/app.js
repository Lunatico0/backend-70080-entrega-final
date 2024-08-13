import express from "express";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import "./db.js"

const app = express();
const PORT = 8080;

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

// Middlewares 
app.use(express.json());
app.use(express.static("./src/public"));

// Rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});



// const io = new Server(httpServer); // Pasar el servidor HTTP a Socket.io

// io.on("connection", async (socket) => {
//   console.log("Cliente nuevo conectado");
//   socket.emit("products", await productsManager.getProducts());

//   socket.on("deleteProduct", async (id) => {
//     await productsManager.deleteProduct(id);
//     io.emit("products", await productsManager.getProducts());
//   });

//   socket.on("addProduct", async (product) => {
//     const newProod = await productsManager.addProduct(product);
//     if (newProod) { // Si newProod es truthy, significa que se agregó correctamente
//       socket.emit("newProductAdded", newProod); // Emite al cliente que se agregó un nuevo producto
//     } else { // Si newProod es falsy, significa que hubo un error al agregar el producto
//       socket.emit("errorAddingProduct", "Error al agregar el producto");
//     }
//     io.emit("products", await productsManager.getProducts());
//   });
// });