import { ProductCard }    from '../components/ProductCard.js';
import { ProductService } from '../services/ProductService.js';

export async function renderHomePage(container) {
  const categories = ProductService.getCategories();

  container.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-inner">
          <div class="hero-content">
            <h1 class="hero-title">Sua saúde em<br><span>boas mãos</span></h1>
            <p class="hero-subtitle">Medicamentos, vitaminas, dermocosméticos e muito mais.</p>
            <div class="hero-actions">
              <a href="#/produtos" class="btn btn-lg btn-hero-primary">Ver Produtos</a>
              <a href="#/receita"  class="btn btn-lg btn-hero-outline">Enviar Receita</a>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div style="font-size:8rem;text-align:center;opacity:0.85">💊</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--color-off-white)">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Navegue por área</span>
          <h2 class="section-title">Categorias</h2>
        </div>
        <div class="categories-grid" id="categories-grid"></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Mais vendidos</span>
          <h2 class="section-title">Produtos em Destaque</h2>
        </div>
        <div class="products-grid" id="products-grid">
          <p>Carregando produtos...</p>
        </div>
      </div>
    </section>
  `;

  const catGrid = container.querySelector('#categories-grid');
  categories.forEach(cat => {
    catGrid.insertAdjacentHTML('beforeend', `
      <a href="#/categorias/${cat.slug}" class="category-card">
        <div class="category-icon">${cat.icon}</div>
        <span class="category-name">${cat.name}</span>
      </a>
    `);
  });

  const prodGrid = container.querySelector('#products-grid');
  try {
    const featured = await ProductService.getFeatured();
    prodGrid.innerHTML = '';
    featured.forEach(product => {
      const card = document.createElement('div');
      card.innerHTML = ProductCard(product);
      prodGrid.appendChild(card.firstElementChild);
    });
  } catch (err) {
    prodGrid.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}
