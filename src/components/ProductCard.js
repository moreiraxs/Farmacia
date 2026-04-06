// ============================================
//  FARMAVIDA — ProductCard Component
// ============================================

export function ProductCard(product) {
  const hasDiscount = product.priceOld !== undefined;

  return `
    <a href="#/produto/${product.id}" class="product-card-link">
      <article class="product-card" data-id="${product.id}">
        <div class="product-card-img" aria-label="${product.name}">
          ${product.emoji ?? '💊'}
          ${product.badge ? `<span class="badge badge-${product.badgeType ?? 'new'}" style="position:absolute;top:12px;left:12px">${product.badge}</span>` : ''}
        </div>
        <div class="product-card-body">
          <div class="product-category">${product.category}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">
            R$ ${product.price.toFixed(2).replace('.', ',')}
            ${hasDiscount ? `<span class="product-price-old">R$ ${product.priceOld.toFixed(2).replace('.', ',')}</span>` : ''}
          </div>
          <div class="product-card-actions">
            <label class="quantity-label" for="qty-${product.id}">Qtd</label>
            <input id="qty-${product.id}" type="number" min="1" value="1" class="qty-input" />
            <button class="btn btn-primary btn-sm" style="width:100%" onclick="event.preventDefault(); event.stopPropagation(); window.CartService?.add('${product.id}', Number(document.getElementById('qty-${product.id}').value))">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </article>
    </a>
  `;
}
