// ============================================
//  FARMAVIDA — Router (Hash-based SPA Router)
// ============================================

import { renderHomePage }           from '../pages/Home.js';
import { renderProductsPage }      from '../pages/Products.js';
import { renderProductDetailPage } from '../pages/ProductDetail.js';
import { renderContactPage }       from '../pages/Contact.js';
import { renderPaymentPage }       from '../pages/Payment.js';
import { renderCartPage }          from '../pages/Cart.js';

const routes = {
  '/'              : renderHomePage,
  '/produtos'      : renderProductsPage,
  '/contato'       : renderContactPage,
  '/pagamento'     : renderPaymentPage,
  '/carrinho'      : renderCartPage,
};

export const Router = {
  init(outlet) {
    this.outlet = outlet;
    this.navigate();
    window.addEventListener('hashchange', () => this.navigate());
  },

  navigate() {
    const hash = window.location.hash.replace('#', '') || '/';
    const [path, ...params] = hash.split('/');
    const fullPath = path + (params[0] ? '/' + params[0] : '');
    
    // Verificar rotas dinâmicas (ex: /produto/p001)
    if (path === '' && params[0] === 'produto' && params[1]) {
      this.outlet.innerHTML = '';
      renderProductDetailPage(this.outlet, params[1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const handler = routes[fullPath] ?? routes[path] ?? routes['/'];
    this.outlet.innerHTML = '';
    handler(this.outlet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};
