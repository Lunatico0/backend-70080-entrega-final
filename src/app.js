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
app.engine('handlebars', engine({
  runtimeOptions: {                       //
    allowProtoPropertiesByDefault: true,  // Por si el 'metodo' ".lean()" no funciona en productManagerDb.js
    allowProtoMethodsByDefault: true,     // Cumple la misma funcion
  },                                      //
  helpers: {
    modifyImageUrl: (url, width, height) => {
      if (typeof url === 'string') {
        return url.replace(/width=\d+/, `width=${width}`)
                  .replace(/height=\d+/, `height=${height}`);
      }
      return url;
    },
    ifCond: function (v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

// Middlewares 
app.use(express.json());
app.use(express.static("./src/public"));

// Rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});