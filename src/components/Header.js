// ============================================
//  FARMAVIDA — Header Component
// ============================================

import { CartService } from '../services/CartService.js';

export function renderHeader(container) {
  container.innerHTML = `
    <div class="container">
      <div class="header-inner">
        <!-- Logo -->
        <a href="#/" class="logo">Farma<span>Vida</span></a>

        <!-- Navigation -->
        <nav class="nav" aria-label="Menu principal">
          <a href="#/"           class="nav-link active">Início</a>
          <a href="#/produtos"   class="nav-link">Produtos</a>
          <a href="#/categorias" class="nav-link">Categorias</a>
          <a href="#/promocoes"  class="nav-link">Promoções</a>
          <a href="#/contato"    class="nav-link">Contato</a>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <!-- Search -->
          <div class="search-bar" role="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Buscar medicamentos..." aria-label="Buscar produtos" />
          </div>

          <!-- Cart -->
          <a href="#/carrinho" class="cart-btn" id="cart-btn" aria-label="Carrinho de compras">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="cart-badge" id="cart-count">0</span>
          </a>

          <a href="#/conta" class="btn btn-primary btn-sm">Minha Conta</a>
        </div>
      </div>
    </div>
  `;

  // Update cart badge
  updateCartBadge();
  document.addEventListener('cart:updated', updateCartBadge);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = CartService.getCount();
}
