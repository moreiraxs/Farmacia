// ============================================
//  FARMAVIDA — Footer Component
// ============================================

export function renderFooter(container) {
  container.innerHTML = `
    <!-- Info Strip -->
    <div class="info-strip">
      <div class="container">
        <div class="info-strip-inner">
          <div class="info-item">
            <span class="info-item-icon">🚚</span>
            Frete grátis acima de R$ 99
          </div>
          <div class="info-item">
            <span class="info-item-icon">🕐</span>
            Atendimento 24h
          </div>
          <div class="info-item">
            <span class="info-item-icon">💊</span>
            Farmacêutico online
          </div>
          <div class="info-item">
            <span class="info-item-icon">🔒</span>
            Compra 100% segura
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Body -->
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="logo">Farma<span style="color:#A8C7CA">Vida</span></div>
          <p class="footer-desc">
            Cuidando da sua saúde com carinho e responsabilidade. 
            Medicamentos, cosméticos e muito mais com entrega rápida.
          </p>
        </div>

        <!-- Links -->
        <div>
          <div class="footer-heading">Produtos</div>
          <div class="footer-links">
            <a href="#/categorias/medicamentos"  class="footer-link">Medicamentos</a>
            <a href="#/categorias/dermocosmetico" class="footer-link">Dermocosméticos</a>
            <a href="#/categorias/vitaminas"      class="footer-link">Vitaminas</a>
            <a href="#/categorias/higiene"        class="footer-link">Higiene</a>
            <a href="#/promocoes"                 class="footer-link">Promoções</a>
          </div>
        </div>

        <div>
          <div class="footer-heading">Empresa</div>
          <div class="footer-links">
            <a href="#/sobre"    class="footer-link">Sobre nós</a>
            <a href="#/blog"     class="footer-link">Blog de saúde</a>
            <a href="#/contato"  class="footer-link">Contato</a>
            <a href="#/trabalhe" class="footer-link">Trabalhe conosco</a>
          </div>
        </div>

        <div>
          <div class="footer-heading">Ajuda</div>
          <div class="footer-links">
            <a href="#/faq"        class="footer-link">FAQ</a>
            <a href="#/entrega"    class="footer-link">Política de entrega</a>
            <a href="#/devolucao"  class="footer-link">Trocas e devoluções</a>
            <a href="#/privacidade" class="footer-link">Privacidade</a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <span>© 2025 FarmaVida. Todos os direitos reservados.</span>
        <span>CRF/SP 00000 · CNPJ 00.000.000/0001-00</span>
      </div>
    </div>
  `;
}
