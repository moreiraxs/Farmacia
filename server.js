require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const { body, param, validationResult } = require('express-validator');
const path       = require('path');
const stripe     = require('stripe')(process.env.STRIPE_SECRET_KEY);
const qrcode     = require('qrcode');
const mongoose   = require('mongoose');

const Product = require('./models/Product.js');
const Cart    = require('./models/Cart.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Serve a pasta public/images para as imagens dos produtos
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// ─── Conectar ao MongoDB ───────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB');
    console.log('Banco:', mongoose.connection.db.databaseName);
console.log('ID p001:', (await Product.findOne({ productId: 'p001' }))?._id);
     //await Product.deleteMany({});
    // Limpa e recria os produtos se necessário
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        {
          productId: 'p001',
          name:        'Vitamina C 1000mg',
          category:    'Vitaminas',
          price:       29.90,
          priceOld:    39.90,
          description: 'Suplemento vitamínico antioxidante. Fortalece a imunidade.',
          image:       '/images/vitamina-c.jpg',   // coloque a imagem em public/images/
          emoji:       '🍊',
          badge:       'Promo',
          badgeType:   'promo',
        },
        {
          productId: 'p002',
          name:        'Dipirona 500mg 20cp',
          category:    'Analgésicos',
          price:       8.50,
          description: 'Analgésico e antitérmico de uso comum.',
          image:       '/images/dipirona.jpg',
          emoji:       '💊',
        },
        {
          productId: 'p003',
          name:        'Protetor Solar FPS 70',
          category:    'Dermocosméticos',
          price:       54.90,
          description: 'Proteção solar de alta performance para uso diário.',
          image:       '/images/protetor-solar.jpg',
          emoji:       '🌞',
          badge:       'Novo',
          badgeType:   'new',
        },
        {
          productId: 'p004',
          name:        'Whey Protein 1kg',
          category:    'Suplementos',
          price:       119.90,
          priceOld:    149.90,
          description: 'Suplemento proteico para ganho de massa muscular.',
          image:       '/images/whey-protein.jpg',
          emoji:       '💪',
          badge:       'Promo',
          badgeType:   'promo',
        },
        {
          productId: 'p005',
          name:        'Ibuprofeno 600mg',
          category:    'Anti-inflamatórios',
          price:       12.00,
          description: 'Anti-inflamatório e analgésico.',
          image:       '/images/ibuprofeno.jpg',
          emoji:       '💊',
        },
        {
          productId: 'p006',
          name:        'Colágeno Hidrolisado',
          category:    'Vitaminas',
          price:       44.90,
          description: 'Suplemento de colágeno para pele e articulações.',
          image:       '/images/colageno.jpg',
          emoji:       '✨',
          badge:       'Novo',
          badgeType:   'new',
        },
        {
          productId: 'p007',
          name:        'Shampoo Anticaspa',
          category:    'Higiene',
          price:       22.50,
          description: 'Shampoo para controle de caspa e couro cabeludo.',
          image:       '/images/shampoo.jpg',
          emoji:       '🧴',
        },
        {
          productId: 'p008',
          name:        'Termômetro Digital',
          category:    'Equipamentos',
          price:       35.00,
          description: 'Termômetro digital de alta precisão.',
          image:       '/images/termometro.jpg',
          emoji:       '🌡️',
        },
      ]);
      console.log('Produtos iniciais inseridos');
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

// ─── ROTAS DE PRODUTOS ─────────────────────────────────────────────────────

// Busca todos os produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

// Busca um produto pelo productId (ex: /api/products/p001)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
});

// ─── ROTAS DE CARRINHO ─────────────────────────────────────────────────────

app.post('/api/cart', [
  body('productId').isString().withMessage('ID de produto inválido'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantidade deve ser um número inteiro positivo'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { productId, quantity } = req.body;
  try {
    const product = await Product.findOne({ productId });
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
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removido do carrinho' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover item' });
  }
});

// ─── ROTA DE PAGAMENTO ─────────────────────────────────────────────────────

app.post('/api/payment', [
  body('cartItems').isArray({ min: 1 }).withMessage('Carrinho vazio ou inválido'),
  body('cartItems.*.id').isString().withMessage('ID de produto inválido'),
  body('cartItems.*.qty').isInt({ min: 1 }).withMessage('Quantidade inválida'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { cartItems } = req.body;

  try {
    let totalCents = 0;

    for (const item of cartItems) {
      const product = await Product.findOne({ productId: item.id });
      if (!product) return res.status(400).json({ message: `Produto não encontrado: ${item.id}` });
      totalCents += Math.round(product.price * 100) * item.qty;
    }

    if (totalCents <= 0) return res.status(400).json({ message: 'Total inválido' });

    const productStripe = await stripe.products.create({ name: 'Compra na Farmácia' });
    const price = await stripe.prices.create({
      unit_amount: totalCents,
      currency: 'brl',
      product: productStripe.id,
    });
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      after_completion: { type: 'redirect', redirect: { url: 'http://localhost:3000' } },
    });

    const qrCodeDataURL = await qrcode.toDataURL(paymentLink.url);
    res.json({ qrCode: qrCodeDataURL, url: paymentLink.url });

  } catch (err) {
    console.error('ERRO STRIPE:', err);
    res.status(500).json({ message: 'Erro ao criar link de pagamento', error: err.message });
  }
});
