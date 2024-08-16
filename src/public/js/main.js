const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');
});



socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});

socket.on('products', (products) => {
  console.log('Products received from server:', products);
  renderProductos(products);
});

function renderProductos(productos) {
  console.log('Rendering products:', productos);
  const productsContainer = document.getElementById('productsContainer');
  if (!productsContainer) {
    console.error("No se encontró el contenedor de productos");
    return;
  }

  productsContainer.innerHTML = '';

  productos.forEach((producto) => {
    console.log('Rendering product:', producto);
    const card = document.createElement('div');
    card.classList.add('flex', 'flex-col', 'justify-between', 'bg-slate-600', 'rounded', 'w-60', 'min-h-32', 'h-[400px]', 'p-1');
    card.innerHTML = `
      <div class="flex flex-col justify-center text-white">
      <img src="${producto.thumbnails[0]}" alt="${producto.title}" class="w-full h-auto object-cover">
      <h3 class="text-xl itemDescripcion">${producto.title}</h3>
      <h3 class="text-sm">${producto.description}</h3>
      <p>$${producto.price}</p>
      </div>
      <div class="bg-slate-400/90 border-slate-400 border hover:bg-slate-500 active:bg-slate-300 active:text-black mt-3 text-center rounded text-white">
      <button>Eliminar</button>
      </div>
    `;

    productsContainer.appendChild(card);

    // Agregamos un listener para eliminar el producto
    card.querySelector('button').addEventListener('click', () => {
      console.log('Deleting product with id:', producto.id);
      deleteProduct(producto.id);
    });
  });
}

// Función que envía al servidor un delete request para eliminar el producto
const deleteProduct = async (id) => {
  socket.emit('deleteProduct', await id);
};

// Función que muestra el formulario para agregar un producto
function addProduct() {
  const formContainer = document.getElementById('formContainer');
  if (!formContainer) {
    console.error("No se encontró el contenedor del formulario");
    return;
  }

  const form = document.createElement('form');
  form.classList.add('form', 'fixed', 'mt-10', 'w-96');
  form.innerHTML = `
    <div class="input-group title">
      <input aria-label="Título" type="text" placeholder=" " id="title" required />
      <span>Título *</span>
    </div>
    <div class="input-group description">
      <input aria-label="Descripción" type="text" placeholder=" " id="description" required />
      <span>Descripción *</span>
    </div>
    <div class="input-group price">
      <input aria-label="Precio" type="number" step="0.01" placeholder=" " id="price" required />
      <span>Precio *</span>
    </div>
    <div class="input-group thumbnails">
      <input aria-label="Thumbnails" type="text" placeholder=" " id="thumbnails" />
      <span>Thumbnails</span>
    </div>
    <div class="input-group code">
      <input aria-label="Código" type="text" placeholder=" " id="code" required />
      <span>Código *</span>
    </div>
    <div class="input-group stock">
      <input aria-label="Stock" type="number" placeholder=" " id="stock" required />
      <span>Stock *</span>
    </div>
    <div class="input-group category">
      <input aria-label="Categoría" type="text" placeholder=" " id="category" required />
      <span>Categoría *</span>
    </div>
    <div class="input-group status">
      <input aria-label="Estado" type="text" placeholder=" " id="status" required />
      <span>Estado *</span>
    </div>
    <div class="col-span-2">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add Product</button>
    </div>
  `;

  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addProductToServer();
  });

  socket.on('newProductAdded', (data) => {
    console.log(`Se agrego correctamente el producto: ${data.title}`)
  });

  socket.on('errorAddingProduct', (err) => {
    console.error(`Error al agregar el producto: ${err}`)
  })
  
}

function addProductToServer() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const thumbnails = document.getElementById('thumbnails').value;
  const code = document.getElementById('code').value;
  const stock = parseInt(document.getElementById('stock').value, 10);
  const category = document.getElementById('category').value;
  const status = document.getElementById('status').value;
  
  const form = {
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    status
  }

  socket.emit('addProduct', form);

  // Limpiamos los campos del formulario después de enviarlo
  deleteAllInputs(form);
}

function deleteAllInputs() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('price').value = '';
  document.getElementById('thumbnails').value = '';
  document.getElementById('code').value = '';
  document.getElementById('stock').value = '';
  document.getElementById('category').value = '';
  document.getElementById('status').value = '';
}

// Añadimos el Event Listener al botón para mostrar el formulario
addProduct();