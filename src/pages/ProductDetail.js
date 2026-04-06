// ============================================
//  FARMAVIDA — Product Detail Page
// ============================================

import { ProductService } from '../services/ProductService.js';
import { CartService } from '../services/CartService.js';

export function renderProductDetailPage(container, productId) {
  const product = ProductService.getById(productId);

  if (!product) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <p>Produto não encontrado</p>
            <a href="#/produtos" class="btn btn-primary">Voltar aos produtos</a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="section" style="padding: 40px 0;">
      <div class="container">
        <a href="#/produtos" class="link-back">← Voltar</a>
        
        <div class="product-detail-layout">
          <!-- Coluna Esquerda: Imagem -->
          <div class="product-detail-images">
            <div class="product-main-img">
              ${product.emoji || '💊'}
            </div>
            <div class="product-thumbnails">
              <button class="thumbnail active" aria-label="Visualizar imagem 1"></button>
              <button class="thumbnail" aria-label="Visualizar imagem 2"></button>
              <button class="thumbnail" aria-label="Visualizar imagem 3"></button>
            </div>
          </div>

          <!-- Coluna Direita: Informações -->
          <div class="product-detail-info">
            <div class="product-detail-header">
              <span class="product-category-badge">${product.category}</span>
              ${product.badge ? `<span class="badge badge-${product.badgeType || 'new'}">${product.badge}</span>` : ''}
            </div>

            <h1 class="product-detail-name">${product.name}</h1>

            <div class="product-detail-rating">
              <div class="stars">
                <span>★★★★★</span>
              </div>
              <span class="rating-count">(${Math.floor(Math.random() * 500) + 50} avaliações)</span>
            </div>

            <div class="product-detail-price">
              <div class="price-section">
                ${product.priceOld ? `<span class="price-old">R$ ${product.priceOld.toFixed(2).replace('.', ',')}</span>` : ''}
                <span class="price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
              </div>
              ${product.priceOld ? `<span class="discount-badge">${Math.round((1 - product.price / product.priceOld) * 100)}% OFF</span>` : ''}
            </div>

            <div class="product-detail-description">
              <h3>Descrição</h3>
              <p>${product.description || 'Produto de alta qualidade para sua saúde e bem-estar.'}</p>
            </div>

            <div class="product-detail-meta">
              <div class="meta-item">
                <span class="meta-label">SKU</span>
                <span class="meta-value">${product.id}</span>
              </div>
            </div>

            <!-- Seleção e Compra -->
            <div class="product-detail-purchase">
              <div class="quantity-selector">
                <label for="qty">Quantidade</label>
                <div class="quantity-control">
                  <button class="qty-btn qty-decrease" aria-label="Diminuir quantidade">−</button>
                  <input type="number" id="qty" value="1" min="1" readonly />
                  <button class="qty-btn qty-increase" aria-label="Aumentar quantidade">+</button>
                </div>
              </div>
              <button class="btn btn-primary btn-add-cart" style="flex: 1; font-size: 1rem;">
                Adicionar ao Carrinho
              </button>
            </div>

            <div class="product-detail-shipping">
              <div class="shipping-item">
                <span class="shipping-icon">🚚</span>
                <span class="shipping-text">Entrega rápida em todo o Brasil</span>
              </div>
              <div class="shipping-item">
                <span class="shipping-icon">✓</span>
                <span class="shipping-text">Produtos originais e garantidos</span>
              </div>
              <div class="shipping-item">
                <span class="shipping-icon">🔒</span>
                <span class="shipping-text">Compra segura com Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Event listeners
  const qtyInput = container.querySelector('#qty');
  const decreaseBtn = container.querySelector('.qty-decrease');
  const increaseBtn = container.querySelector('.qty-increase');
  const addCartBtn = container.querySelector('.btn-add-cart');

  decreaseBtn.addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
    }
  });

  increaseBtn.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  addCartBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    window.CartService.add(productId, qty);
    alert(`${qty} unidade(s) de "${product.name}" adicionada(s) ao carrinho!`);
  });
}
