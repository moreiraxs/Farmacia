// ============================================
//  FARMAVIDA — Cart Page
// ============================================

import { ProductService } from '../services/ProductService.js';
import { CartService } from '../services/CartService.js';

export function renderCartPage(container) {
  const items = CartService.getItems();

  container.innerHTML = `
    <section class="section" style="padding: 40px 0;">
      <div class="container">
        <div class="cart-header">
          <h1 class="cart-title">Seu Carrinho</h1>
          <p class="cart-subtitle">${items.length} item${items.length !== 1 ? 's' : ''} no carrinho</p>
        </div>

        <div class="cart-layout">
          <div class="cart-items" id="cart-items-container"></div>
          <div class="cart-summary" id="cart-summary-container"></div>
        </div>
      </div>
    </section>
  `;

  const itemsContainer = container.querySelector('#cart-items-container');
  const summaryContainer = container.querySelector('#cart-summary-container');

  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-state">
        <p>O carrinho está vazio.</p>
        <a href="#/produtos" class="btn btn-primary">Voltar aos produtos</a>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  // Renderizar itens
  itemsContainer.innerHTML = `
    <div class="cart-items-list">
      ${items.map(item => {
        const product = ProductService.getById(item.id);
        if (!product) return '';
        return `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img">${product.emoji ?? '💊'}</div>
            <div class="cart-item-details">
              <div class="cart-item-brand">${product.category}</div>
              <div class="cart-item-name">${product.name}</div>
              <div class="cart-item-price">
                <span class="price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                ${product.priceOld ? `<span class="price-old">R$ ${product.priceOld.toFixed(2).replace('.', ',')}</span>` : ''}
              </div>
            </div>
            <div class="cart-item-qty-control">
              <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
              <input type="number" class="qty-value" value="${item.qty}" data-id="${item.id}" min="1" readonly />
              <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
            </div>
            <div class="cart-item-subtotal">
              R$ ${(product.price * item.qty).toFixed(2).replace('.', ',')}
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="Remover item">🗑️</button>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Renderizar resumo
  const total = items.reduce((sum, item) => {
    const product = ProductService.getById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  summaryContainer.innerHTML = `
    <div class="cart-summary-box">
      <h3 class="summary-title">Resumo do Pedido</h3>
      
      <div class="summary-field">
        <label for="delivery-zip">Calcule o frete</label>
        <div class="zip-input-group">
          <input type="text" id="delivery-zip" placeholder="00000-000" maxlength="9" />
          <button class="btn-zip">Ok</button>
        </div>
      </div>

      <div class="summary-field">
        <label for="coupon-code">Cupom de Desconto</label>
        <div class="coupon-input-group">
          <input type="text" id="coupon-code" placeholder="Código do cupom" />
          <button class="btn-coupon">Ok</button>
        </div>
        <button class="btn-see-cupons">Ver cupons disponíveis</button>
      </div>

      <div class="summary-totals">
        <div class="total-line">
          <span>Subtotal</span>
          <span class="total-value">R$ ${total.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="total-line">
          <span>Entrega</span>
          <span class="total-value" id="shipping-cost">Calcular</span>
        </div>
        <div class="total-line total-final">
          <span>Total</span>
          <span class="total-value">R$ ${total.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <a href="#/pagamento" class="btn btn-primary btn-block">Finalizar Compra</a>
      <a href="#/produtos" class="btn btn-outline btn-block">Continuar Comprando</a>
    </div>
  `;

  // Event listeners para quantidade
  const qtyMinusButtons = container.querySelectorAll('.qty-minus');
  const qtyPlusButtons = container.querySelectorAll('.qty-plus');
  const removeButtons = container.querySelectorAll('.cart-item-remove');

  qtyMinusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      const item = items.find(i => i.id === productId);
      if (item && item.qty > 1) {
        CartService.updateQty(productId, item.qty - 1);
        renderCartPage(container);
      }
    });
  });

  qtyPlusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      const item = items.find(i => i.id === productId);
      if (item) {
        CartService.updateQty(productId, item.qty + 1);
        renderCartPage(container);
      }
    });
  });

  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      CartService.remove(productId);
      renderCartPage(container);
    });
  });
}
