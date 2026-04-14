import { ProductService } from '../services/ProductService.js';
import { CartService }    from '../services/CartService.js';

export async function renderCartPage(container) {
  const items = CartService.getItems();

  container.innerHTML = `
    <section class="section" style="padding:40px 0">
      <div class="container">
        <div class="cart-header">
          <h1 class="cart-title">Seu Carrinho</h1>
          <p class="cart-subtitle">${items.length} item${items.length !== 1 ? 's' : ''} no carrinho</p>
        </div>
        <div class="cart-layout">
          <div class="cart-items" id="cart-items-container"><p>Carregando...</p></div>
          <div class="cart-summary" id="cart-summary-container"></div>
        </div>
      </div>
    </section>
  `;

  const itemsContainer   = container.querySelector('#cart-items-container');
  const summaryContainer = container.querySelector('#cart-summary-container');

  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-state">
        <p>O carrinho está vazio.</p>
        <a href="#/produtos" class="btn btn-primary">Voltar aos produtos</a>
      </div>`;
    summaryContainer.innerHTML = '';
    return;
  }

  const allProducts  = await ProductService.getAll();
  const findProduct  = (id) => allProducts.find(p => p.productId === id) ?? null;

  itemsContainer.innerHTML = `
    <div class="cart-items-list">
      ${items.map(item => {
        const p = findProduct(item.id);
        if (!p) return '';
        const imgHtml = p.image
          ? `<img src="${p.image}" alt="${p.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px"
               onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
             <span style="display:none;font-size:2rem">${p.emoji ?? '💊'}</span>`
          : `<span style="font-size:2rem">${p.emoji ?? '💊'}</span>`;
        return `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img">${imgHtml}</div>
            <div class="cart-item-details">
              <div class="cart-item-brand">${p.category || ''}</div>
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-price">
                <span class="price-current">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                ${p.priceOld ? `<span class="price-old">R$ ${p.priceOld.toFixed(2).replace('.', ',')}</span>` : ''}
              </div>
            </div>
            <div class="cart-item-qty-control">
              <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
              <input type="number" class="qty-value" value="${item.qty}" data-id="${item.id}" min="1" readonly />
              <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-subtotal">R$ ${(p.price * item.qty).toFixed(2).replace('.', ',')}</div>
            <button class="cart-item-remove" data-id="${item.id}">🗑️</button>
          </div>`;
      }).join('')}
    </div>`;

  const total = items.reduce((sum, item) => {
    const p = findProduct(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);

  summaryContainer.innerHTML = `
    <div class="cart-summary-box">
      <h3 class="summary-title">Resumo do Pedido</h3>
      <div class="summary-totals">
        <div class="total-line"><span>Subtotal</span><span>R$ ${total.toFixed(2).replace('.', ',')}</span></div>
        <div class="total-line"><span>Entrega</span><span id="shipping-cost">Calcular</span></div>
        <div class="total-line total-final"><span>Total</span><span>R$ ${total.toFixed(2).replace('.', ',')}</span></div>
      </div>
      <a href="#/pagamento" class="btn btn-primary btn-block">Finalizar Compra</a>
      <a href="#/produtos"  class="btn btn-outline btn-block">Continuar Comprando</a>
    </div>`;

  container.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items.find(i => i.id === btn.dataset.id);
      if (item && item.qty > 1) { CartService.updateQty(btn.dataset.id, item.qty - 1); renderCartPage(container); }
    });
  });
  container.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items.find(i => i.id === btn.dataset.id);
      if (item) { CartService.updateQty(btn.dataset.id, item.qty + 1); renderCartPage(container); }
    });
  });
  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => { CartService.remove(btn.dataset.id); renderCartPage(container); });
  });
}
