import { renderHomePage }           from '../pages/Home.js';
import { renderProductsPage }       from '../pages/Products.js';
import { renderProductDetailPage }  from '../pages/ProductDetail.js';
import { renderContactPage }        from '../pages/Contact.js';
import { renderPaymentPage }        from '../pages/Payment.js';
import { renderCartPage }           from '../pages/Cart.js';

const routes = {
  '/'         : renderHomePage,
  '/produtos' : renderProductsPage,
  '/contato'  : renderContactPage,
  '/pagamento': renderPaymentPage,
  '/carrinho' : renderCartPage,
};

export const Router = {
  init(outlet) {
    this.outlet = outlet;
    this.navigate();
    window.addEventListener('hashchange', () => this.navigate());
  },

  async navigate() {
    const hash = window.location.hash.replace('#', '') || '/';
    const parts = hash.split('/').filter(Boolean);

    this.outlet.innerHTML = '';

    // Rota dinâmica: #/produto/p001
    if (parts[0] === 'produto' && parts[1]) {
      await renderProductDetailPage(this.outlet, parts[1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const path    = '/' + (parts[0] || '');
    const handler = routes[path] ?? routes['/'];
    await handler(this.outlet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};
