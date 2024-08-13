import mongoose from "mongoose";

const productSchemma = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: [
    {
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  price: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    categoriaId: {
      type: String,
      required: true
    },
    categoriaNombre: {
      type: String,
      required: true
    },
    subcategoria: {
      subcategoriaId: {
        type: String,
        required: true
      },
      subcategoriaNombre: {
        type: String,
        required: true
      }
    }
  },
  thumbnails: {
    type: [String]
  },
  status: {
    type: Boolean,
    required: true
  }
});

const ProductModel = mongoose.model("products", productSchemma);

export default ProductModel;