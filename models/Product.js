const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId:   { type: String, required: true, unique: true }, // ex: 'p001'
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  priceOld:    { type: Number },                               // preço antigo (opcional)
  category:    { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String },                               // URL ou caminho da imagem
  emoji:       { type: String },                               // fallback enquanto não tem imagem
  badge:       { type: String },                               // ex: 'Promo', 'Novo'
  badgeType:   { type: String },                               // ex: 'promo', 'new'
});

module.exports = mongoose.model('Product', productSchema);
