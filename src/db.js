import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://pittanapatricio:Pittana1.@cluster0.3e9pt.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));