import { ProductCard }    from '../components/ProductCard.js';
import { ProductService } from '../services/ProductService.js';

export async function renderProductsPage(container) {
  container.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Catálogo completo</span>
          <h2 class="section-title">Todos os Produtos</h2>
          <p class="section-desc">Encontre tudo o que precisa para sua saúde e bem-estar.</p>
        </div>
        <div class="products-grid" id="all-products-grid">
          <p>Carregando produtos...</p>
        </div>
      </div>
    </section>
  `;

  const grid = container.querySelector('#all-products-grid');
  try {
    const products = await ProductService.getAll();
    grid.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.innerHTML = ProductCard(product);
      grid.appendChild(card.firstElementChild);
    });
  } catch (err) {
    grid.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}
