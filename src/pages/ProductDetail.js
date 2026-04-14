import { ProductService } from '../services/ProductService.js';

export async function renderProductDetailPage(container, productId) {
  container.innerHTML = `<section class="section"><div class="container"><p>Carregando...</p></div></section>`;

  const product = await ProductService.getById(productId);

  if (!product) {
    container.innerHTML = `
      <section class="section"><div class="container">
        <div class="empty-state">
          <p>Produto não encontrado</p>
          <a href="#/produtos" class="btn btn-primary">Voltar aos produtos</a>
        </div>
      </div></section>`;
    return;
  }

  const id = product.productId || product.id;

  const imgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" style="max-width:100%;border-radius:12px"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
       <div style="font-size:6rem;text-align:center;display:none">${product.emoji ?? '💊'}</div>`
    : `<div style="font-size:6rem;text-align:center">${product.emoji ?? '💊'}</div>`;

  container.innerHTML = `
    <section class="section" style="padding:40px 0">
      <div class="container">
        <a href="#/produtos" class="link-back">← Voltar</a>
        <div class="product-detail-layout">
          <div class="product-detail-images">
            <div class="product-main-img">${imgContent}</div>
          </div>
          <div class="product-detail-info">
            <div class="product-detail-header">
              <span class="product-category-badge">${product.category || ''}</span>
              ${product.badge ? `<span class="badge badge-${product.badgeType || 'new'}">${product.badge}</span>` : ''}
            </div>
            <h1 class="product-detail-name">${product.name}</h1>
            <div class="product-detail-price">
              <div class="price-section">
                ${product.priceOld ? `<span class="price-old">R$ ${product.priceOld.toFixed(2).replace('.', ',')}</span>` : ''}
                <span class="price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
              </div>
              ${product.priceOld ? `<span class="discount-badge">${Math.round((1 - product.price / product.priceOld) * 100)}% OFF</span>` : ''}
            </div>
            <div class="product-detail-description">
              <h3>Descrição</h3>
              <p>${product.description || 'Produto de alta qualidade.'}</p>
            </div>
            <div class="product-detail-purchase">
              <div class="quantity-selector">
                <label for="qty">Quantidade</label>
                <div class="quantity-control">
                  <button class="qty-btn qty-decrease">−</button>
                  <input type="number" id="qty" value="1" min="1" readonly />
                  <button class="qty-btn qty-increase">+</button>
                </div>
              </div>
              <button class="btn btn-primary btn-add-cart" style="flex:1;font-size:1rem">
                Adicionar ao Carrinho
              </button>
            </div>
            <div class="product-detail-shipping">
              <div class="shipping-item"><span>🚚</span><span>Entrega rápida em todo o Brasil</span></div>
              <div class="shipping-item"><span>✓</span><span>Produtos originais e garantidos</span></div>
              <div class="shipping-item"><span>🔒</span><span>Compra segura com Stripe</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const qtyInput    = container.querySelector('#qty');
  container.querySelector('.qty-decrease').addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });
  container.querySelector('.qty-increase').addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });
  container.querySelector('.btn-add-cart').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    window.CartService.add(id, qty);
    alert(`${qty}x "${product.name}" adicionado ao carrinho!`);
  });
}
