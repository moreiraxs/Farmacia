// ============================================
//  FARMAVIDA — Contact Page
// ============================================

export function renderContactPage(container) {
  container.innerHTML = `
    <section class="section">
      <div class="container" style="max-width:640px">
        <div class="section-header">
          <span class="section-label">Fale conosco</span>
          <h2 class="section-title">Contato</h2>
          <p class="section-desc">Nossa equipe está disponível 24h para te ajudar.</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:20px; margin-top:40px">
          <div class="form-group">
            <label class="form-label" for="contact-name">Nome completo</label>
            <input class="form-input" id="contact-name" type="text" placeholder="Seu nome" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-email">E-mail</label>
            <input class="form-input" id="contact-email" type="email" placeholder="seu@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-subject">Assunto</label>
            <input class="form-input" id="contact-subject" type="text" placeholder="Ex: Dúvida sobre pedido" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-msg">Mensagem</label>
            <textarea class="form-input" id="contact-msg" rows="5" placeholder="Descreva sua dúvida ou solicitação..." style="resize:vertical"></textarea>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%" id="contact-submit">
            Enviar Mensagem
          </button>
        </div>
      </div>
    </section>
  `;

  container.querySelector('#contact-submit').addEventListener('click', () => {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `<span>✅</span> Mensagem enviada com sucesso! Retornaremos em breve.`;
    container.querySelector('.container').insertBefore(alert, container.querySelector('.section-header'));
  });
}
