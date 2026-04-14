// ============================================
//  FARMAVIDA — ProductCard Component
// ============================================

export function ProductCard(product) {
  const hasDiscount = product.priceOld !== undefined && product.priceOld !== null;

  // Usa a URL da imagem vinda do banco.
  // Se não tiver imagem cadastrada, exibe o emoji como fallback.
  const imgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" class="product-card-image"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">`
    : '';

  const emojiContent = `<span class="product-card-emoji" ${product.image ? 'style="display:none"' : ''}>
    ${product.emoji ?? '💊'}
  </span>`;

  // O id que o carrinho usa é o productId vindo do banco
  const id = product.productId || product.id;

  return `
    <a href="#/produto/${id}" class="product-card-link">
      <article class="product-card" data-id="${id}">
        <div class="product-card-img" aria-label="${product.name}">
          ${imgContent}
          ${emojiContent}
          ${product.badge
            ? `<span class="badge badge-${product.badgeType ?? 'new'}"
                style="position:absolute;top:12px;left:12px">${product.badge}</span>`
            : ''}
        </div>
        <div class="product-card-body">
          <div class="product-category">${product.category}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">
            R$ ${product.price.toFixed(2).replace('.', ',')}
            ${hasDiscount
              ? `<span class="product-price-old">R$ ${product.priceOld.toFixed(2).replace('.', ',')}</span>`
              : ''}
          </div>
<div class="product-card-actions">
  <div class="product-card-qty-row">
    <span style="font-size:0.8rem;font-weight:600;color:var(--color-text-muted)">Qtd</span>
    <input id="qty-${id}" type="number" min="1" value="1" class="qty-input" style="width:60px" />
  </div>
  <button class="btn btn-primary btn-sm" style="width:100%" onclick="event.preventDefault(); event.stopPropagation(); window.CartService?.add('${id}', Number(document.getElementById('qty-${id}').value))">
    Adicionar ao Carrinho
  </button>
</div>
        </div>
      </article>
    </a>
  `;
}
