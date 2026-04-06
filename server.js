require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, param, validationResult } = require('express-validator');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const qrcode = require('qrcode');
const mongoose = require('mongoose');

const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Security middleware
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API Routes

// Conectar ao MongoDB e iniciar o servidor apenas após a conexão
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB');

    // Seed initial data
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        { name: 'Aspirina', price: 10.00, description: 'Analgésico' },
        { name: 'Paracetamol', price: 15.00, description: 'Antitérmico' },
        { name: 'Ibuprofeno', price: 12.00, description: 'Anti-inflamatório' },
        { name: 'Vitamina C', price: 20.00, description: 'Suplemento vitamínico' },
      ]);
      console.log('Produtos iniciais inseridos');
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

app.post('/api/cart', [
  body('productId').isString().withMessage('ID de produto inválido'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantidade deve ser um número inteiro positivo'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (product) {
      await Cart.create({ productId, quantity: parseInt(quantity) });
      res.status(201).json({ message: 'Produto adicionado ao carrinho' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar ao carrinho' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate('productId');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar carrinho' });
  }
});

app.delete('/api/cart/:id', [
  param('id').isString().withMessage('ID inválido'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removido do carrinho' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover item' });
  }
});

// Payment route
app.post('/api/payment', [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valor deve ser maior que 0'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { amount } = req.body;
  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: { name: 'Compra na Farmácia' },
          unit_amount: Math.round(amount * 100), // in cents
        },
        quantity: 1,
      }],
      after_completion: { type: 'redirect', redirect: { url: 'http://localhost:3000' } },
    });
    const qrCodeDataURL = await qrcode.toDataURL(paymentLink.url);
    res.json({ qrCode: qrCodeDataURL, url: paymentLink.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar link de pagamento' });
  }
});