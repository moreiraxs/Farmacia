// ============================================
//  FARMAVIDA — main.js (Entry Point)
// ============================================

import { renderHeader }     from '../../components/Header.js';
import { renderFooter }     from '../../components/Footer.js';
import { renderHomePage }   from '../../pages/Home.js';
import { CartService }      from '../../services/CartService.js';
import { Router }           from '../../utils/Router.js';

// ─── Bootstrap App ────────────────────────────
function init() {
  CartService.load();
  window.CartService = CartService;

  renderHeader(document.getElementById('header'));
  renderFooter(document.getElementById('footer'));

  Router.init(document.getElementById('main-content'));
}

document.addEventListener('DOMContentLoaded', init);
